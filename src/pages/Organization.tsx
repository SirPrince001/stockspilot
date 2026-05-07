import React from 'react';
import { motion } from 'motion/react';
import { CloudUpload, Plus, MapPin, Calendar, ExternalLink, Download, FileText, CheckCircle } from 'lucide-react';
import { RECENT_ENTITIES } from '../constants';
import { cn } from '../lib/utils';

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 }
};

export default function Organization() {
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
          <h2 className="text-3xl font-bold text-on-background">Organization Directory</h2>
          <p className="text-on-surface-variant text-sm mt-1">Manage global enterprise entities, corporate hierarchy, and branch deployments.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant px-4 py-2.5 rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container-low transition-colors shadow-sm">
            <CloudUpload className="w-5 h-5" />
            Bulk Import
          </button>
          <button className="flex items-center gap-2 bg-primary px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-primary-container transition-colors shadow-lg active:scale-95">
            <Plus className="w-5 h-5" />
            Create Company
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Recent Entities</h3>
              <span className="bg-primary-container/10 text-primary px-2 py-1 rounded-md text-[10px] font-bold tracking-wider">24 TOTAL</span>
            </div>
            <div className="space-y-3">
              {RECENT_ENTITIES.map((company, idx) => (
                <div 
                  key={company.id} 
                  className={cn(
                    "p-3 rounded-xl cursor-pointer transition-all border",
                    idx === 0 ? "bg-primary/5 border-primary/20 shadow-sm" : "hover:bg-surface-container-low border-transparent"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg border border-outline-variant flex items-center justify-center p-2">
                       <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-on-surface truncate pr-2">{company.name}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase shrink-0",
                          company.status === 'ACTIVE' ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"
                        )}>
                          {company.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-outline mt-0.5">ID: {company.id}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-primary text-xs font-bold py-2 border border-dashed border-primary/30 rounded-lg hover:bg-primary/5 transition-colors">
              View All Entities
            </button>
          </div>

          <div className="bg-tertiary text-white rounded-xl p-6 shadow-lg overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-white/80 font-semibold text-xs mb-1">Total Regional Branches</p>
              <h4 className="text-3xl font-bold">142</h4>
              <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-secondary-fixed">
                <span className="bg-secondary-fixed/20 p-0.5 rounded">↑</span>
                +12% vs last month
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
              <MapPin className="w-24 h-24" />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high">
            <div className="h-32 bg-gradient-to-r from-primary to-tertiary relative">
              <div className="absolute bottom-[-32px] left-8 p-1 bg-white rounded-2xl shadow-xl border-4 border-white">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-low flex items-center justify-center">
                   <img 
                    src={RECENT_ENTITIES[0].logo} 
                    alt="Logo" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <CloudUpload className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="pt-12 pb-6 px-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-xl">{RECENT_ENTITIES[0].name}</h3>
                    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold">HQ ENTITY</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-outline">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Joined Feb 2022</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button className="flex-1 md:flex-none bg-surface-container-high hover:bg-surface-container-highest px-4 py-2 rounded-lg text-xs font-bold text-on-surface-variant transition-colors">
                    Update Company
                  </button>
                  <button className="flex-1 md:flex-none bg-on-background text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-black transition-colors">
                    Branch Manager
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { label: 'Total Staff', value: '1,204' },
                  { label: 'Branches', value: '12' },
                  { label: 'Annual Rev', value: '$42.8M' },
                  { label: 'Status', value: 'Active', active: true },
                ].map((item) => (
                  <div key={item.label} className="p-4 bg-surface-container-low rounded-xl">
                    <p className="text-outline text-[10px] uppercase font-bold mb-1">{item.label}</p>
                    {item.active ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        <span className="font-bold text-lg text-secondary">Active</span>
                      </div>
                    ) : (
                      <p className="font-bold text-lg">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-lg">Active Branches</h4>
              <div className="flex gap-2">
                 <select className="bg-surface-container-low border-none rounded-lg px-4 py-1.5 text-xs font-semibold focus:ring-1 focus:ring-primary">
                  <option>All Regions</option>
                  <option>North America</option>
                  <option>Europe</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-outline-variant">
                    <th className="pb-3 text-[10px] font-bold text-outline uppercase px-2">Branch Name</th>
                    <th className="pb-3 text-[10px] font-bold text-outline uppercase px-2">Manager</th>
                    <th className="pb-3 text-[10px] font-bold text-outline uppercase px-2">Compliance</th>
                    <th className="pb-3 text-[10px] font-bold text-outline uppercase px-2">Headcount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high">
                  {[
                    { name: 'San Francisco - Main', manager: 'Marcus Stone', compliance: 100, count: 480 },
                    { name: 'Austin - R&D Center', manager: 'Sarah Linn', compliance: 85, count: 215 },
                    { name: 'London - European Hub', manager: 'David Chen', compliance: 40, count: 112 },
                  ].map((branch) => (
                    <tr key={branch.name} className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                      <td className="py-4 px-2">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-on-surface">{branch.name}</span>
                          <span className="text-[10px] text-outline">Market St, Suite 400</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-surface-container-high overflow-hidden">
                             <div className="w-full h-full bg-primary/20" />
                          </div>
                          {branch.manager}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="w-20 h-1.5 bg-surface-container-high rounded-full overflow-hidden mb-1">
                          <div className={cn("h-full", branch.compliance > 50 ? "bg-secondary" : "bg-error")} style={{ width: `${branch.compliance}%` }} />
                        </div>
                        <span className={cn("text-[10px] font-bold", branch.compliance > 50 ? "text-secondary" : "text-error")}>
                          {branch.compliance === 100 ? '100%' : branch.compliance < 50 ? 'Pending Audits' : `${branch.compliance}%`}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-sm font-semibold">{branch.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="w-full mt-6 py-2 border border-dashed border-primary/30 rounded-lg text-primary text-xs font-bold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add New Branch Location
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-surface-container-high shadow-sm">
              <h5 className="text-xs font-bold text-on-surface mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" /> Tax Compliance
              </h5>
              <div className="space-y-3">
                {[
                  { label: 'Tax ID', value: 'FE-99002231' },
                  { label: 'Fiscal Year', value: 'Jan - Dec' },
                  { label: 'VAT Status', value: 'Verified', status: 'verified' },
                ].map((doc) => (
                  <div key={doc.label} className="flex justify-between items-center">
                    <span className="text-outline text-xs">{doc.label}</span>
                    <span className={cn("text-xs font-bold", doc.status === 'verified' && "text-secondary")}>{doc.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 border border-surface-container-high shadow-sm">
              <h5 className="text-xs font-bold text-on-surface mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Core Documents
              </h5>
              <div className="space-y-2">
                {[
                  { name: 'Articles_of_Inc.pdf', type: 'pdf' },
                  { name: 'Tax_Exempt_Form.doc', type: 'doc' },
                ].map((doc) => (
                  <button key={doc.name} className="w-full flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors text-xs">
                    <span className="flex items-center gap-2 font-medium">
                      <FileText className={cn("w-4 h-4", doc.type === 'pdf' ? "text-error" : "text-primary")} />
                      {doc.name}
                    </span>
                    <Download className="w-3.5 h-3.5 text-outline" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
