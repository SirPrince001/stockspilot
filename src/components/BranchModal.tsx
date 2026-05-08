import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, User, Loader2, CheckCircle2, Warehouse } from 'lucide-react';

interface BranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (branch: any) => void;
  initialCompanyId?: string;
  entities: any[];
}

export default function BranchModal({ isOpen, onClose, onSuccess, initialCompanyId, entities }: BranchModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    companyId: initialCompanyId || '',
  });

  // Sync with initialCompanyId if it changes (e.g. user selects a different company in the background)
  React.useEffect(() => {
    if (initialCompanyId && !formData.companyId) {
      setFormData(prev => ({ ...prev, companyId: initialCompanyId }));
    }
  }, [initialCompanyId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyId) return;
    setLoading(true);

    try {
      const response = await fetch('/api/branch/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        setTimeout(() => {
          onSuccess(data);
          onClose();
          setSuccess(false);
          setFormData({ name: '', address: '', companyId: initialCompanyId || '' });
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating branch:', error);
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
            className="relative w-full max-w-lg bg-surface-bright rounded-3xl shadow-2xl overflow-hidden"
          >
            {success ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-2">Branch Added!</h3>
                <p className="text-outline">The new location has been registered.</p>
              </div>
            ) : (
              <>
                <div className="px-8 py-6 border-b border-surface-container flex justify-between items-center bg-surface-container-low/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                      <Warehouse className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold">Add New Branch</h3>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Parent Entity / Company</label>
                      <select 
                        required
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-secondary focus:bg-white transition-all outline-none text-sm font-medium appearance-none"
                      >
                        <option value="">Select a company...</option>
                        {entities.map(company => (
                          <option key={company.id} value={company.id}>{company.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Branch Name</label>
                      <input 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Umuahia Branch"
                        className="w-full px-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-secondary focus:bg-white transition-all outline-none text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Physical Address</label>
                      <div className="relative">
                        <input 
                          required
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="No. 20 Aba Road, Umuahia..."
                          className="w-full pl-4 pr-10 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-secondary focus:bg-white transition-all outline-none text-sm font-medium"
                        />
                        <MapPin className="absolute top-3.5 right-4 w-4 h-4 text-outline opacity-50" />
                      </div>
                    </div>
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
                      disabled={loading}
                      className="flex-[2] py-3.5 px-6 bg-secondary text-on-secondary rounded-2xl font-bold text-sm shadow-lg shadow-secondary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Create Branch'
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
