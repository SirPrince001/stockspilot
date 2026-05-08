import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Loader2, CheckCircle2 } from 'lucide-react';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: any) => void;
}

export default function RoleModal({ isOpen, onClose, onSuccess }: RoleModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/rbac/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        setTimeout(() => {
          onSuccess(data);
          onClose();
          setSuccess(false);
          setName('');
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating role:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-surface-bright rounded-3xl shadow-2xl overflow-hidden"
          >
            {success ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-2">Role Created!</h3>
                <p className="text-outline">The new access role is now available.</p>
              </div>
            ) : (
              <>
                <div className="px-8 py-6 border-b border-surface-container flex justify-between items-center bg-surface-container-low/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold">Create Access Role</h3>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div>
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Role Name</label>
                    <div className="relative">
                      <input 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Inventory Manager"
                        className="w-full px-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium"
                      />
                    </div>
                    <p className="mt-2 text-[10px] text-outline italic">This name will be visible in the staff invitation form.</p>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm text-outline hover:bg-surface-container-low transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={loading || !name.trim()}
                      className="flex-[2] py-3.5 px-6 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Save Role'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
