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
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 text-left w-full
        ${active ? 'border-primary bg-primary/10 shadow-sm' : 'border-border/50 bg-card/40 hover:border-primary/30 hover:bg-muted/40'}`}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${folder.color}20` }}>
        <FolderOpen className="w-4 h-4" style={{ color: folder.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{folder.name}</p>
        <p className="text-xs text-muted-foreground">{folder.count} fichiers</p>
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
      transition={{ duration: 0.2 }}
      className={`group relative aspect-square rounded-2xl overflow-hidden border cursor-pointer transition-all duration-200
        ${selected ? 'ring-2 ring-primary border-primary' : 'border-border hover:border-primary/40'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(file.id)}
    >
      <img
        src={file.url}
        alt={file.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
          >
            <button className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors" onClick={(e) => { e.stopPropagation(); window.open(file.url, '_blank'); }}>
              <Eye className="w-4 h-4 text-foreground" />
            </button>
            <button className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors" onClick={(e) => { e.stopPropagation(); onDelete(file.id); }}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selection */}
      {selected && (
        <div className="absolute top-2 left-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
          <X className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Type badge */}
      <div className="absolute top-2 right-2">
        {file.type === 'video' ? (
          <span className="bg-black/70 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <Video className="w-3 h-3" /> Vidéo
          </span>
        ) : null}
      </div>

      {/* Name tooltip */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white text-xs font-medium truncate">{file.name}</p>
        <p className="text-white/60 text-xs">{formatFileSize(file.size)}</p>
      </div>
    </motion.div>
  );
}

// ─── Media List Row ───────────────────────────────────────────
function MediaListRow({ file, selected, onSelect, onDelete }: { file: MediaFile; selected: boolean; onSelect: (id: string) => void; onDelete: (id: string) => void }) {
  return (
    <div
      className={`flex items-center gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors cursor-pointer rounded-xl border mb-1
        ${selected ? 'bg-primary/5 border-primary/20' : 'border-transparent'}`}
      onClick={() => onSelect(file.id)}
    >
      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-border">
        <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {file.type === 'image' ? (
          <Image className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Video className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground">{file.width}×{file.height}px</p>
      </div>
      <div className="hidden sm:block text-sm text-muted-foreground">{formatFileSize(file.size)}</div>
      <div className="hidden md:block text-sm text-muted-foreground">
        {new Date(file.createdAt).toLocaleDateString('fr-FR')}
      </div>
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" onClick={(e) => { e.stopPropagation(); window.open(file.url, '_blank'); }}>
          <Eye className="w-4 h-4 text-muted-foreground" />
        </button>
        <button 
          className="p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
          onClick={(e) => { e.stopPropagation(); onDelete(file.id); }}
        >
          <Trash2 className="w-4 h-4 text-muted-foreground" />
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Bibliothèque Média 📁
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {loading ? 'Chargement...' : `${media.length} fichiers · ${MOCK_FOLDERS.reduce((a, f) => a + f.count, 0)} dans les dossiers`}
            </p>
          </div>
          <Button
            className="font-semibold rounded-xl"
            style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #14B8A6 100%)' }}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Upload className="mr-2 w-4 h-4" />
            )}
            {uploading ? 'Upload...' : 'Importer'}
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
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un fichier..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 rounded-xl h-9"
                />
              </div>

              <Button variant="outline" size="sm" className="rounded-xl gap-2">
                <Filter className="w-3.5 h-3.5" />
                Filtrer
              </Button>

              <div className="flex items-center bg-muted rounded-xl p-1 ml-auto">
                <button
                  onClick={() => setView('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${view === 'grid' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-1.5 rounded-lg transition-colors ${view === 'list' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
                >
                  <List className="w-4 h-4" />
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
              className={`border-2 border-dashed rounded-3xl p-10 mb-8 text-center transition-all duration-300 cursor-pointer ${
                dragOver 
                  ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(79,70,229,0.1)]' 
                  : 'border-border/60 bg-muted/20 hover:bg-muted/30 hover:border-primary/30'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <p className="text-base font-bold text-foreground">Glissez-déposez vos fichiers ici</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                Vos médias seront instantanément disponibles pour vos créations.
              </p>
              <p className="text-[10px] text-muted-foreground/60 mt-4 uppercase tracking-widest font-bold">JPG, PNG, MP4, WebP — Max 100 MB</p>
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
