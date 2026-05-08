import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CloudUpload, Plus, MapPin, Calendar, ExternalLink, Download, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { RECENT_ENTITIES as INITIAL_ENTITIES } from '../constants';
import { cn } from '../lib/utils';
import CompanyModal from '../components/CompanyModal';
import BranchModal from '../components/BranchModal';

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 }
};

export default function Organization() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [entities, setEntities] = useState<any[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [branches, setBranches] = useState<any[]>([]);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  React.useEffect(() => {
    fetchCompanies();
  }, []);

  React.useEffect(() => {
    if (selectedEntity?.id) {
      fetchBranches(selectedEntity.id);
    }
  }, [selectedEntity]);

  const fetchCompanies = async () => {
    setLoadingCompanies(true);
    try {
      const response = await fetch('/api/company/companies');
      if (response.ok) {
        const data = await response.json();
        setEntities(data);
        if (data.length > 0 && !selectedEntity) {
          setSelectedEntity(data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoadingCompanies(false);
    }
  };

  const fetchBranches = async (companyId: string) => {
    setLoadingBranches(true);
    try {
      const response = await fetch(`/api/branch/branches/${companyId}`);
      if (response.ok) {
        const data = await response.json();
        setBranches(data);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setLoadingBranches(false);
    }
  };

  const handleCreateSuccess = (newCompany: any) => {
    setEntities(prev => [newCompany, ...prev]);
    setSelectedEntity(newCompany);
  };

  const handleBranchSuccess = (newBranch: any) => {
    setBranches(prev => [newBranch, ...prev]);
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 space-y-6"
    >
      <CompanyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleCreateSuccess} 
      />

      <BranchModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        onSuccess={handleBranchSuccess}
        initialCompanyId={selectedEntity?.id}
        entities={entities}
      />

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
          <button 
            onClick={() => setIsBranchModalOpen(true)}
            className="flex items-center gap-2 bg-secondary px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-colors shadow-lg active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Create Branch
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-primary-container transition-colors shadow-lg active:scale-95"
          >
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
              <span className="bg-primary-container/10 text-primary px-2 py-1 rounded-md text-[10px] font-bold tracking-wider">{entities.length} TOTAL</span>
            </div>
            <div className="space-y-3">
              {loadingCompanies ? (
                <div className="py-12 text-center text-outline">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Loading Entities...</p>
                </div>
              ) : entities.length === 0 ? (
                <div className="py-12 text-center text-outline text-xs">
                  No entities found. Create one.
                </div>
              ) : entities.map((company) => (
                <div 
                  key={company.id} 
                  onClick={() => setSelectedEntity(company)}
                  className={cn(
                    "p-3 rounded-xl cursor-pointer transition-all border",
                    selectedEntity?.id === company.id ? "bg-primary/5 border-primary/20 shadow-sm" : "hover:bg-surface-container-low border-transparent"
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
          {!selectedEntity ? (
            <div className="flex-1 min-h-[400px] bg-surface-container-low/30 rounded-2xl border border-dashed border-outline-variant flex flex-col items-center justify-center">
              <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                <Plus className="w-8 h-8 text-primary opacity-50" />
              </div>
              <h3 className="font-bold text-on-surface">No Entity Selected</h3>
              <p className="text-sm text-outline mt-1">Select or create a company to manage branches.</p>
            </div>
          ) : (
            <>
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high">
            <div className="h-32 bg-gradient-to-r from-primary to-tertiary relative">
              <div className="absolute bottom-[-32px] left-8 p-1 bg-white rounded-2xl shadow-xl border-4 border-white">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-low flex items-center justify-center">
                   <img 
                    src={selectedEntity.logo} 
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
                    <h3 className="font-bold text-xl">{selectedEntity.name}</h3>
                    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold">HQ ENTITY</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-outline">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm truncate max-w-[200px]">{selectedEntity.address || "San Francisco, CA"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Joined {selectedEntity.createdAt ? new Date(selectedEntity.createdAt).toLocaleDateString() : 'Feb 2022'}</span>
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
                  { label: 'Total Staff', value: selectedEntity.staffCount || '0' },
                  { label: 'Branches', value: branches.length.toString() },
                  { label: 'Annual Rev', value: selectedEntity.revenue || '$0' },
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
                  {loadingBranches ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-outline">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                        Loading branches...
                      </td>
                    </tr>
                  ) : branches.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-outline">
                        No branches registered for this entity.
                      </td>
                    </tr>
                  ) : (
                    branches.map((branch) => (
                      <tr key={branch.id} className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                        <td className="py-4 px-2">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-on-surface">{branch.name}</span>
                            <span className="text-[10px] text-outline">{branch.location}</span>
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
                            {branch.compliance === 100 ? '100% Verified' : `${branch.compliance}%`}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-sm font-semibold">{branch.headcount}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <button 
              onClick={() => setIsBranchModalOpen(true)}
              className="w-full mt-6 py-2 border border-dashed border-primary/30 rounded-lg text-primary text-xs font-bold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
            >
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
        </>
        )}
      </div>
    </div>
  </motion.div>
);
}
