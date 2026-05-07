import React from 'react';
import { motion } from 'motion/react';
import { PlusCircle, Search, Filter, ArrowUpRight, CheckCircle2, Clock, XCircle, FileText, Download, MoreVertical, CreditCard, ShoppingBag } from 'lucide-react';
import { RECENT_TRANSACTIONS } from '../constants';
import { cn } from '../lib/utils';

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

export default function SalesOrders() {
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
          <h2 className="text-3xl font-bold text-on-surface tracking-tight">Sales Orders</h2>
          <p className="text-on-surface-variant text-sm mt-1 font-medium">Track transactions, manage quote lifecycle, and process customer payments.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-surface-container-low transition-all">
            <Download className="w-4 h-4" />
            Download Summary
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all">
            <PlusCircle className="w-4 h-4" />
            New Service Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Invoices', value: '$1.4M', icon: CreditCard, color: 'text-primary' },
          { label: 'Completed Today', value: '42', icon: CheckCircle2, color: 'text-secondary' },
          { label: 'Pending Quotes', value: '18', icon: Clock, color: 'text-tertiary' },
          { label: 'Cancelled (Monthly)', value: '4', icon: XCircle, color: 'text-error' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container-high flex items-center justify-between">
            <div>
              <p className="text-outline text-[11px] font-bold uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-bold text-on-surface mt-1">{stat.value}</h4>
            </div>
            <div className={cn("w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high">
        <div className="p-6 border-b border-surface-container-high flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input 
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white text-sm outline-none transition-all font-medium"
                placeholder="Search orders, branch or customer..."
                type="text"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low rounded-xl font-bold text-xs text-outline hover:text-on-surface transition-all">
              <Filter className="w-4 h-4" />
              Advanced
            </button>
          </div>
          <div className="flex gap-2">
            {[ 'All Orders', 'Pending', 'In Service', 'Completed' ].map((tab) => (
              <button 
                key={tab}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  tab === 'All Orders' 
                    ? "bg-primary text-white shadow-md shadow-primary/10" 
                    : "text-outline hover:bg-surface-container-low hover:text-on-surface"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50 text-[10px] font-bold text-outline uppercase tracking-[0.1em]">
                <th className="px-8 py-5">Order Reference</th>
                <th className="px-8 py-5">Customer Entity</th>
                <th className="px-8 py-5">Origin Branch</th>
                <th className="px-8 py-5">Transaction Sum</th>
                <th className="px-8 py-5">Current State</th>
                <th className="px-8 py-5 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {RECENT_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-container-low/30 transition-colors group cursor-pointer">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-extrabold text-sm text-primary tracking-tight leading-none">#{tx.id.split('-')[1]}</span>
                      <span className="text-[10px] text-outline font-bold mt-1 uppercase tracking-tighter">{tx.id}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-[10px] font-bold text-outline border border-surface-container">
                        {tx.customer.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-on-surface">{tx.customer}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5 shadow-sm px-2 py-1 bg-surface-container/50 rounded inline-flex">
                       {tx.branch}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-extrabold text-base text-on-surface tracking-tight">{tx.amount}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest leading-none bg-opacity-10",
                      tx.status === 'Completed' ? "bg-secondary text-secondary" : 
                      tx.status === 'Processing' ? "bg-tertiary text-tertiary" : 
                      "bg-error text-error"
                    )}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <button className="p-2.5 rounded-xl bg-surface-container-high text-outline hover:bg-on-background hover:text-white transition-all shadow-sm">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 border-t border-surface-container-high bg-surface-bright flex items-center justify-between rounded-b-2xl">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <span className="text-[10px] font-extrabold text-outline uppercase tracking-wider">64 Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
              <span className="text-[10px] font-extrabold text-outline uppercase tracking-wider">12 In Transit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
              <span className="text-[10px] font-extrabold text-outline uppercase tracking-wider">3 Flags</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="text-outline hover:text-on-surface p-2 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
            <div className="flex bg-surface-container-low p-1 rounded-xl">
              <button className="px-3 py-1.5 text-[10px] font-bold text-on-surface-variant hover:bg-white rounded-lg transition-all shadow-sm">Prev</button>
              <button className="px-3 py-1.5 text-[10px] font-bold bg-white text-primary rounded-lg transition-all shadow-md">Next</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary shadow-2xl p-8 rounded-3xl relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-white">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight">Real-time Order Monitor</h3>
              <p className="text-white/70 text-sm font-medium mt-1">Live tracking active for 14 regional hubs.</p>
            </div>
          </div>
          <button className="px-10 py-4 bg-white text-primary rounded-2xl font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">
            Launch Monitor
          </button>
        </div>
        <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700"></div>
        <div className="absolute left-[-20px] bottom-[-20px] w-64 h-64 bg-tertiary/20 rounded-full blur-3xl group-hover:bg-tertiary/30 transition-colors duration-700"></div>
      </div>
    </motion.div>
  );
}
