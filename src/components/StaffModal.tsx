import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Shield, Warehouse, Loader2, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (staff: any) => void;
}

export default function StaffModal({ isOpen, onClose, onSuccess }: StaffModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    roleId: '',
    branchIds: [] as string[]
  });

  useEffect(() => {
    if (isOpen) {
      fetchRoles();
      fetchBranches();
    }
  }, [isOpen]);

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/rbac/roles');
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
        if (data.length > 0 && !formData.roleId) {
          setFormData(prev => ({ ...prev, roleId: data[0].id }));
        }
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await fetch('/api/branch/all');
      if (response.ok) {
        const data = await response.json();
        setBranches(data);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleBranch = (branchId: string) => {
    setFormData(prev => ({
      ...prev,
      branchIds: prev.branchIds.includes(branchId)
        ? prev.branchIds.filter(id => id !== branchId)
        : [...prev.branchIds, branchId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/user/register', {
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
          setFormData({ fullName: '', email: '', password: '', roleId: roles[0]?.id || '', branchIds: [] });
        }, 1500);
      }
    } catch (error) {
      console.error('Error registering staff:', error);
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
          className="relative w-full max-w-xl bg-surface-bright rounded-3xl shadow-2xl overflow-hidden"
        >
          {success ? (
            <div className="p-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Staff Invited!</h3>
              <p className="text-outline">An invitation has been sent to their email.</p>
            </div>
          ) : (
            <>
              <div className="px-8 py-6 border-b border-surface-container flex justify-between items-center bg-surface-container-low/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Invite New Staff Member</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                    <div className="relative">
                      <input 
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Manager"
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium"
                      />
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                    <div className="relative">
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="manager@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium"
                      />
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Temporary Password</label>
                    <div className="relative">
                      <input 
                        required
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium"
                      />
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-1.5 ml-1">Access Role</label>
                    <div className="relative">
                      <select 
                        required
                        name="roleId"
                        value={formData.roleId}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium appearance-none"
                      >
                        {roles.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                      <Shield className="absolute left-3.5 top-3.5 w-4 h-4 text-outline opacity-50" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-3 ml-1">Assigned Branches (Select one or more)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {branches.length === 0 ? (
                      <p className="col-span-2 text-xs text-outline italic p-4 bg-surface-container-low rounded-xl border border-dashed border-outline-variant text-center">
                        No branches available. Please create a branch first.
                      </p>
                    ) : (
                      branches.map(branch => (
                        <div 
                          key={branch.id}
                          onClick={() => toggleBranch(branch.id)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer",
                            formData.branchIds.includes(branch.id)
                              ? "bg-primary/5 border-primary shadow-sm"
                              : "bg-surface-container-low border-transparent hover:border-outline-variant"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                            formData.branchIds.includes(branch.id) ? "bg-primary text-white" : "bg-surface-container-high text-outline"
                          )}>
                            <Warehouse className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold truncate">{branch.name}</p>
                            <p className="text-[10px] text-outline truncate">{branch.location}</p>
                          </div>
                        </div>
                      ))
                    )}
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
                    disabled={loading || (branches.length > 0 && formData.branchIds.length === 0)}
                    className="flex-[2] py-3.5 px-6 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Invite Staff Member'
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
