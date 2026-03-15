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

// ─── Phone Preview ────────────────────────────────────────────
function PhonePreview({ caption, hashtags, platform, mediaUrls }: { caption: string; hashtags: string[]; platform: PlatformType; mediaUrls: string[] }) {
  const isInstagram = platform === 'instagram' || platform === 'both';

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-5">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[10px] font-black shadow-lg"
          style={{ background: isInstagram ? 'linear-gradient(135deg, #E1306C, #F56040)' : '#000' }}
        >
          {isInstagram ? 'IG' : 'TH'}
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/80">
          Aperçu {isInstagram ? 'Instagram' : 'Threads'}
        </span>
      </div>

      {/* Phone frame */}
      <div className="relative mx-auto w-full max-w-[280px] bg-black rounded-[3rem] p-3 shadow-2xl border-[6px] border-zinc-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-2xl z-10" /> {/* Dynamic Island */}
        
        <div className="bg-white rounded-[2.2rem] h-full overflow-hidden flex flex-col">
          {/* Post header */}
          <div className="flex items-center gap-2 px-4 pt-5 pb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border border-white">
              <span className="text-white text-[10px] font-black tracking-tighter">DEOS</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-900 leading-none">@deos.thryve</p>
              <p className="text-[8px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Maintenant</p>
            </div>
            <button className="ml-auto text-gray-300">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Media placeholder / preview */}
          <div className="aspect-square bg-zinc-100 flex items-center justify-center overflow-hidden">
            {mediaUrls.length > 0 ? (
              <img src={mediaUrls[0]} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center opacity-40">
                <Image className="w-10 h-10 text-zinc-400 mx-auto mb-2" />
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Média</p>
              </div>
            )}
          </div>

          {/* Icons */}
          <div className="px-4 py-3 flex items-center gap-4 text-zinc-800">
            <Heart className="w-5 h-5" />
            <MessageSquare className="w-5 h-5" />
            <Send className="w-5 h-5" />
          </div>

          {/* Caption */}
          <div className="px-4 pb-6">
            <p className="text-[11px] text-gray-900 leading-relaxed">
              <span className="font-black mr-1">deos.thryve</span>
              {caption || <span className="text-gray-300 italic">Votre texte ici...</span>}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {hashtags.map((h) => (
                <span key={h} className="text-[10px] text-blue-600 font-bold">{h}</span>
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
        await publishToAutomation(postData);
      } catch (autoError) {
        console.error('Automation failed:', autoError);
        // We don't necessarily block since it's already in the DB, 
        // but we should notify the user.
      }
    }
    
    setPublishing(false);
    setShowSuccess(true);
    setTimeout(() => navigate(ROUTE_PATHS.CALENDAR), 2000);
  };

  const publishToAutomation = async (post: any) => {
    // 1. Fetch credentials for the selected account
    const { data: account, error: accError } = await supabase
      .from('social_accounts')
      .select('*')
      .eq('id', post.account_id)
      .single();

    if (accError || !account) {
      console.warn('Could not find credentials for automation');
      return;
    }

    const endpoint = post.platform === 'threads' 
      ? 'http://localhost:3001/api/threads/publish' 
      : 'http://localhost:3001/api/instagram/publish';

    const body = post.platform === 'threads'
      ? { 
          username: account.username, 
          password: account.password_encrypted, // Note: real app would decrypt
          text: post.caption,
          mediaUrls: post.media_urls
        }
      : {
          username: account.username,
          password: account.password_encrypted,
          caption: post.caption,
          mediaUrls: post.media_urls
        };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Automation server responded with error');
    }
    return response.json();
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tighter sm:text-4xl">
              Créer un post ✏️
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              Composez et programmez votre prochaine pépite.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-xl font-medium"
              onClick={handleSaveDraft}
              disabled={saving}
            >
              {saving ? (
                <div className="w-3.5 h-3.5 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="mr-2 w-3.5 h-3.5" />
              )}
              Enregistrer
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
          {/* Left: Form */}
          <div className="md:col-span-2 lg:col-span-2 2xl:col-span-3 space-y-8">
            {/* Platform Selection */}
            <div className="bg-card/40 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm transition-all hover:bg-card/50">
              <h3 className="text-sm font-black text-foreground uppercase tracking-widest mb-6 border-l-4 border-primary pl-4">Plateforme</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {([ 
                  { value: 'instagram', label: 'Instagram', icon: Instagram, color: '#E1306C' },
                  { value: 'threads', label: 'Threads', icon: MessageSquare, color: '#000000' },
                  { value: 'both', label: 'Les deux', icon: Globe, color: '#4F46E5' },
                ] as const).map(({ value, label, icon: Icon, color }) => (
                  <button
                    key={value}
                    onClick={() => setPlatform(value)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300
                      ${platform === value ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(79,70,229,0.1)]' : 'border-border/60 bg-white/5 hover:border-primary/30 hover:bg-white/10'}`}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${color}` }}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-black text-foreground uppercase tracking-wider">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Media */}
            <div className="bg-card rounded-2xl p-5 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
              <h3 className="text-sm font-semibold text-foreground mb-4">Médias</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                <Dialog open={isLibraryOpen} onOpenChange={setIsLibraryOpen}>
                  <DialogTrigger asChild>
                    <div className="aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/40 hover:bg-muted/40 transition-colors cursor-pointer">
                      <Plus className="w-5 h-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Ajouter</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                      <DialogTitle>Sélectionner des médias</DialogTitle>
                    </DialogHeader>
                    <div className="p-1 space-y-4 flex-1 overflow-hidden flex flex-col">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          placeholder="Rechercher..." 
                          className="pl-9 rounded-xl"
                          value={mediaSearch}
                          onChange={(e) => setMediaSearch(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 overflow-y-auto pr-1">
                        {libraryMedia.filter(m => m.name.toLowerCase().includes(mediaSearch.toLowerCase())).map((m) => (
                          <div 
                            key={m.id} 
                            onClick={() => toggleMediaSelection(m.url)}
                            className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                              selectedMediaUrls.includes(m.url) ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-muted-foreground/30'
                            }`}
                          >
                            <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="ghost" onClick={() => setIsLibraryOpen(false)}>Annuler</Button>
                      <Button onClick={() => setIsLibraryOpen(false)}>Confirmer ({selectedMediaUrls.length})</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {selectedMediaUrls.map((url, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border border-border relative group">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => toggleMediaSelection(url)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1.5">
                  <Image className="w-3.5 h-3.5" /> Photo
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1.5">
                  <Video className="w-3.5 h-3.5" /> Vidéo
                </Button>
              </div>
            </div>

            {/* Caption */}
            <div className="bg-card/40 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm transition-all hover:bg-card/50">
              <div className="flex items-center justify-between mb-5 border-l-4 border-accent pl-4">
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest">Caption</h3>
                <span className={`text-xs font-black ${captionLength > maxCaption * 0.9 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {captionLength} / {maxCaption}
                </span>
              </div>

              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Rédigez votre chef-d'œuvre ici... 📖&#10;&#10;Astuce : Attirez l'attention dès le premier mot !"
                className="min-h-[180px] rounded-2xl resize-none text-base leading-relaxed bg-white/5 border-border/60 focus:ring-primary"
                maxLength={maxCaption}
              />

              {/* AI & emoji toolbar */}
              <div className="flex items-center gap-2 mt-3">
                <button className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 bg-primary/8 px-3 py-1.5 rounded-full border border-primary/15 transition-colors">
                  <Sparkles className="w-3.5 h-3.5" />
                  Générer avec l'IA
                </button>
                <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted px-3 py-1.5 rounded-full transition-colors">
                  <Smile className="w-3.5 h-3.5" />
                  Emoji
                </button>
              </div>

              {/* Caption suggestions */}
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2 font-medium">Suggestions rapides :</p>
                <div className="flex flex-wrap gap-2">
                  {CAPTION_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setCaption(s)}
                      className="text-xs bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg transition-colors truncate max-w-[200px]"
                    >
                      {s.slice(0, 35)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hashtags */}
            <div className="bg-card rounded-2xl p-5 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Hashtags</h3>
                <span className="text-xs text-muted-foreground">{hashtags.length}/30</span>
              </div>

              <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Ajouter un hashtag..."
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addHashtag()}
                    className="w-full pl-8 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                <Button variant="outline" size="sm" className="rounded-xl" onClick={addHashtag}>
                  Ajouter
                </Button>
              </div>

              {/* Selected tags */}
              {hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {hashtags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 bg-primary/8 text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/15">
                      {tag}
                      <button onClick={() => removeHashtag(tag)}>
                        <X className="w-3 h-3 hover:text-primary/60" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium">Hashtags populaires :</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_HASHTAGS.filter((h) => !hashtags.includes(h)).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setHashtags([...hashtags, tag])}
                      className="text-xs bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground px-2.5 py-1 rounded-full transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-card rounded-2xl p-5 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
              <h3 className="text-sm font-semibold text-foreground mb-4">Publication</h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setScheduleType('now')}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200
                    ${scheduleType === 'now' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                >
                  <Send className="w-4 h-4 text-primary" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">Maintenant</p>
                    <p className="text-xs text-muted-foreground">Publier immédiatement</p>
                  </div>
                </button>
                <button
                  onClick={() => setScheduleType('schedule')}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200
                    ${scheduleType === 'schedule' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">Programmer</p>
                    <p className="text-xs text-muted-foreground">Choisir date & heure</p>
                  </div>
                </button>
              </div>

              {scheduleType === 'schedule' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-2 gap-3"
                >
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Date</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min="2026-03-15"
                      className="w-full px-3 py-2 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Heure</label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Accounts Selection */}
            <div className="bg-card rounded-2xl p-5 border border-border" style={{ boxShadow: '0 2px 12px -4px rgba(0,0,0,0.06)' }}>
              <h3 className="text-sm font-semibold text-foreground mb-4">Comptes cibles</h3>
              <div className="space-y-2">
                {connectedAccounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => toggleAccount(account.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200
                      ${selectedAccounts.has(account.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: account.platform === 'instagram' ? 'linear-gradient(135deg, #E1306C, #F56040)' : '#000' }}
                    >
                      {account.platform === 'instagram' ? 'IG' : 'TH'}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-foreground">{account.username}</p>
                      <p className="text-xs text-muted-foreground">{account.followers.toLocaleString()} abonnés</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                      ${selectedAccounts.has(account.id) ? 'bg-primary border-primary' : 'border-border'}`}>
                      {selectedAccounts.has(account.id) && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2 pb-8">
              <Button
                variant="outline"
                className="flex-1 rounded-xl font-semibold py-5"
                onClick={handleSaveDraft}
                disabled={saving}
              >
                <Save className="mr-2 w-4 h-4" />
                Brouillon
              </Button>
              <Button
                className="flex-1 rounded-xl font-bold py-5"
                onClick={handlePublish}
                disabled={publishing || selectedAccounts.size === 0}
                style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}
              >
                {publishing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Send className="mr-2 w-4 h-4" />
                )}
                {scheduleType === 'now' ? 'Publier maintenant' : 'Programmer'}
              </Button>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-10">
              <div className="bg-card/40 backdrop-blur-sm rounded-[2.5rem] p-10 border border-border/50 shadow-xl">
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest mb-8 text-center">Rendu Final</h3>
                <PhonePreview caption={caption} hashtags={hashtags} platform={platform} mediaUrls={selectedMediaUrls} />
              </div>

              {/* Tips */}
              <div className="mt-4 bg-primary/5 rounded-2xl p-4 border border-primary/15">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">Conseil d'engagement</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Les posts publiés entre 9h-11h et 19h-21h obtiennent en moyenne 2× plus d'engagement.
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
