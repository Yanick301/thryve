// ============================================================
// THRYVE — Editorial Calendar Page
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon,
  Clock, LayoutGrid, List, Instagram, MessageSquare, Heart, Eye, Sparkles, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/Layout';
import { StatusBadge, PlatformBadge } from '@/components/Cards';
import { ROUTE_PATHS, formatDateTime } from '@/lib/index';
import { MOCK_POSTS } from '@/data/index';
import type { Post } from '@/lib/index';

// ─── Helpers ──────────────────────────────────────────────────
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const WEEKDAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

// ─── Post Pill (in calendar cell) ─────────────────────────────
function PostPill({ post, onClick }: { post: Post; onClick: () => void }) {
  const colorMap: Record<string, string> = {
    instagram: 'var(--primary)',
    threads: 'var(--secondary)',
    both: 'var(--accent)',
  };
  const color = colorMap[post.platform];

  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded-2xl text-[9px] font-black truncate mb-1.5 transition-all hover:scale-105 active:scale-95 border border-white/20 glass-master group shadow-sm uppercase tracking-widest"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <span className="opacity-60 group-hover:opacity-100 transition-opacity">{post.caption.slice(0, 18)}...</span>
    </button>
  );
}

// ─── Post Detail Modal ────────────────────────────────────────
function PostDetailModal({ post, onClose }: { post: Post | null; onClose: () => void }) {
  if (!post) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/40 backdrop-blur-xl"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative glass-master rounded-[3rem] border border-white/50 p-10 w-full max-w-lg shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/5 -z-10 animate-crystal" />
          
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <PlatformBadge platform={post.platform} size="lg" />
              <div className="h-8 w-px bg-white/20" />
              <StatusBadge status={post.status} />
            </div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 flex items-center justify-center rounded-2xl glass-master border-white/40 hover:bg-destructive/10 hover:text-destructive transition-all duration-500"
            >
              <Plus className="w-5 h-5 rotate-45" />
            </button>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-foreground font-black uppercase tracking-widest leading-loose italic">
              "{post.caption}"
            </p>

            {post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.hashtags.map(tag => (
                  <span key={tag} className="text-[10px] text-primary font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="space-y-4 pt-8 border-t border-white/20">
              <div className="grid grid-cols-2 gap-4">
                 {post.scheduledAt && (
                   <div className="glass-master p-4 rounded-2xl border-white/20">
                     <p className="text-[8px] text-foreground/40 font-black uppercase tracking-widest mb-1">Programmé</p>
                     <p className="text-[10px] text-foreground font-black uppercase tracking-widest flex items-center gap-2">
                       <Clock className="w-3 h-3 text-primary" />
                       {formatDateTime(post.scheduledAt)}
                     </p>
                   </div>
                 )}
                 {post.publishedAt && (
                   <div className="glass-master p-4 rounded-2xl border-white/20">
                     <p className="text-[8px] text-foreground/40 font-black uppercase tracking-widest mb-1">Publié</p>
                     <p className="text-[10px] text-foreground font-black uppercase tracking-widest flex items-center gap-2">
                       <CalendarIcon className="w-3 h-3 text-secondary" />
                       {formatDateTime(post.publishedAt)}
                     </p>
                   </div>
                 )}
              </div>

              {(post.likes !== undefined && post.likes > 0) && (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { label: 'Likes', value: post.likes, icon: Heart },
                    { label: 'Comments', value: post.comments, icon: MessageSquare },
                    { label: 'Reach', value: post.reach, icon: Eye },
                  ].map(({ label, value }) => (
                    <div key={label} className="glass-master rounded-2xl p-4 text-center border-white/20 hover:border-primary/40 transition-all group">
                      <p className="text-sm font-black text-foreground mb-1">{(value || 0).toLocaleString()}</p>
                      <p className="text-[8px] text-foreground/40 font-black uppercase tracking-widest group-hover:text-primary transition-colors">{label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-8">
              <Button variant="outline" className="flex-1 h-14 rounded-2xl glass-master border-white/50 text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all duration-500">
                Modifier le Signal
              </Button>
              <Button className="flex-1 h-14 rounded-2xl bg-primary text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-500 text-[10px] font-black uppercase tracking-widest">
                Optimiser
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ─── Main Calendar Page ───────────────────────────────────────
export default function CalendarPage() {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const getPostsForDay = (day: number) => {
    return MOCK_POSTS.filter((post) => {
      const date = post.scheduledAt || post.publishedAt;
      if (!date) return false;
      const d = new Date(date);
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth && d.getDate() === day;
    });
  };

  const today = new Date();
  const isToday = (day: number) =>
    today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day;

  return (
    <DashboardLayout>
      <div className="p-10 space-y-12 w-full max-w-full relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] -z-10 rounded-full animate-crystal" />
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <CalendarIcon className="w-6 h-6 text-primary animate-crystal" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/40">Nexus Editorial</span>
            </div>
            <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
              Calendrier <span className="text-primary italic">Alpha</span>
            </h1>
            <p className="text-[10px] text-foreground/40 mt-4 font-black uppercase tracking-[0.3em]">
              {MOCK_POSTS.filter((p) => p.status === 'scheduled').length} transmissions programmées ce mois
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View toggle */}
            <div className="flex items-center glass-master p-1.5 rounded-2xl border-white/40 shadow-inner">
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-3 rounded-xl transition-all duration-500 ${viewMode === 'calendar' ? 'bg-primary text-white shadow-lg scale-110' : 'text-foreground/40 hover:text-foreground'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-500 ${viewMode === 'list' ? 'bg-primary text-white shadow-lg scale-110' : 'text-foreground/40 hover:text-foreground'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            
            <Link to={ROUTE_PATHS.CREATE_POST}>
              <Button
                className="h-14 px-8 rounded-2xl bg-foreground text-background font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500"
              >
                <Plus className="mr-3 w-5 h-5" />
                Nouveau Signal
              </Button>
            </Link>
          </div>
        </div>

        {viewMode === 'calendar' ? (
          <div className="glass-master rounded-[3.5rem] border border-white/50 overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-primary/5 -z-10" />
            
            {/* Calendar Header */}
            <div className="flex items-center justify-between px-10 py-8 border-b border-white/20">
              <button onClick={prevMonth} className="w-12 h-12 flex items-center justify-center rounded-2xl glass-master border-white/40 hover:bg-white/40 transition-all duration-500">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-black text-foreground uppercase tracking-[0.4em] text-center">
                {MONTHS[currentMonth]} <span className="text-primary">{currentYear}</span>
              </h2>
              <button onClick={nextMonth} className="w-12 h-12 flex items-center justify-center rounded-2xl glass-master border-white/40 hover:bg-white/40 transition-all duration-500">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 border-b border-white/20 bg-white/5">
              {WEEKDAYS.map((day) => (
                <div key={day} className="px-3 py-6 text-center text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em]">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {/* Empty cells for first day */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[160px] border-b border-r border-white/10 bg-white/[0.02]" />
              ))}

              {/* Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayPosts = getPostsForDay(day);
                const todayCell = isToday(day);

                return (
                  <div
                    key={day}
                    className={`min-h-[160px] border-b border-r border-white/10 p-5 transition-all duration-700 hover:bg-white/10 cursor-pointer relative group/cell
                      ${todayCell ? 'bg-primary/[0.03]' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black mb-4 transition-all duration-700
                      ${todayCell ? 'bg-primary text-white shadow-[0_0_20px_rgba(79,70,229,0.5)] scale-110' : 'text-foreground/40 group-hover/cell:text-foreground group-hover/cell:bg-white/20'}`}>
                      {day}
                    </div>
                    <div className="space-y-1.5">
                      {dayPosts.slice(0, 3).map((post) => (
                        <PostPill key={post.id} post={post} onClick={() => setSelectedPost(post)} />
                      ))}
                      {dayPosts.length > 3 && (
                        <p className="text-[8px] text-primary font-black uppercase tracking-widest pl-2 mt-2 italic">
                          + {dayPosts.length - 3} transm.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-10">
            {['scheduled', 'published', 'draft'].map((status) => {
              const posts = MOCK_POSTS.filter((p) => p.status === status);
              if (posts.length === 0) return null;
              return (
                <div key={status} className="space-y-6">
                  <div className="flex items-center gap-6 px-4">
                    <StatusBadge status={status as 'draft' | 'scheduled' | 'published' | 'failed'} />
                    <span className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.4em]">{posts.length} TRANSMISSIONS</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6">
                    {posts.map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-master rounded-[2.5rem] border border-white/40 p-10 hover:border-primary/40 transition-all duration-700 cursor-pointer group shadow-xl relative overflow-hidden"
                        onClick={() => setSelectedPost(post)}
                      >
                         <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="flex items-start justify-between gap-8 relative z-10">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-4 mb-6">
                              <PlatformBadge platform={post.platform} />
                              <div className="h-4 w-px bg-white/20" />
                              <span className="text-[9px] font-black text-foreground/40 uppercase tracking-widest">Signal Unit</span>
                            </div>
                            <p className="text-sm text-foreground font-black uppercase tracking-widest leading-loose italic group-hover:text-primary transition-colors">"{post.caption.slice(0, 100)}..."</p>
                            {post.hashtags.length > 0 && (
                              <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-6 opacity-60">{post.hashtags.join(' ')}</p>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0 space-y-4">
                            {(post.scheduledAt || post.publishedAt) && (
                              <div className="flex flex-col items-end gap-2">
                                <p className="text-[8px] text-foreground/40 font-black uppercase tracking-widest">Transmission</p>
                                <div className="flex items-center gap-2 text-[10px] font-black text-foreground uppercase tracking-widest">
                                  <Clock className="w-3.5 h-3.5 text-primary" />
                                  <span>{formatDateTime((post.scheduledAt || post.publishedAt)!)}</span>
                                </div>
                              </div>
                            )}
                            {post.likes !== undefined && post.likes > 0 && (
                              <div className="pt-4 border-t border-white/10">
                                <p className="text-[8px] text-foreground/40 font-black uppercase tracking-widest mb-1">Performance</p>
                                <p className="text-lg font-black text-foreground tracking-tighter">{post.likes.toLocaleString()} <span className="text-[10px] text-primary uppercase ml-1">LKS</span></p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Legend */}
        {viewMode === 'calendar' && (
          <div className="glass-master rounded-[2rem] p-8 border-white/20 flex flex-wrap items-center justify-between gap-8 shadow-xl">
            <div className="flex items-center gap-4">
              <Sparkles className="w-5 h-5 text-primary animate-crystal" />
              <p className="text-[10px] font-black text-foreground/60 uppercase tracking-[0.4em]">Codification des Signaux :</p>
            </div>
            <div className="flex flex-wrap items-center gap-10">
              {[
                { platform: 'instagram', label: 'INSTAGRAM UNIT', color: 'var(--primary)' },
                { platform: 'threads', label: 'THREADS UNIT', color: 'var(--secondary)' },
                { platform: 'both', label: 'HYBRID UNIT', color: 'var(--accent)' },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-4 group cursor-help">
                  <div className="w-4 h-4 rounded-full shadow-[0_0_15px_currentColor] transition-transform duration-500 group-hover:scale-125" style={{ backgroundColor: color, color }} />
                  <span className="text-[10px] text-foreground/40 font-black uppercase tracking-widest group-hover:text-foreground transition-colors">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </DashboardLayout>
  );
}
