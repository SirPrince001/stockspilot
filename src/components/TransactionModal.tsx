import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Download, Printer, X, CreditCard, Calendar, User, ShoppingBag } from 'lucide-react';
import { cn } from '../lib/utils';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData?: {
    id: string;
    amount: string;
    customer: string;
    branch: string;
    items: number;
    date: string;
  };
}

export default function TransactionModal({ isOpen, onClose, transactionData }: TransactionModalProps) {
  if (!isOpen) return null;

  const data = transactionData || {
    id: "TX-99201-B",
    amount: "$1,842.00",
    customer: "Global Logistics Ltd.",
    branch: "North-East Hub",
    items: 4,
    date: "May 24, 2024 • 14:22"
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-surface-bright rounded-[32px] shadow-[0px_32px_64px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="bg-primary p-8 text-white text-center rounded-b-[40px] relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 12 }}
              className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-white/5"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            
            <h3 className="text-3xl font-extrabold tracking-tight mb-2">Sale Successful</h3>
            <p className="text-white/70 font-bold text-sm uppercase tracking-widest">Transaction Recorded</p>
          </div>

          <div className="flex-1 overflow-y-auto p-8 pt-10">
            <div className="flex flex-col items-center mb-10">
              <span className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-2">Total Amount</span>
              <h4 className="text-5xl font-black text-on-surface tracking-tighter leading-none">{data.amount}</h4>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container">
                  <p className="text-[10px] font-extrabold text-outline uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <User className="w-3 h-3" /> Customer
                  </p>
                  <p className="text-sm font-bold text-on-surface truncate">{data.customer}</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container">
                  <p className="text-[10px] font-extrabold text-outline uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" /> Date & Time
                  </p>
                  <p className="text-sm font-bold text-on-surface">{data.date}</p>
                </div>
              </div>

              <div className="bg-surface-container-low p-5 rounded-2xl border border-surface-container space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-outline font-bold flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" /> Transaction ID
                  </span>
                  <span className="font-extrabold text-primary px-3 py-1 bg-primary/10 rounded-lg">{data.id}</span>
                </div>
                <div className="h-px bg-surface-container flex-shrink-0" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-outline font-bold flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Entry Point
                  </span>
                  <span className="font-bold text-on-surface-variant">{data.branch}</span>
                </div>
                <div className="h-px bg-surface-container flex-shrink-0" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-outline font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Total Items
                  </span>
                  <span className="font-bold text-on-surface-variant font-mono">{data.items} SKUs</span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button className="flex-1 py-4 bg-surface-container-high hover:bg-surface-container-highest rounded-2xl font-extrabold text-sm text-on-surface-variant transition-all flex items-center justify-center gap-2 active:scale-95">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button className="flex-1 py-4 bg-on-background hover:bg-black rounded-2xl font-extrabold text-sm text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-black/10">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>
          
          <div className="p-6 bg-surface-container-low/50 border-t border-surface-container">
            <button 
              onClick={onClose}
              className="w-full py-4 text-primary font-black text-sm uppercase tracking-[0.2em] hover:bg-primary/5 rounded-2xl transition-colors"
            >
              Return to Catalog
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
