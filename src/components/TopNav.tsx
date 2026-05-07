import React from 'react';
import { Search, Bell, HelpCircle, Settings } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="fixed top-0 right-0 left-[260px] h-16 bg-surface-bright shadow-[0px_4px_20px_rgba(0,0,0,0.05)] z-40 flex justify-between items-center px-6 border-b border-surface-container">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input 
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
            placeholder="Search resources, users or orders..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-bright"></span>
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        
        <div className="h-8 w-px bg-outline-variant mx-2"></div>
        
        <div className="flex items-center gap-3 cursor-pointer p-1 rounded-lg hover:bg-surface-container-low transition-all">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-on-surface">Alex Thompson</p>
            <p className="text-[10px] text-outline uppercase tracking-wider">System Admin</p>
          </div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB5nn1SZlQLte7b-YG3qycGNQdxl8UEuqXBwrcO0mXohBzRMdUGatLl-BuUf0Z0iR6trMXZLS1hOec72teByPsJqEyXD0jiB02BG3Jc7rr5YFHoqc1XoGXGRERLA4OKteUA9JaLgZuGMejqERevztK-GtSIJCGK0LK79XH6ccjibnWH_WXiiBZl8mjU1U7lbyB3lGIojZDtj5tMku3o_FGMCjMu8JGnEWPTTgVGnZcFwb49uEBZIgz1yeTuEpDVX85BnDwI5DnAgI" 
            alt="User profile" 
            className="w-8 h-8 rounded-full border border-outline-variant"
          />
        </div>
      </div>
    </header>
  );
}
