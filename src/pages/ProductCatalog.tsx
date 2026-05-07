import React from 'react';
import { motion } from 'motion/react';
import { Package, AlertTriangle, CreditCard, Truck, Upload, Plus, Search, Filter, LayoutGrid, List, Edit3, Trash2 } from 'lucide-react';
import StatCard from '../components/StatCard';
import { CATALOG_PRODUCTS } from '../constants';
import { cn } from '../lib/utils';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 }
};

export default function ProductCatalog() {
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
          <h2 className="text-3xl font-bold text-on-surface tracking-tight">Product Catalog</h2>
          <p className="text-on-surface-variant text-sm mt-1 font-medium">Manage global product entities and stock levels across 12 branches.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-outline-variant rounded-xl font-bold text-xs text-on-surface hover:bg-surface-container-low transition-all active:scale-95 shadow-sm">
            <Upload className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/10">
            <Plus className="w-4 h-4" />
            New Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total SKU Count"
          value="12,482"
          trend="+2.4%"
          trendType="up"
          icon={Package}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard 
          title="Low Stock Alerts"
          value="42"
          trend="High Priority"
          trendType="down"
          icon={AlertTriangle}
          iconBg="bg-error/10"
          iconColor="text-error"
        />
        <StatCard 
          title="Inventory Value"
          value="$2.4M"
          trend="Monthly"
          trendType="neutral"
          icon={CreditCard}
          iconBg="bg-tertiary/10"
          iconColor="text-tertiary"
        />
        <StatCard 
          title="Pending Shipments"
          value="158"
          trend="In Transit"
          trendType="up"
          icon={Truck}
          iconBg="bg-secondary/10"
          iconColor="text-secondary"
        />
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-surface-container-high flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3 px-4 py-2 bg-surface-container-low rounded-xl border border-outline-variant/30">
          <Filter className="w-4 h-4 text-outline" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Filters:</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
              Category: Electronics <Plus className="w-3 h-3 rotate-45 cursor-pointer" />
            </span>
          </div>
        </div>
        
        <select className="bg-transparent border-none text-xs font-bold text-on-surface-variant focus:ring-0 cursor-pointer uppercase tracking-widest outline-none">
          <option>All Branches</option>
          <option>North Region HQ</option>
          <option>Pacific Distribution</option>
        </select>
        
        <select className="bg-transparent border-none text-xs font-bold text-on-surface-variant focus:ring-0 cursor-pointer uppercase tracking-widest outline-none">
          <option>Stock Status: All</option>
          <option>In Stock</option>
          <option>Out of Stock</option>
          <option>Low Threshold</option>
        </select>
        
        <div className="ml-auto flex bg-surface-container-low p-1 rounded-xl gap-1">
          <button className="p-2 text-on-surface-variant hover:bg-white hover:shadow-sm rounded-lg transition-all">
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white shadow-sm text-primary rounded-lg transition-all">
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-surface-container-high text-[10px] font-bold text-outline uppercase tracking-[0.1em]">
                <th className="px-8 py-5">Product & SKU</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Price (USD)</th>
                <th className="px-8 py-5">Global Stock</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {CATALOG_PRODUCTS.map((p) => (
                <tr key={p.sku} className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-xl bg-surface-container-low overflow-hidden border border-surface-container shadow-sm p-1">
                         <img src={p.img} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-on-surface leading-tight">{p.name}</p>
                        <p className="text-[10px] text-outline font-bold mt-1.5 bg-surface-container px-2 py-0.5 rounded inline-block">SKU: {p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1.5 bg-surface-container-high text-on-surface-variant rounded-lg text-[10px] font-bold uppercase tracking-wider">{p.category}</span>
                  </td>
                  <td className="px-8 py-5 font-bold text-sm text-on-surface">{p.price}</td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-bold text-on-surface">{p.stock.toLocaleString()} <span className="font-medium text-outline">pcs</span></p>
                      <div className="w-28 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: p.stock > 100 ? '75%' : '15%' }}
                          transition={{ duration: 1.2 }}
                          className={cn("h-full", p.stock > 100 ? "bg-secondary" : "bg-error")} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      p.status === 'In Stock' ? "bg-secondary-container/30 text-on-secondary-container" : "bg-error-container/30 text-on-error-container"
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", p.status === 'In Stock' ? "bg-secondary" : "bg-error")}></span>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <button className="p-2 hover:bg-surface-container-high rounded-xl transition-colors text-outline" title="Adjustment">
                        <Package className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-primary/10 rounded-xl transition-colors text-primary" title="Edit">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-error/10 rounded-xl transition-colors text-error" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 border-t border-surface-container-high flex items-center justify-between bg-surface-bright">
          <p className="text-[11px] font-bold text-outline uppercase tracking-widest">Showing 1-10 of 12,482 products</p>
          <div className="flex gap-2">
            {[1, 2, 3].map(n => (
              <button key={n} className={cn(
                "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                n === 1 ? "bg-primary text-white shadow-md active:scale-90" : "hover:bg-surface-container-low text-on-surface"
              )}>{n}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-bold text-on-surface tracking-tight">Branch-wise Stock Allocation</h4>
            <button className="text-primary text-xs font-bold hover:underline py-1 px-3 bg-primary/5 rounded-lg">View All Branches</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'North Region HQ', loc: 'Chicago, IL', val: 420, type: 'Healthy', color: 'text-secondary' },
              { name: 'Pacific Distribution', loc: 'Seattle, WA', val: 8, type: 'Critical', color: 'text-error' },
              { name: 'South Hub', loc: 'Austin, TX', val: 156, type: 'Normal', color: 'text-outline font-bold' },
              { name: 'East Coast Retail', loc: 'New York, NY', val: 220, type: 'Optimal', color: 'text-on-surface-variant' },
            ].map((b) => (
              <div key={b.name} className="flex items-center justify-between p-5 bg-surface-container-low/50 rounded-2xl border border-surface-container hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer">
                <div>
                  <p className="font-bold text-sm text-on-surface">{b.name}</p>
                  <p className="text-[10px] font-medium text-outline mt-1">{b.loc}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-on-surface">{b.val} units</p>
                  <p className={cn("text-[10px] uppercase font-bold tracking-wider mt-1", b.color)}>{b.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high flex flex-col gap-6">
          <h4 className="text-xl font-bold text-on-surface tracking-tight">Bulk Operations</h4>
          <div className="space-y-4">
            {[
              { label: 'Stock In / Receipt', icon: Plus, color: 'text-primary' },
              { label: 'Inter-branch Transfer', icon: Upload, color: 'text-tertiary', rotate: 90 },
              { label: 'Stock Adjustment', icon: Trash2, color: 'text-error' },
            ].map((op) => (
              <button key={op.label} className="w-full flex items-center justify-between p-5 border border-outline-variant/30 rounded-2xl hover:bg-surface-container-low hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-white transition-colors", op.color)}>
                     <op.icon className={cn("w-5 h-5", op.rotate && `rotate-[${op.rotate}deg]`)} />
                  </div>
                  <span className="font-bold text-sm text-on-surface">{op.label}</span>
                </div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <List className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
          <div className="mt-auto p-5 bg-primary/5 border border-primary/20 rounded-2xl relative overflow-hidden">
            <p className="text-xs text-primary font-bold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Inventory Reminder
            </p>
            <p className="text-[11px] text-on-primary-fixed-variant leading-relaxed font-medium">
              Quarterly physical count is scheduled for this Friday at the Pacific Distribution branch.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
