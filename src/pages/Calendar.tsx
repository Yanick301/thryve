// ============================================================
// THRYVE — Editorial Calendar Page
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon,
  Clock, LayoutGrid, List, Instagram, MessageSquare,
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
    instagram: '#E1306C',
    threads: '#000000',
    both: '#4F46E5',
  };
  const color = colorMap[post.platform];

  return (
    <button
      onClick={onClick}
      className="w-full text-left px-1.5 py-0.5 rounded text-[10px] font-medium truncate mb-0.5 transition-opacity hover:opacity-80"
      style={{ backgroundColor: `${color}18`, color }}
    >
      {post.caption.slice(0, 20)}...
    </button>
  );
}

// ─── Post Detail Modal ────────────────────────────────────────
function PostDetailModal({ post, onClose }: { post: Post | null; onClose: () => void }) {
  if (!post) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative bg-card rounded-2xl border border-border p-6 w-full max-w-md shadow-2xl z-10"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <PlatformBadge platform={post.platform} size="md" />
              <StatusBadge status={post.status} />
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors">
              ×
            </button>
          </div>

          <p className="text-sm text-foreground leading-relaxed mb-4">{post.caption}</p>

          {post.hashtags.length > 0 && (
            <p className="text-xs text-primary mb-4">{post.hashtags.join(' ')}</p>
          )}

          <div className="space-y-2 border-t border-border pt-4">
            {post.scheduledAt && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Programmé : {formatDateTime(post.scheduledAt)}</span>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4" />
                <span>Publié : {formatDateTime(post.publishedAt)}</span>
              </div>
            )}
            {(post.likes !== undefined && post.likes > 0) && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {[
                  { label: 'Likes', value: post.likes },
                  { label: 'Commentaires', value: post.comments },
                  { label: 'Reach', value: post.reach },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-muted/50 rounded-xl p-2.5 text-center">
                    <p className="text-base font-bold text-foreground">{(value || 0).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="flex-1 rounded-xl text-sm">Modifier</Button>
            <Button className="flex-1 rounded-xl text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}>
              Voir plus
            </Button>
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
      <div className="p-6 lg:p-10 space-y-10 w-full max-w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Calendrier Editorial 📅
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {MOCK_POSTS.filter((p) => p.status === 'scheduled').length} publications programmées
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex items-center bg-muted p-1 rounded-xl">
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'calendar' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <Link to={ROUTE_PATHS.CREATE_POST}>
              <Button
                className="font-semibold rounded-xl"
                style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}
              >
                <Plus className="mr-2 w-4 h-4" />
                Nouveau post
              </Button>
            </Link>
          </div>
        </div>

        {viewMode === 'calendar' ? (
          <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
            {/* Calendar Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-muted transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-bold text-foreground">
                {MONTHS[currentMonth]} {currentYear}
              </h2>
              <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-muted transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 border-b border-border">
              {WEEKDAYS.map((day) => (
                <div key={day} className="px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {/* Empty cells for first day */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[140px] border-b border-r border-border bg-muted/5" />
              ))}

              {/* Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayPosts = getPostsForDay(day);
                const todayCell = isToday(day);

                return (
                  <div
                    key={day}
                    className={`min-h-[140px] border-b border-r border-border p-3 transition-colors hover:bg-muted/20 cursor-pointer
                      ${todayCell ? 'bg-primary/3' : ''}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1
                      ${todayCell ? 'bg-primary text-white' : 'text-foreground hover:bg-muted'}`}>
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {dayPosts.slice(0, 3).map((post) => (
                        <PostPill key={post.id} post={post} onClick={() => setSelectedPost(post)} />
                      ))}
                      {dayPosts.length > 3 && (
                        <p className="text-[10px] text-muted-foreground pl-1">+{dayPosts.length - 3} autres</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {['scheduled', 'published', 'draft'].map((status) => {
              const posts = MOCK_POSTS.filter((p) => p.status === status);
              if (posts.length === 0) return null;
              return (
                <div key={status}>
                  <div className="flex items-center gap-2 mb-3">
                    <StatusBadge status={status as 'draft' | 'scheduled' | 'published' | 'failed'} />
                    <span className="text-sm text-muted-foreground font-medium">{posts.length} post(s)</span>
                  </div>
                  <div className="space-y-2">
                    {posts.map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all duration-200 cursor-pointer"
                        style={{ boxShadow: '0 2px 8px -4px rgba(0,0,0,0.06)' }}
                        onClick={() => setSelectedPost(post)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <PlatformBadge platform={post.platform} />
                            </div>
                            <p className="text-sm text-foreground leading-relaxed">{post.caption}</p>
                            {post.hashtags.length > 0 && (
                              <p className="text-xs text-primary mt-1.5">{post.hashtags.join(' ')}</p>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            {(post.scheduledAt || post.publishedAt) && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{formatDateTime((post.scheduledAt || post.publishedAt)!)}</span>
                              </div>
                            )}
                            {post.likes !== undefined && post.likes > 0 && (
                              <p className="text-sm font-bold text-foreground mt-1">{post.likes.toLocaleString()} likes</p>
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
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Légende :</p>
            {[
              { platform: 'instagram', label: 'Instagram', color: '#E1306C' },
              { platform: 'threads', label: 'Threads', color: '#000000' },
              { platform: 'both', label: 'IG + Threads', color: '#4F46E5' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
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
