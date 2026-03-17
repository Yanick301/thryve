import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Activity, ShieldCheck, Play, Pause, 
  Settings, RefreshCw, AlertTriangle, CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { automationService } from '@/services/automation';
import { toast } from '@/hooks/use-toast';

export function AutomationControl() {
  const [status, setStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [isAutoActive, setIsAutoActive] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    setStatus('checking');
    const isOnline = await automationService.checkHealth();
    setStatus(isOnline ? 'online' : 'offline');
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleWarmup = async () => {
    if (status !== 'online') return;
    setLoading(true);
    setLastAction("Warmup en cours...");
    
    // In Alpha mode, we use the first connected account for warmup
    const res = await automationService.browse({
      platform: 'instagram',
      username: 'alpha_operator', // Fallback for demo
    });

    setLoading(false);
    if (res.success) {
      setLastAction("Warmup complété avec succès");
      toast({
        title: "Simulation Humaine Terminée",
        description: "Le bot a fini de parcourir le flux.",
      });
    } else {
      setLastAction("Échec du warmup");
      toast({
        variant: "destructive",
        title: "Erreur Automation",
        description: res.error || "Impossible de démarrer le warmup.",
      });
    }
  };

  return (
    <div className="glass-master rounded-[3rem] p-8 border-white/40 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/40 shadow-xl transition-all duration-700 ${status === 'online' ? 'bg-emerald-500/10 animate-pulse' : 'bg-rose-500/10'}`}>
            <Zap className={`w-6 h-6 ${status === 'online' ? 'text-emerald-500' : 'text-rose-500'}`} />
          </div>
          <div>
            <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">CORE ENGINE</h3>
            <div className="flex items-center gap-2">
              <span className={`text-[8px] font-black uppercase tracking-widest ${status === 'online' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {status === 'online' ? 'SIGNAL ACTIF' : 'MOTEUR HORS-LIGNE'}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={checkStatus}
          className="p-3 rounded-xl glass-master border-white/20 hover:bg-white/10 transition-all hover:rotate-180 duration-1000"
        >
          <RefreshCw className="w-4 h-4 text-foreground/40" />
        </button>
      </div>

      {/* Main Controls */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Button
          variant="outline"
          className="rounded-2xl py-8 glass-master border-white/30 text-[9px] font-black uppercase tracking-widest hover:border-primary/50 transition-all group/btn"
          onClick={() => setIsAutoActive(!isAutoActive)}
        >
          {isAutoActive ? <Pause className="mr-2 w-4 h-4 text-rose-500" /> : <Play className="mr-2 w-4 h-4 text-emerald-500" />}
          {isAutoActive ? 'STOP PILOTE' : 'START PILOTE'}
        </Button>
        <Button
          variant="outline"
          className="rounded-2xl py-8 glass-master border-white/30 text-[9px] font-black uppercase tracking-widest hover:border-accent/50 transition-all"
          onClick={handleWarmup}
          disabled={loading || status !== 'online'}
        >
          <Activity className="mr-2 w-4 h-4 text-accent" />
          WARMUP ALPHA
        </Button>
      </div>

      {/* Safety Status */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-[9px] font-black text-foreground/60 uppercase tracking-widest">SÉCURITÉ NEXUS</span>
          </div>
          <span className="text-[8px] font-black text-primary uppercase">MÉTHODE STEALTH: ON</span>
        </div>
        
        <div className="space-y-2">
            <div className="flex justify-between text-[8px] font-black uppercase tracking-widest opacity-40">
                <span>VIGILANCE ALGORITHME</span>
                <span>BASSE</span>
            </div>
            <div className="h-1.5 bg-black/10 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "20%" }}
                    className="h-full bg-primary rounded-full"
                />
            </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-[8px] font-black text-foreground/20 uppercase tracking-[0.4em] mb-4">LOGS RÉCENTS</p>
        <div className="space-y-2">
            <AnimatePresence mode="popLayout">
                {lastAction && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 py-2"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[9px] font-black text-foreground/40 uppercase tracking-widest">{lastAction}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex items-center gap-2 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/40" />
                <span className="text-[9px] font-black text-foreground/20 uppercase tracking-widest truncate">SYSTÈME PRÊT POUR DIFFUSION...</span>
            </div>
        </div>
      </div>
    </div>
  );
}
