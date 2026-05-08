import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Building2, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (company: any) => void;
}

export default function CompanyModal({ isOpen, onClose, onSuccess }: CompanyModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    logo: ''
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFormData(prev => ({ ...prev, logo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/company/company', {
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
          setFormData({ name: '', address: '', logo: '' });
          setLogoPreview(null);
        }, 1500);
      } else {
        console.error('Failed to create company');
      }
    } catch (error) {
      console.error('Error creating company:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
              <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Company Created!</h3>
              <p className="text-outline">The entity has been registered successfully.</p>
            </div>
          ) : (
            <>
              <div className="px-8 py-6 border-b border-surface-container flex justify-between items-center bg-surface-container-low/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Register New Company</h3>
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
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Company logo</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative h-32 border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all overflow-hidden"
                    >
                      {logoPreview ? (
                        <img src={logoPreview} alt="Preview" className="w-full h-full object-contain p-4" />
                      ) : (
                        <>
                          <div className="p-3 bg-surface-container-low rounded-full mb-2 group-hover:scale-110 transition-transform">
                            <Upload className="w-5 h-5 text-outline" />
                          </div>
                          <p className="text-xs font-bold text-outline">Drag and drop or click to upload</p>
                        </>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Company Name</label>
                      <input 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. StockPilot Global Ltd"
                        className="w-full px-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Headquarters Address</label>
                      <div className="relative">
                        <textarea 
                          required
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Full street address, city, and zip code"
                          className="w-full pl-4 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium resize-none"
                        />
                        <MapPin className="absolute top-3 right-4 w-4 h-4 text-outline opacity-50" />
                      </div>
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
                    className="flex-[2] py-3.5 px-6 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Register Company'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
