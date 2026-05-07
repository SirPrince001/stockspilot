import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Save, Search, Check, ListChecks, Lock, Plus, MoreVertical, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export default function AccessControl() {
  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-primary">Access Control</h2>
          <p className="text-on-surface-variant text-sm mt-1">Define user roles, set branch scopes, and manage granular system permissions.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-lowest text-primary border border-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-container hover:text-white transition-all active:scale-95">
            <Lock className="w-4 h-4" />
            Create Permission
          </button>
          <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-sm active:scale-95">
            <Plus className="w-4 h-4" />
            Create Role
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Existing Roles List */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden flex flex-col">
          <div className="p-4 border-b border-surface-container flex justify-between items-center bg-surface-bright">
            <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider">Existing Roles</h3>
            <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">5 TOTAL</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[
              { title: 'Administrator', desc: 'Full system access including financial settings and user management.', type: 'GLOBAL', users: 14, active: true },
              { title: 'Inventory Manager', desc: 'Manage stock, warehouse transfers, and supplier orders.', type: 'BRANCH', region: 'North-East Hub' },
              { title: 'Sales Executive', desc: 'Customer interaction, order processing, and quote generation.', type: 'BRANCH', region: 'All Branches' },
              { title: 'Finance Auditor', desc: 'Read-only access to ledger, tax reports, and financial logs.', type: 'GLOBAL' },
            ].map((role) => (
              <div 
                key={role.title} 
                className={cn(
                  "p-5 border-b border-surface-container cursor-pointer transition-colors",
                  role.active ? "bg-surface-container-low" : "hover:bg-surface-container-low"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={cn("font-bold text-base", role.active ? "text-primary" : "text-on-surface")}>{role.title}</span>
                  <span className={cn(
                    "text-[9px] px-2 py-0.5 rounded-full font-bold",
                    role.type === 'GLOBAL' ? "bg-secondary-fixed text-on-secondary-fixed-variant" : "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                  )}>
                    {role.type}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">{role.desc}</p>
                {role.users && (
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300" />
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-primary-fixed text-[8px] flex items-center justify-center font-bold text-primary">+{role.users - 2}</div>
                    </div>
                    <span className="text-[10px] text-outline font-medium">{role.users} Users assigned</span>
                  </div>
                )}
                {role.region && (
                  <div className="flex items-center gap-1.5 text-outline">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] font-medium">Region: {role.region}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Matrix */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden flex flex-col">
          <div className="p-6 border-b border-surface-container flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-bold text-lg text-on-surface">Permissions Matrix: <span className="text-primary">Administrator</span></h3>
              <p className="text-xs text-on-surface-variant mt-1 font-medium">Update granular CRUD permissions for this specific role.</p>
            </div>
            <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-sm">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-bright text-[10px] font-bold text-outline-variant border-b border-surface-container uppercase tracking-widest">
                  <th className="p-6">MODULE / FEATURE</th>
                  <th className="p-6 text-center">CREATE</th>
                  <th className="p-6 text-center">READ</th>
                  <th className="p-6 text-center">UPDATE</th>
                  <th className="p-6 text-center">DELETE</th>
                  <th className="p-6 text-right">AUDIT LOG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {[
                  { title: 'Inventory Management', sub: 'Stock, Warehousing, SKUs', icon: 'Package' },
                  { title: 'Financial Ledger', sub: 'Transactions, Invoices, Tax', icon: 'Ledger' },
                  { title: 'HR & Payroll', sub: 'Staff records, Salary slips', icon: 'Users', off: true },
                  { title: 'Branch Settings', sub: 'Locations, Operational Hours', icon: 'Store' },
                ].map((row) => (
                  <tr key={row.title} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                           <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-on-surface">{row.title}</p>
                          <p className="text-[10px] text-outline font-medium mt-0.5">{row.sub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <input type="checkbox" defaultChecked={!row.off} className="w-5 h-5 rounded-md border-outline-variant text-primary focus:ring-primary/20" />
                    </td>
                    <td className="p-6 text-center">
                      <input type="checkbox" defaultChecked={!row.off} className="w-5 h-5 rounded-md border-outline-variant text-primary focus:ring-primary/20" />
                    </td>
                    <td className="p-6 text-center">
                      <input type="checkbox" defaultChecked={!row.off} className="w-5 h-5 rounded-md border-outline-variant text-primary focus:ring-primary/20" />
                    </td>
                    <td className="p-6 text-center">
                      <input type="checkbox" defaultChecked={!row.off} className="w-5 h-5 rounded-md border-outline-variant text-primary focus:ring-primary/20" />
                    </td>
                    <td className="p-6 text-right">
                      <span className={cn(
                        "text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow-sm",
                        row.off ? "bg-error-container text-on-error-container" : "bg-secondary-container text-on-secondary-container"
                      )}>
                        {row.off ? 'Off' : 'Enabled'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high grid grid-cols-1 md:grid-cols-2 gap-12 border-t-4 border-primary">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-on-surface tracking-tight">Role Quick Creator</h4>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Role Name</label>
              <input 
                className="w-full px-4 py-3 bg-surface-container-low border border-transparent rounded-lg focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium" 
                placeholder="e.g. Regional Supervisor" 
                type="text" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Scope / Branch</label>
              <select className="w-full px-4 py-3 bg-surface-container-low border border-transparent rounded-lg focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium appearance-none cursor-pointer">
                <option>Global Access</option>
                <option>Headquarters (HQ)</option>
                <option>North-East Logistics Hub</option>
                <option>West Coast Retail Outlet</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Role Description</label>
              <textarea 
                className="w-full px-4 py-3 bg-surface-container-low border border-transparent rounded-lg focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm font-medium" 
                placeholder="Briefly describe the responsibilities..." 
                rows={3} 
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-sm">
                <ListChecks className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-on-surface tracking-tight">Inheritance & Safety</h4>
            </div>
            <div className="bg-surface-container-low/50 p-6 rounded-xl space-y-5 border border-surface-container">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative mt-1">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-5 h-5 rounded border-2 border-outline-variant peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">Inherit Permissions</p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed font-medium">Clone all permissions from an existing role as a baseline.</p>
                </div>
              </label>
              <label className="flex items-start gap-4 cursor-pointer group">
                 <div className="relative mt-1">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="w-5 h-5 rounded border-2 border-outline-variant peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">Require 2FA</p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed font-medium">Mandate Two-Factor Authentication for all users with this role.</p>
                </div>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-12">
            <button className="px-8 py-3 text-on-surface-variant font-bold text-sm hover:bg-surface-container-low transition-colors rounded-lg">Discard Draft</button>
            <button className="px-10 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">Create & Configure Role</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
