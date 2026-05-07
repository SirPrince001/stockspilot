import React from 'react';
import { motion } from 'motion/react';
import { UserPlus, Search, Mail, Phone, MoreHorizontal, UserCheck, Shield, MapPin, Filter } from 'lucide-react';
import { ACTIVE_USERS } from '../constants';
import { cn } from '../lib/utils';

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export default function UserManagement() {
  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface tracking-tight">Staffing & User Management</h2>
          <p className="text-on-surface-variant text-sm mt-1 font-medium">Coordinate personnel across all regional branches and assigned departments.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl font-bold text-xs hover:bg-surface-container-low transition-all shadow-sm">
            <Shield className="w-4 h-4 text-primary" />
            Audit Logs
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary-container transition-all shadow-lg active:scale-95">
            <UserPlus className="w-4 h-4" />
            Invite New Staff
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5 font-bold" />
          <input 
            className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-sm font-medium outline-none transition-all"
            placeholder="Filter staff by name, email, or branch ID..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select className="flex-1 md:w-48 bg-surface-container-low border-none rounded-2xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer">
            <option>All Branch Scopes</option>
            <option>HQ - Executive</option>
            <option>Warehouse A2</option>
          </select>
          <button className="p-3 bg-surface-container-low hover:bg-surface-container-high rounded-2xl text-on-surface-variant transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ACTIVE_USERS.map((user) => (
          <motion.div 
            key={user.id} 
            layoutId={user.id}
            className="bg-surface-container-lowest p-6 rounded-[28px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] border border-surface-container-high flex flex-col hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden animate-in fade-in duration-500">
                  <img src={user.img} alt={user.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                  user.status === 'Active' ? "bg-secondary" : "bg-error"
                )} />
              </div>
              <button className="p-2 text-outline-variant hover:bg-surface-container-low rounded-xl transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-black text-on-surface tracking-tight group-hover:text-primary transition-colors">{user.name}</h4>
              <p className="text-[11px] font-bold text-outline-variant uppercase tracking-widest mt-0.5">{user.role}</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Mail className="w-4 h-4 text-outline" />
                <span className="text-xs font-semibold">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Phone className="w-4 h-4 text-outline" />
                <span className="text-xs font-semibold">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <MapPin className="w-4 h-4 text-outline" />
                <span className="text-xs font-semibold">{user.branch}</span>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-surface-container-high flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-on-surface uppercase tracking-widest">Full Access</span>
              </div>
              <button className="px-4 py-1.5 bg-surface-container-low hover:bg-on-surface hover:text-white rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all">
                Manage Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-surface-container-lowest p-8 rounded-[32px] border border-surface-container-high shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 border-l-[12px] border-secondary">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-2xl flex items-center justify-center">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-on-surface">Compliance Verified</h4>
            <p className="text-sm text-on-surface-variant font-medium max-w-sm">92% of staff have completed their annual security and compliance training.</p>
          </div>
        </div>
        <button className="w-full md:w-auto px-8 py-3 bg-secondary text-white font-bold text-sm rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-95 whitespace-nowrap">
          View Compliance Report
        </button>
      </div>
    </motion.div>
  );
}
