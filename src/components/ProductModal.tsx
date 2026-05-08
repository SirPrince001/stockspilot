import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Package, Tag, Hash, DollarSign, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (product: any) => void;
}

export default function ProductModal({ isOpen, onClose, onSuccess }: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    category: '',
    unit: 'pcs'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/product/create-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        setTimeout(() => {
          onSuccess(data);
          onClose();
          setSuccess(false);
          setFormData({ name: '', description: '', price: '', sku: '', category: '', unit: 'pcs' });
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating product:', error);
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
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Product Created!</h3>
              <p className="text-outline">The item has been added to your catalog.</p>
            </div>
          ) : (
            <>
              <div className="px-8 py-6 border-b border-surface-container flex justify-between items-center bg-surface-container-low/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Add New Product</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Product Name</label>
                    <div className="relative">
                      <input 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Nevia"
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium"
                      />
                      <Package className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Price (₦)</label>
                    <div className="relative">
                      <input 
                        required
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="7500"
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium"
                      />
                      <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">SKU code</label>
                    <div className="relative">
                      <input 
                        required
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="NV-101"
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium"
                      />
                      <Hash className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Category</label>
                    <div className="relative">
                      <input 
                        required
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="Body Lotion"
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium"
                      />
                      <Tag className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Measurement Unit</label>
                    <div className="relative">
                      <select 
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium appearance-none"
                      >
                        <option value="pcs">Pieces (pcs)</option>
                        <option value="kg">Kilograms (kg)</option>
                        <option value="g">Grams (g)</option>
                        <option value="l">Liters (l)</option>
                        <option value="ml">Milliliters (ml)</option>
                        <option value="box">Box</option>
                        <option value="set">Set</option>
                      </select>
                      <Package className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Description</label>
                    <div className="relative">
                      <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Brief item details..."
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium resize-none"
                      />
                      <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
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
                      'Save Product'
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
