// ============================================================
// THRYVE — Create Post Page
// ============================================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Instagram, MessageSquare, Globe, Plus, X, Image, Video,
  Sparkles, Smile, Hash, Send, Calendar, CheckCircle2, Save,
  Search, Grid3X3, ChevronDown, AlertCircle, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from '@/components/Layout';
import { ROUTE_PATHS, type MediaFile } from '@/lib/index';
import { MOCK_ACCOUNTS } from '@/data/index';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { automationService } from '@/services/automation';
import { toast } from '@/hooks/use-toast';

// ─── Caption suggestions ──────────────────────────────────────
const CAPTION_SUGGESTIONS = [
  '✨ La créativité ne dort jamais. Voici notre dernière création !',
  '🎯 Le secret des marques qui cartonnent ? La cohérence.',
  '🚀 Nouvelle collection disponible. Découvrez nos dernières créations.',
  '💡 5 conseils pour booster votre engagement sur Instagram en 2026',
];

const SUGGESTED_HASHTAGS = [
  '#contentcreator', '#socialmedia', '#instagram', '#threads',
  '#marketing', '#digitalmarketing', '#creative', '#design',
  '#branding', '#growth', '#engagement', '#creator',
];

type PlatformType = 'instagram' | 'threads' | 'both';
type ScheduleType = 'now' | 'schedule';

// ─── Phone Preview Nexus ──────────────────────────────────────
function PhonePreview({ caption, hashtags, platform, mediaUrls }: { caption: string; hashtags: string[]; platform: PlatformType; mediaUrls: string[] }) {
  const isInstagram = platform === 'instagram' || platform === 'both';

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-black shadow-2xl animate-crystal border border-white/40"
          style={{ background: isInstagram ? 'linear-gradient(135deg, #E1306C, #F56040)' : '#000' }}
        >
          {isInstagram ? 'IG' : 'TH'}
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
          SIGNAL: {isInstagram ? 'INSTAGRAM' : 'THREADS'}
        </span>
      </div>

      {/* Phone frame — Crystal Obsidian */}
      <div className="relative mx-auto w-full max-w-[320px] bg-[#050505] rounded-[4rem] p-4 shadow-[0_0_100px_rgba(0,0,0,0.5)] border-[10px] border-[#1a1a1a]">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-3xl z-10 flex items-center justify-center">
            <div className="w-12 h-1.5 bg-zinc-800 rounded-full" />
        </div>
        
        <div className="bg-white rounded-[3rem] h-[550px] overflow-hidden flex flex-col shadow-inner">
          {/* Post header */}
          <div className="flex items-center gap-3 px-6 pt-10 pb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-2 border-white shadow-lg overflow-hidden">
              <span className="text-white text-[10px] font-black tracking-tighter">ALPHA</span>
            </div>
            <div>
              <p className="text-[11px] font-black text-gray-950 leading-none">@thryve.nexus</p>
              <p className="text-[9px] text-gray-400 mt-1 uppercase font-black tracking-tighter">STREAM EN COURS</p>
            </div>
            <button className="ml-auto text-gray-200">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Media placeholder / preview */}
          <div className="aspect-square bg-zinc-50 flex items-center justify-center overflow-hidden border-y border-gray-100">
            {mediaUrls.length > 0 ? (
              <img src={mediaUrls[0]} alt="Preview" className="w-full h-full object-cover animate-in fade-in zoom-in duration-700" />
            ) : (
              <div className="text-center opacity-10 scale-150">
                <Image className="w-20 h-20 text-gray-950 mx-auto mb-4" />
                <p className="text-[10px] text-gray-950 font-black uppercase tracking-[0.5em]">SYNC MEDIA</p>
              </div>
            )}
          </div>

          {/* Icons */}
          <div className="px-6 py-5 flex items-center gap-6 text-gray-900 border-b border-gray-50">
            <Heart className="w-6 h-6 stroke-[2.5]" />
            <MessageSquare className="w-6 h-6 stroke-[2.5]" />
            <Send className="w-6 h-6 stroke-[2.5]" />
          </div>

          {/* Caption */}
          <div className="px-6 py-6 flex-1 overflow-y-auto no-scrollbar bg-gray-50/30">
            <p className="text-[12px] text-gray-950 leading-relaxed font-medium">
              <span className="font-black mr-2 text-primary">thryve.nexus</span>
              {caption || <span className="text-gray-300 italic">VOTRE SIGNAL ALPHA ICI...</span>}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {hashtags.map((h) => (
                <span key={h} className="text-[10px] text-primary font-black uppercase tracking-tighter">{h}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Create Post Page ────────────────────────────────────
export default function CreatePost() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [scheduleType, setScheduleType] = useState<ScheduleType>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(new Set(['a1']));
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [libraryMedia, setLibraryMedia] = useState<MediaFile[]>([]);
  const [selectedMediaUrls, setSelectedMediaUrls] = useState<string[]>([]);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

  useEffect(() => {
    const fetchLibrary = async () => {
      if (!user) return;
      const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false });
      if (data) setLibraryMedia(data);
    };
    fetchLibrary();
  }, [user]);

  const toggleMediaSelection = (url: string) => {
    setSelectedMediaUrls((prev: string[]) => 
      prev.includes(url) ? prev.filter((u: string) => u !== url) : [...prev, url]
    );
  };

  const captionLength = caption.length;
  const maxCaption = platform === 'threads' ? 500 : 2200;

  const addHashtag = () => {
    const tag = hashtagInput.trim();
    if (!tag) return;
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    if (!hashtags.includes(formatted) && hashtags.length < 30) {
      setHashtags([...hashtags, formatted]);
    }
    setHashtagInput('');
  };

  const removeHashtag = (tag: string) => setHashtags(hashtags.filter((h) => h !== tag));

  const toggleAccount = (id: string) => {
    setSelectedAccounts((prev: Set<string>) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePublish = async () => {
    if (!user) {
      alert('Veuillez vous connecter pour publier.');
      return;
    }
    
    setPublishing(true);
    
    // Construct post object
    const postData = {
      user_id: user.id,
      caption,
      hashtags,
      media_urls: selectedMediaUrls,
      platform,
      status: scheduleType === 'now' ? 'published' : 'scheduled',
      scheduled_at: scheduleType === 'schedule' ? `${scheduleDate}T${scheduleTime}:00Z` : null,
      account_id: Array.from(selectedAccounts)[0] || null,
    };

    const { error } = await supabase.from('posts').insert([postData]);
    
    if (error) {
      alert(`Erreur lors de la publication : ${error.message}`);
      setPublishing(false);
      return;
    }

    // Trigger Automation if publishing 'now'
    if (scheduleType === 'now') {
      try {
        const autoResults = await publishToAutomation(postData);
        if (autoResults.some(r => !r.success)) {
          console.warn('Certaines publications automatisées ont échoué');
          toast({
            title: "Transmission Alpha Partielle",
            description: "Certains canaux n'ont pas répondu. Vérifiez vos terminaux.",
            variant: "destructive"
          });
        } else {
           toast({
            title: "Transmission Alpha Réussie",
            description: "Le signal a été propagé avec succès sur tous les canaux.",
          });
        }
      } catch (autoError) {
        console.error('Automation failed:', autoError);
        toast({
          title: "Échec du Signal",
          description: "Le Core Engine est inaccessible. Passage en mode manuel.",
          variant: "destructive"
        });
      }
    }
    
    setPublishing(false);
    setShowSuccess(true);
    setTimeout(() => navigate(ROUTE_PATHS.CALENDAR), 2000);
  };

  const publishToAutomation = async (post: any) => {
    const results = [];
    
    // Pour chaque compte sélectionné, on lance l'automatisation
    for (const accountId of selectedAccounts) {
      const { data: account, error: accError } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('id', accountId)
        .single();

      if (accError || !account) continue;

      if (post.platform === 'threads' || post.platform === 'both') {
        const res = await automationService.publishThreads({
          username: account.username,
          passwordLegacy: account.password_encrypted,
          text: post.caption,
          mediaUrls: post.media_urls
        });
        results.push(res);
      }

      if (post.platform === 'instagram' || post.platform === 'both') {
        const res = await automationService.publishInstagram({
          username: account.username,
          passwordLegacy: account.password_encrypted,
          caption: post.caption,
          mediaUrls: post.media_urls,
          type: 'post' // Default to post for now, logic for Reels/Stories can be added UI-side
        });
        results.push(res);
      }
    }
    
    return results;
  };

  const handleSaveDraft = async () => {
    if (!user) return;
    
    setSaving(true);
    
    const draftData = {
      user_id: user.id,
      caption,
      hashtags,
      media_urls: [] as string[],
      platform,
      status: 'draft',
      account_id: Array.from(selectedAccounts)[0] || null,
    };

    const { error } = await supabase.from('posts').insert([draftData]);
    
    setSaving(false);
    
    if (error) {
      alert(`Erreur lors de l'enregistrement : ${error.message}`);
    }
  };

  const connectedAccounts = MOCK_ACCOUNTS.filter((a) => a.isConnected);

  if (showSuccess) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-2xl font-extrabold text-foreground mb-3">
              {scheduleType === 'now' ? 'Post publié ! 🎉' : 'Post programmé ! 🚀'}
            </h2>
            <p className="text-muted-foreground">
              {scheduleType === 'now'
                ? 'Votre publication a été envoyée sur vos comptes.'
                : `Votre publication sera publiée le ${scheduleDate} à ${scheduleTime}.`}
            </p>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10 space-y-10 w-full max-w-full">
        {/* Header Stream */}
        <div className="flex items-center justify-between pb-12 border-b border-white/40">
          <div>
            <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter uppercase leading-[0.8]">
              STUDIO<br /><span className="text-reveal">ALPHA</span>
            </h1>
            <p className="text-[10px] text-foreground/40 mt-6 font-black uppercase tracking-[0.6em]">
              ORCHESTREZ VOS TRANSMISSIONS MULTI-CANAUX.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-[2rem] px-10 py-10 glass-master border-white/50 font-black uppercase tracking-[0.3em] text-[10px] hover:scale-110 active:scale-95 transition-all duration-700 shadow-xl"
              onClick={handleSaveDraft}
              disabled={saving}
            >
              {saving ? (
                <div className="w-6 h-6 border-4 border-foreground/30 border-t-transparent rounded-full animate-spin mr-3" />
              ) : (
                <Save className="mr-3 w-6 h-6" />
              )}
              ARCHIVER BROUILLON
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
          {/* Left: Form */}
          <div className="md:col-span-2 lg:col-span-2 2xl:col-span-3 space-y-8">
            {/* Platform Nexus */}
            <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 -z-10" />
              <div className="flex items-center gap-4 mb-10 border-l-8 border-primary pl-6">
                <h3 className="text-sm font-black text-foreground uppercase tracking-[0.4em]">CANAUX DE DIFFUSION</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {([ 
                   { value: 'instagram', label: 'INSTAGRAM', icon: Instagram, color: 'var(--primary)' },
                   { value: 'threads', label: 'THREADS', icon: MessageSquare, color: 'var(--secondary)' },
                   { value: 'both', label: 'NEXUS HYBRID', icon: Globe, color: '#8b5cf6' },
                ] as const).map(({ value, label, icon: Icon, color }) => (
                  <button
                    key={value}
                    onClick={() => setPlatform(value)}
                    className={`flex flex-col items-center justify-center gap-5 p-10 rounded-[2.5rem] border transition-all duration-700 relative overflow-hidden group
                      ${platform === value ? 'border-primary ring-2 ring-primary/40 bg-primary/5 shadow-2xl scale-105' : 'border-white/30 bg-white/5 hover:border-primary/40 hover:bg-white/10'}`}
                  >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl border border-white/40" style={{ backgroundColor: `${color}20` }}>
                      <Icon className={`w-8 h-8 animate-crystal`} style={{ color }} />
                    </div>
                    <span className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">{label}</span>
                    
                    {platform === value && (
                      <motion.div 
                        layoutId="active-glow"
                        className="absolute inset-0 bg-primary/5 blur-[40px] -z-10"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Media Nexus */}
            <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-10 border-l-8 border-secondary pl-6">
                <h3 className="text-sm font-black text-foreground uppercase tracking-[0.4em]">UNITÉS MÉDIAS</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                <Dialog open={isLibraryOpen} onOpenChange={setIsLibraryOpen}>
                  <DialogTrigger asChild>
                    <div className="aspect-square glass-master border-[2px] border-dashed border-white/30 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-white/10 transition-all duration-700 cursor-pointer group/add">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center group-hover/add:scale-110 group-hover/add:bg-primary/10 transition-all duration-700">
                        <Plus className="w-8 h-8 text-foreground/20 group-hover/add:text-primary animate-crystal" />
                      </div>
                      <span className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">AJOUTER</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl glass-master border-white/40 rounded-[3rem] p-12 shadow-2xl">
                    <DialogHeader className="mb-8">
                      <DialogTitle className="text-3xl font-black text-foreground tracking-tighter uppercase">BIBLIOTHÈQUE ALPHA</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-8 flex-1 overflow-hidden flex flex-col">
                      <div className="relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-foreground/30" />
                        <Input 
                          placeholder="FILTRER LES FLUX..." 
                          className="pl-16 h-16 rounded-[2rem] glass-master border-white/50 font-black uppercase tracking-widest text-xs focus:bg-white/10"
                          value={mediaSearch}
                          onChange={(e) => setMediaSearch(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 overflow-y-auto pr-2 no-scrollbar">
                        {libraryMedia.filter(m => m.name.toLowerCase().includes(mediaSearch.toLowerCase())).map((m) => (
                          <div 
                            key={m.id} 
                            onClick={() => toggleMediaSelection(m.url)}
                            className={`aspect-square rounded-2xl overflow-hidden border-4 cursor-pointer transition-all duration-500 shadow-xl relative group
                              ${selectedMediaUrls.includes(m.url) ? 'border-primary ring-4 ring-primary/40 scale-[0.98]' : 'border-white/20 hover:border-primary/40 hover:scale-105'}`}
                          >
                            <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                            {selectedMediaUrls.includes(m.url) && (
                              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-white shadow-2xl" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-6 pt-10 mt-6 border-t border-white/20">
                      <Button variant="ghost" className="rounded-xl font-black uppercase tracking-widest text-[10px]" onClick={() => setIsLibraryOpen(false)}>ANNULER</Button>
                      <Button className="rounded-[1.5rem] px-10 py-8 bg-primary text-white font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl border-none" onClick={() => setIsLibraryOpen(false)}>
                        CONFIRMER SYNC ({selectedMediaUrls.length})
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {selectedMediaUrls.map((url, i) => (
                  <div key={url} className="aspect-square rounded-[2rem] overflow-hidden border border-white/40 relative group shadow-xl">
                    <img src={url} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <button 
                      onClick={() => toggleMediaSelection(url)}
                      className="absolute top-3 right-3 w-8 h-8 glass-master bg-destructive/60 border-white/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 hover:bg-destructive"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 mt-12 bg-white/5 p-4 rounded-[2rem] border border-white/10 w-fit">
                <Button variant="ghost" className="rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 text-foreground/60 hover:text-primary">
                  <Image className="w-4 h-4" /> STATIC ALPHA
                </Button>
                <div className="w-[1px] bg-white/10" />
                <Button variant="ghost" className="rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 text-foreground/60 hover:text-secondary">
                  <Video className="w-4 h-4" /> MOTION CHANNELS
                </Button>
              </div>
            </div>

            {/* Editor Nexus */}
            <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 -z-10" />
              <div className="flex items-center justify-between mb-10 border-l-8 border-accent pl-6">
                <h3 className="text-sm font-black text-foreground uppercase tracking-[0.4em]">FLUX DE CAPTION</h3>
                <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 glass-master ${captionLength > maxCaption * 0.9 ? 'text-destructive animate-pulse' : 'text-foreground/40'}`}>
                  {captionLength} / {maxCaption} OCTETS
                </span>
              </div>

              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="PROJETEZ VOTRE VISION ALPHA ICI...&#10;&#10;Astuce : Le signal doit être clair et percutant."
                className="min-h-[250px] rounded-[2rem] resize-none text-xl font-black uppercase tracking-tighter leading-tight bg-white/5 border-white/40 focus:bg-white/10 focus:ring-primary/40 transition-all duration-700 p-10 placeholder:text-foreground/10"
                maxLength={maxCaption}
              />

              {/* Engine Shortcuts */}
              <div className="flex items-center gap-4 mt-8">
                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white bg-primary/10 hover:bg-primary px-8 py-5 rounded-[1.5rem] border border-primary/20 transition-all duration-700 shadow-xl group/ia">
                  <Sparkles className="w-5 h-5 group-hover/ia:animate-crystal" />
                  GÉNIUS IA ACTIVER
                </button>
                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-foreground glass-master px-8 py-5 rounded-[1.5rem] border-white/40 transition-all duration-700">
                  <Smile className="w-5 h-5 text-secondary" />
                  EMOJI SYNC
                </button>
              </div>

              {/* Signal Suggestions */}
              <div className="mt-10 pt-10 border-t border-white/10">
                <p className="text-[10px] text-foreground/20 mb-6 font-black uppercase tracking-[0.4em]">SUGGESTIONS DE SIGNAL :</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CAPTION_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setCaption(s)}
                      className="text-[9px] glass-master border-white/30 hover:border-primary/50 text-foreground/40 hover:text-foreground p-6 rounded-[1.5rem] transition-all duration-500 text-left uppercase font-black tracking-widest leading-relaxed truncate group/s"
                    >
                      <span className="opacity-0 group-hover/s:opacity-100 transition-opacity mr-2 text-primary">»</span>
                      {s.slice(0, 50)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hashtag Stream */}
            <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-10 border-l-8 border-primary pl-6">
                <h3 className="text-sm font-black text-foreground uppercase tracking-[0.4em]">HASHTAGS ALPHA</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{hashtags.length} / 30 TAGS SYNC</span>
              </div>

              <div className="flex gap-4 mb-10">
                <div className="relative flex-1">
                  <Hash className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                  <input
                    type="text"
                    placeholder="AJOUTER SIGNAL TAG..."
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addHashtag()}
                    className="w-full pl-14 pr-6 h-16 rounded-[1.5rem] glass-master border-white/40 focus:bg-white/10 font-black uppercase tracking-widest text-[10px] outline-none transition-all duration-700"
                  />
                </div>
                <Button className="rounded-[1.5rem] px-8 h-16 bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-xl border-none" onClick={addHashtag}>
                  AJOUTER
                </Button>
              </div>

              {/* Selected tags */}
              {hashtags.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-10">
                  {hashtags.map((tag) => (
                    <span key={tag} className="flex items-center gap-3 bg-primary/10 text-primary px-5 py-3 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/20 shadow-sm animate-crystal">
                      {tag}
                      <button onClick={() => removeHashtag(tag)} className="hover:text-foreground transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              <div className="pt-8 border-t border-white/10">
                <p className="text-[9px] text-foreground/20 mb-6 font-black uppercase tracking-[0.4em]">HASTAGS RECOMMANDÉS :</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_HASHTAGS.filter((h) => !hashtags.includes(h)).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setHashtags([...hashtags, tag])}
                      className="text-[8px] glass-master border-white/30 hover:border-primary/50 text-foreground/40 hover:text-foreground px-4 py-2 rounded-full transition-all duration-500 uppercase font-black tracking-widest"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Synchronization Control */}
            <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-10 border-l-8 border-secondary pl-6">
                <h3 className="text-sm font-black text-foreground uppercase tracking-[0.4em]">PROTOCOLE DE DIFFUSION</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <button
                  onClick={() => setScheduleType('now')}
                  className={`flex items-center gap-6 p-8 rounded-[2.5rem] border transition-all duration-700 relative overflow-hidden
                    ${scheduleType === 'now' ? 'border-primary bg-primary/5 shadow-2xl' : 'border-white/30 bg-white/5 hover:border-primary/40'}`}
                >
                  <div className="w-14 h-14 rounded-2xl glass-master flex items-center justify-center border-white/40 shadow-inner">
                    <Send className={`w-7 h-7 ${scheduleType === 'now' ? 'text-primary animate-crystal' : 'text-foreground/20'}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-foreground uppercase tracking-widest">TRANSMISSION DIRECTE</p>
                    <p className="text-[8px] text-foreground/30 font-black uppercase tracking-[0.2em] mt-1">SANS LATENCE</p>
                  </div>
                </button>
                <button
                  onClick={() => setScheduleType('schedule')}
                  className={`flex items-center gap-6 p-8 rounded-[2.5rem] border transition-all duration-700 relative overflow-hidden
                    ${scheduleType === 'schedule' ? 'border-secondary bg-secondary/5 shadow-2xl' : 'border-white/30 bg-white/5 hover:border-secondary/40'}`}
                >
                  <div className="w-14 h-14 rounded-2xl glass-master flex items-center justify-center border-white/40 shadow-inner">
                    <Calendar className={`w-7 h-7 ${scheduleType === 'schedule' ? 'text-secondary animate-crystal' : 'text-foreground/20'}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-foreground uppercase tracking-widest">TRANSCHRONISME</p>
                    <p className="text-[8px] text-foreground/30 font-black uppercase tracking-[0.2em] mt-1">PROGRAMMATION ALPHA</p>
                  </div>
                </button>
              </div>

              {scheduleType === 'schedule' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-6 p-8 glass-master border-white/40 rounded-[2.5rem] bg-white/5 shadow-inner"
                >
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-foreground/40 uppercase tracking-[0.4em] ml-4">DATE ALPHA</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min="2026-03-16"
                      className="w-full px-8 py-5 rounded-2xl glass-master border-white/40 text-[10px] font-black uppercase tracking-widest focus:bg-white/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-foreground/40 uppercase tracking-[0.4em] ml-4">HEURE ALPHA</label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-8 py-5 rounded-2xl glass-master border-white/40 text-[10px] font-black uppercase tracking-widest focus:bg-white/10 outline-none transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Target Account Nexus */}
            <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-10 border-l-8 border-primary pl-6">
                <h3 className="text-sm font-black text-foreground uppercase tracking-[0.4em]">CANAUX D'ÉMISSION</h3>
              </div>
              
              <div className="space-y-4">
                {loadingAccounts ? (
                  <div className="py-10 text-center text-[10px] font-black uppercase tracking-widest text-foreground/20 italic">Initialisation Nexus...</div>
                ) : accounts.length > 0 ? (
                  accounts.map((account) => (
                    <button
                      key={account.id}
                      onClick={() => toggleAccount(account.id)}
                      className={`w-full flex items-center gap-6 p-6 rounded-[2rem] border transition-all duration-700 group
                        ${selectedAccounts.includes(account.id) ? 'border-primary bg-primary/10 shadow-2xl' : 'border-white/20 glass-master hover:border-white/40'}`}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-700 group-hover:scale-110"
                        style={{ background: account.platform === 'instagram' ? 'linear-gradient(135deg, #E1306C, #F56040)' : '#000' }}
                      >
                        {account.platform === 'instagram' ? <Instagram className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="font-black text-foreground tracking-tighter truncate uppercase">{account.username}</p>
                        <p className="text-[9px] text-foreground/40 font-black uppercase tracking-[0.2em] mt-1 italic">{account.followers.toLocaleString()} UNITÉS REACH</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500
                        ${selectedAccounts.includes(account.id) ? 'bg-primary border-primary scale-110 shadow-[0_0_20px_rgba(79,70,229,0.4)]' : 'border-white/20 h-4 w-4'}`}>
                        {selectedAccounts.includes(account.id) && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="py-10 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 italic">Aucune unité de diffusion active</p>
                    <Link to={ROUTE_PATHS.ACCOUNTS}>
                        <Button variant="ghost" className="mt-4 text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary/5">Synchroniser un compte →</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Engine Actions */}
            <div className="flex flex-col sm:flex-row gap-6 pt-10 pb-20">
              <Button
                variant="outline"
                className="flex-1 rounded-[2.5rem] py-12 glass-master border-white/50 font-black uppercase tracking-[0.4em] text-[10px] hover:scale-105 active:scale-95 transition-all duration-700 shadow-xl"
                onClick={handleSaveDraft}
                disabled={saving}
              >
                {saving ? (
                  <div className="w-5 h-5 border-4 border-foreground/30 border-t-transparent rounded-full animate-spin mr-4" />
                ) : (
                  <Save className="mr-4 w-6 h-6" />
                )}
                GÉNÉRER BROUILLON
              </Button>
              <Button
                className="flex-1 rounded-[2.5rem] py-12 bg-primary text-white font-black uppercase tracking-[0.6em] text-[10px] shadow-[0_20px_60px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95 transition-all duration-700 border-none group/send"
                onClick={handlePublish}
                disabled={publishing || selectedAccounts.size === 0}
              >
                {publishing ? (
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mr-4" />
                ) : (
                  <Send className="mr-4 w-6 h-6 group-hover/send:translate-x-2 group-hover/send:-translate-y-2 transition-transform duration-500" />
                )}
                {scheduleType === 'now' ? 'LANCER DIFFUSION' : 'ACTIVER PROGRAMMATION'}
              </Button>
            </div>
          </div>

          {/* Right: Immersive Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-10 space-y-8">
              <div className="glass-master rounded-[3.5rem] p-12 border-white/40 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 -z-10" />
                <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.6em] mb-12 text-center opacity-40">RENDU FINAL DU SIGNAL</h3>
                <PhonePreview caption={caption} hashtags={hashtags} platform={platform} mediaUrls={selectedMediaUrls} />
              </div>

              {/* Engagement Optimizers */}
              <div className="glass-master rounded-[2.5rem] p-10 border-white/40 shadow-2xl relative overflow-hidden group/tip">
                <div className="absolute inset-0 bg-secondary/5 -z-10" />
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl glass-master flex items-center justify-center border-white/40 shadow-inner group-hover/tip:animate-crystal">
                    <Sparkles className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-foreground uppercase tracking-widest mb-3">CONSEIL D'IMPACT ALPHA</p>
                    <p className="text-[11px] text-foreground/40 font-black uppercase tracking-widest leading-relaxed">
                      L'ALGORITHME PRIVILÉGIE LES TRANSMISSIONS ENTRE 09H ET 11H. VOTRE REACH POURRAIT AUGMENTER DE 240%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
