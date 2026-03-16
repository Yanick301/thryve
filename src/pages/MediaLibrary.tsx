// ============================================================
// THRYVE — Media Library Page
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Grid3X3, List, Search, Filter, FolderOpen, Trash2,
  Image, Video, Plus, X, Download, Eye, MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DashboardLayout } from '@/components/Layout';
import { EmptyState } from '@/components/Cards';
import { MOCK_FOLDERS } from '@/data/index';
import type { MediaFile, MediaFolder } from '@/lib/index';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

function formatFileSize(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  return `${(bytes / 1_000).toFixed(0)} KB`;
}

// ─── Folder Card ──────────────────────────────────────────────
function FolderCard({ folder, active, onClick }: { folder: MediaFolder; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all duration-500 text-left w-full glass-master group
        ${active ? 'border-primary ring-1 ring-primary/40 bg-primary/5 shadow-2xl' : 'border-white/40 hover:border-primary/40 hover:bg-white/10'}`}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner border border-white/20" style={{ backgroundColor: `${folder.color}15` }}>
        <FolderOpen className="w-5 h-5 animate-crystal" style={{ color: folder.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black text-foreground uppercase tracking-widest truncate">{folder.name}</p>
        <p className="text-[8px] text-foreground/30 font-black uppercase tracking-[0.2em]">{folder.count} ALPHA UNITS</p>
      </div>
    </button>
  );
}

// ─── Media Card (Grid) ────────────────────────────────────────
function MediaGridCard({ file, selected, onSelect, onDelete }: { file: MediaFile; selected: boolean; onSelect: (id: string) => void; onDelete: (id: string) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative aspect-square rounded-[2rem] overflow-hidden border cursor-pointer transition-all duration-500 shadow-xl
        ${selected ? 'ring-4 ring-primary/40 border-primary shadow-2xl scale-[0.98]' : 'border-white/40 hover:shadow-2xl hover:scale-105'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(file.id)}
    >
      <img
        src={file.url}
        alt={file.name}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        loading="lazy"
      />

      {/* Glass Overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 glass-master bg-white/10 flex items-center justify-center gap-4 border-none"
          >
            <button className="w-12 h-12 glass-master rounded-xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-500 border-white/50" onClick={(e) => { e.stopPropagation(); window.open(file.url, '_blank'); }}>
              <Eye className="w-5 h-5 text-foreground animate-crystal" />
            </button>
            <button className="w-12 h-12 glass-master rounded-xl flex items-center justify-center hover:bg-destructive hover:text-white hover:scale-110 transition-all duration-500 border-white/50" onClick={(e) => { e.stopPropagation(); onDelete(file.id); }}>
              <Trash2 className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selection Nexus */}
      {selected && (
        <div className="absolute top-4 left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-2xl animate-pulse">
          <X className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Alpha Badge */}
      <div className="absolute top-4 right-4">
        {file.type === 'video' ? (
          <span className="glass-master text-white text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest flex items-center gap-1.5 border-white/40">
            <Video className="w-3 h-3 text-secondary" /> ALPHA-V
          </span>
        ) : null}
      </div>

      {/* Meta Stream */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-white text-[10px] font-black uppercase tracking-widest truncate">{file.name}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-white/40 text-[8px] font-black uppercase tracking-widest">{formatFileSize(file.size)}</p>
          <div className="w-2 h-2 rounded-full bg-primary animate-crystal" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Media List Row ───────────────────────────────────────────
function MediaListRow({ file, selected, onSelect, onDelete }: { file: MediaFile; selected: boolean; onSelect: (id: string) => void; onDelete: (id: string) => void }) {
  return (
    <div
      className={`flex items-center gap-6 px-8 py-5 hover:bg-white/10 transition-all duration-500 cursor-pointer rounded-3xl border mb-3 glass-master group
        ${selected ? 'bg-primary/5 border-primary shadow-2xl scale-[0.99]' : 'border-white/20'}`}
      onClick={() => onSelect(file.id)}
    >
      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/40 shadow-xl group-hover:scale-110 transition-transform duration-500">
        <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {file.type === 'image' ? (
          <Image className="w-5 h-5 text-primary animate-crystal" />
        ) : (
          <Video className="w-5 h-5 text-secondary" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black text-foreground uppercase tracking-widest truncate group-hover:text-primary transition-colors">{file.name}</p>
        <p className="text-[8px] text-foreground/30 font-black uppercase tracking-[0.2em] mt-1">{file.width} × {file.height} PX · ALPHA STREAM</p>
      </div>
      <div className="hidden sm:block text-[9px] font-black text-foreground/40 uppercase tracking-widest">{formatFileSize(file.size)}</div>
      <div className="hidden md:block text-[9px] font-black text-foreground/40 uppercase tracking-widest">
        {new Date(file.createdAt).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
      </div>
      <div className="flex items-center gap-3">
        <button className="p-3 rounded-xl glass-master hover:bg-white hover:scale-110 transition-all duration-500 border-white/40" onClick={(e) => { e.stopPropagation(); window.open(file.url, '_blank'); }}>
          <Eye className="w-4 h-4 text-foreground/60" />
        </button>
        <button 
          className="p-3 rounded-xl glass-master hover:bg-destructive hover:text-white hover:scale-110 transition-all duration-500 border-white/40"
          onClick={(e) => { e.stopPropagation(); onDelete(file.id); }}
        >
          <Trash2 className="w-4 h-4 text-foreground/60 group-hover:text-inherit" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Media Library Page ──────────────────────────────────
export default function MediaLibrary() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [dragOver, setDragOver] = useState(false);
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching media:', error);
    } else {
      setMedia(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, [user]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !user) return;

    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) {
        alert(`Erreur d'upload : ${uploadError.message}`);
        continue;
      }

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // 3. Save to Database
      const { error: dbError } = await supabase.from('media').insert([
        {
          user_id: user.id,
          name: file.name,
          url: publicUrl,
          path: filePath,
          type: file.type.startsWith('video') ? 'video' : 'image',
          size: file.size,
          folder: selectedFolder,
        }
      ]);

      if (dbError) {
        alert(`Erreur base de données : ${dbError.message}`);
      }
    }
    setUploading(false);
    fetchMedia();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) return;
    
    const fileToDelete = media.find(m => m.id === id);
    if (!fileToDelete) return;

    // 1. Delete from storage
    if (fileToDelete.path) {
      await supabase.storage.from('media').remove([fileToDelete.path]);
    }

    // 2. Delete from database
    const { error } = await supabase.from('media').delete().eq('id', id);
    if (error) {
      alert(`Erreur de suppression : ${error.message}`);
    } else {
      setMedia(media.filter(m => m.id !== id));
      setSelected(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const filteredMedia = media.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(search.toLowerCase());
    const matchesFolder = !selectedFolder || file.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10 space-y-10 w-full max-w-full">
        {/* Hidden file input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          multiple 
          onChange={handleUpload}
          accept="image/*,video/*"
        />

        {/* Header */}
        <div className="flex items-center justify-between pb-12 border-b border-white/40">
          <div>
            <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter uppercase leading-[0.8]">
              MEDIA<br /><span className="text-reveal">NEXUS</span>
            </h1>
            <p className="text-[10px] text-foreground/40 mt-6 font-black uppercase tracking-[0.6em]">
              {loading ? 'CALCUL EN COURS...' : `${media.length} ALPHA UNITS · ${MOCK_FOLDERS.reduce((a, f) => a + f.count, 0)} SECTEURS SYNC`}
            </p>
          </div>
          <Button
            size="lg"
            className="font-black uppercase tracking-[0.3em] rounded-[2rem] px-12 py-10 text-xs hidden sm:flex bg-primary text-white hover:scale-110 active:scale-95 transition-all duration-700 shadow-2xl border-none"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mr-3" />
            ) : (
              <Upload className="mr-3 w-6 h-6 animate-crystal" />
            )}
            {uploading ? 'UPLOADING...' : 'IMPORT ALPHA'}
          </Button>
        </div>

        <div className="flex gap-10">
          {/* Sidebar — Folders */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Dossiers</h3>
                <button className="text-primary hover:text-primary/80">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setSelectedFolder(null)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border w-full text-left transition-all duration-200
                  ${!selectedFolder ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-card hover:border-primary/30 text-foreground hover:bg-muted/40'}`}
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="text-sm font-semibold">Tous les médias</span>
                <span className="ml-auto text-xs text-muted-foreground">{media.length}</span>
              </button>

              <div className="space-y-1.5">
                {MOCK_FOLDERS.map((folder) => (
                  <FolderCard
                    key={folder.id}
                    folder={folder}
                    active={selectedFolder === folder.id}
                    onClick={() => setSelectedFolder(selectedFolder === folder.id ? null : folder.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center gap-6 mb-10 overflow-x-auto pb-4 no-scrollbar">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                <Input
                  placeholder="FILTRER LE NEXUS..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-14 h-14 rounded-2xl glass-master border-white/50 font-black uppercase tracking-widest text-[10px] focus:bg-white/10 transition-all duration-500"
                />
              </div>

              <Button size="lg" variant="outline" className="rounded-[1.5rem] px-8 h-14 glass-master border-white/50 font-black uppercase tracking-widest text-[9px] gap-3 hover:scale-105 transition-all">
                <Filter className="w-4 h-4 text-primary" />
                SECTEURS
              </Button>

              <div className="flex items-center glass-master border-white/40 rounded-2xl p-1.5 ml-auto">
                <button
                  onClick={() => setView('grid')}
                  className={`p-3 rounded-xl transition-all duration-500 ${view === 'grid' ? 'bg-primary text-white shadow-xl scale-110' : 'text-foreground/40 hover:text-foreground'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-3 rounded-xl transition-all duration-500 ${view === 'list' ? 'bg-primary text-white shadow-xl scale-110' : 'text-foreground/40 hover:text-foreground'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Selection bar */}
            {selected.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-xl px-4 py-2.5 mb-4"
              >
                <span className="text-sm font-semibold text-primary">{selected.size} sélectionné(s)</span>
                <div className="flex items-center gap-2 ml-auto">
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive rounded-xl h-8" onClick={() => {
                    if (confirm(`Voulez-vous supprimer ces ${selected.size} fichiers ?`)) {
                      selected.forEach(id => handleDelete(id));
                    }
                  }}>
                    <Trash2 className="mr-1.5 w-3.5 h-3.5" />
                    Supprimer
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-xl h-8" onClick={clearSelection}>
                    <X className="mr-1.5 w-3.5 h-3.5" />
                    Désélectionner
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Drop zone (visual) */}
            <div
              className={`border-[3px] border-dashed rounded-[3.5rem] p-16 mb-12 text-center transition-all duration-700 cursor-pointer glass-master ${
                dragOver 
                  ? 'border-primary bg-primary/5 shadow-[0_0_50px_rgba(79,70,229,0.2)] scale-[1.01]' 
                  : 'border-white/30 bg-white/5 hover:bg-white/10 hover:border-primary/40'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 rounded-[1.5rem] glass-master flex items-center justify-center mx-auto mb-8 border border-white/50 shadow-inner group-hover:animate-float">
                <Upload className="w-10 h-10 text-primary animate-crystal" />
              </div>
              <p className="text-2xl font-black text-foreground uppercase tracking-tighter">TRANSFÉRER VERS LE NEXUS</p>
              <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.4em] mt-4 max-w-sm mx-auto leading-relaxed">
                VOS UNITÉS ALPHA SERONT IMMÉDIATEMENT SYNCHRONISÉES.
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <span className="px-4 py-2 rounded-full glass-master border-white/40 text-[8px] font-black uppercase tracking-widest text-foreground/30">JPG / PNG</span>
                <span className="px-4 py-2 rounded-full glass-master border-white/40 text-[8px] font-black uppercase tracking-widest text-foreground/30">MP4 / WEBP</span>
                <span className="px-4 py-2 rounded-full glass-master border-white/40 text-[8px] font-black uppercase tracking-widest text-foreground/30">MAX 100 MB</span>
              </div>
            </div>

            {/* Media Grid/List */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                 <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                 <p className="text-sm text-muted-foreground">Chargement de vos médias...</p>
              </div>
            ) : filteredMedia.length === 0 ? (
              <EmptyState
                icon={Image}
                title="Aucun média trouvé"
                description="Importez vos premières images ou vidéos pour commencer."
              />
            ) : view === 'grid' ? (
              <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 gap-5">
                <AnimatePresence mode="popLayout">
                  {filteredMedia.map((file) => (
                    <MediaGridCard
                      key={file.id}
                      file={file}
                      selected={selected.has(file.id)}
                      onSelect={toggleSelect}
                      onDelete={handleDelete}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div>
                {/* List headers */}
                <div className="flex items-center gap-4 px-5 py-2 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <div className="w-12" />
                  <div className="w-4" />
                  <div className="flex-1">Nom</div>
                  <div className="hidden sm:block w-20">Taille</div>
                  <div className="hidden md:block w-24">Date</div>
                  <div className="w-16">Actions</div>
                </div>
                <AnimatePresence mode="popLayout">
                  {filteredMedia.map((file) => (
                    <MediaListRow
                      key={file.id}
                      file={file}
                      selected={selected.has(file.id)}
                      onSelect={toggleSelect}
                      onDelete={handleDelete}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
