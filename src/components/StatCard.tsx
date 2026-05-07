import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  footer?: string;
}

export default function StatCard({ 
  title, 
  value, 
  trend, 
  trendType = 'neutral', 
  icon: Icon, 
  iconBg, 
  iconColor,
  footer 
}: StatCardProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high transition-transform hover:scale-[1.02] duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2 rounded-lg", iconBg, iconColor)}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={cn(
            "flex items-center text-xs font-bold px-2 py-1 rounded-full",
            trendType === 'up' && "bg-secondary-container text-secondary",
            trendType === 'down' && "bg-error-container text-error",
            trendType === 'neutral' && "bg-surface-container-high text-outline"
          )}>
            {trendType === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
            {trendType === 'down' && <TrendingDown className="w-3 h-3 mr-1" />}
            {trendType === 'neutral' && <Minus className="w-3 h-3 mr-1" />}
            {trend}
          </span>
        )}
      </div>
      <p className="text-outline text-xs uppercase tracking-wider font-bold mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-on-surface">{value}</h3>
      {footer && (
        <p className="text-xs text-outline mt-2 italic">{footer}</p>
      )}
    </div>
  );
}
