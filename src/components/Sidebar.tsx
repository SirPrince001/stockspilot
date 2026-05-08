import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  ShieldCheck, 
  Users, 
  PackageSearch, 
  Warehouse, 
  UserSearch, 
  ShoppingCart,
  PlusCircle,
  Settings,
  LogOut,
  Rocket
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Organization', path: '/organization', icon: Building2 },
  { name: 'Access Control', path: '/access-control', icon: ShieldCheck },
  { name: 'Staffing', path: '/staffing', icon: Users },
  { name: 'Product Catalog', path: '/product-catalog', icon: PackageSearch },
  { name: 'Sales Orders', path: '/sales-orders', icon: ShoppingCart },
];

interface SidebarProps {
  onQuickTransaction: () => void;
}

export default function Sidebar({ onQuickTransaction }: SidebarProps) {
  return (
    <aside className="w-[260px] h-screen fixed left-0 top-0 z-50 bg-[#111827] flex flex-col py-6 border-r border-[#1f2937]">
      <div className="px-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-surface-bright leading-tight">StockPilot</h1>
            <p className="text-[10px] text-outline-variant uppercase tracking-widest opacity-70">
              Enterprise Suite
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "mx-2 px-4 py-2 flex items-center gap-3 transition-all duration-200 group text-outline-variant hover:text-white hover:bg-white/5",
                isActive && "bg-white/10 text-white rounded-full"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-4 space-y-2">
        <button 
          onClick={onQuickTransaction}
          className="w-full bg-primary text-white py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mb-4 hover:bg-primary-container transition-colors active:scale-95 shadow-lg shadow-primary/20"
        >
          <PlusCircle className="w-4 h-4" />
          Quick Transaction
        </button>
        
        <a href="#" className="mx-2 px-4 py-2 flex items-center gap-3 text-outline-variant hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">System Settings</span>
        </a>
        <a href="#" className="mx-2 px-4 py-2 flex items-center gap-3 text-outline-variant hover:text-white transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </a>
      </div>
    </aside>
  );
}
