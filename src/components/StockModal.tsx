import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Package, Warehouse, Loader2, CheckCircle2, TrendingUp, AlertCircle, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (stock: any) => void;
  product: any;
}

export default function StockModal({ isOpen, onClose, onSuccess, product }: StockModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [branches, setBranches] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    branchId: '',
    threshold: '5',
    description: ''
  });

  useEffect(() => {
    if (isOpen) {
      fetchBranches();
      if (product) {
        setFormData(prev => ({ ...prev, productId: product.id }));
      }
    }
  }, [isOpen, product]);

  const fetchBranches = async () => {
    try {
      const response = await fetch('/api/branch/all');
      if (response.ok) {
        const data = await response.json();
        setBranches(data);
        if (data.length > 0 && !formData.branchId) {
          setFormData(prev => ({ ...prev, branchId: data[0].id }));
        }
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/stock/add-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          quantity: parseFloat(formData.quantity),
          threshold: parseFloat(formData.threshold)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        setTimeout(() => {
          onSuccess(data);
          onClose();
          setSuccess(false);
          setFormData({ productId: product?.id || '', quantity: '', branchId: branches[0]?.id || '', threshold: '5', description: '' });
        }, 1500);
      }
    } catch (error) {
      console.error('Error adding stock:', error);
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
                <TrendingUp className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Stock Updated!</h3>
              <p className="text-outline">Inventory levels have been adjusted.</p>
            </div>
          ) : (
            <>
              <div className="px-8 py-6 border-b border-surface-container flex justify-between items-center bg-surface-container-low/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Add Inventory Stock</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="p-4 bg-primary/5 rounded-2xl flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    {product?.img ? (
                      <img src={product.img} alt="" className="w-8 h-8 object-contain" />
                    ) : (
                      <Package className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{product?.name || 'Select Product'}</h4>
                    <p className="text-[10px] text-outline font-medium tracking-wider uppercase">{product?.sku || 'SKU REQUIRED'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Quantity to Add</label>
                    <div className="relative">
                      <input 
                        required
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="e.g. 50"
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-secondary focus:bg-white transition-all outline-none text-sm font-medium"
                      />
                      <TrendingUp className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Low Stock Alert</label>
                    <div className="relative">
                      <input 
                        required
                        type="number"
                        name="threshold"
                        value={formData.threshold}
                        onChange={handleInputChange}
                        placeholder="Min level"
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-secondary focus:bg-white transition-all outline-none text-sm font-medium"
                      />
                      <AlertCircle className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Destination Branch</label>
                    <div className="relative">
                      <select 
                        required
                        name="branchId"
                        value={formData.branchId}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-secondary focus:bg-white transition-all outline-none text-sm font-medium appearance-none"
                      >
                        {branches.map(branch => (
                          <option key={branch.id} value={branch.id}>{branch.name} ({branch.location})</option>
                        ))}
                      </select>
                      <Warehouse className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Transaction Note</label>
                    <div className="relative">
                      <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="New stock received from supplier"
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-secondary focus:bg-white transition-all outline-none text-sm font-medium resize-none"
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
                    disabled={loading || !formData.branchId}
                    className="flex-[2] py-3.5 px-6 bg-secondary text-on-secondary rounded-2xl font-bold text-sm shadow-lg shadow-secondary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Update Levels'
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
