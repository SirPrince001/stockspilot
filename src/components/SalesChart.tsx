import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PERFORMANCE_DATA } from '../constants';

export default function SalesChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={PERFORMANCE_DATA} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#737686', fontSize: 12, fontWeight: 600 }}
            dy={10}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#171c1f', 
              border: 'none', 
              borderRadius: '8px',
              color: 'white'
            }}
            cursor={{ fill: 'rgba(0, 74, 198, 0.05)' }}
          />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]}
            barSize={40}
          >
            {PERFORMANCE_DATA.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === 6 ? '#004ac6' : '#2563eb33'} 
                className="hover:fill-primary transition-colors cursor-pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
