import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Package, Users, AlertTriangle, Calendar, Download, ChevronRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import SalesChart from '../components/SalesChart';
import TransactionModal from '../components/TransactionModal';
import { TOP_PRODUCTS, RECENT_TRANSACTIONS } from '../constants';
import { cn } from '../lib/utils';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 space-y-6"
    >
      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-on-background">System Overview</h2>
          <p className="text-on-surface-variant text-sm">Real-time performance analytics for Nexus ERP network.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-outline-variant text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg flex items-center gap-2 hover:opacity-90 shadow-sm transition-all">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Sales"
          value="$245,892.00"
          trend="+12.5%"
          trendType="up"
          icon={ShoppingCart}
          iconBg="bg-primary/10"
          iconColor="text-primary"
          footer="Updated 5 mins ago"
        />
        <StatCard 
          title="Catalog Size"
          value="1,284"
          trend="Stable"
          trendType="neutral"
          icon={Package}
          iconBg="bg-tertiary/10"
          iconColor="text-tertiary"
          footer="86 new this month"
        />
        <StatCard 
          title="Total Customers"
          value="8,492"
          trend="+4.2%"
          trendType="up"
          icon={Users}
          iconBg="bg-secondary/10"
          iconColor="text-secondary"
          footer="Active retention: 94%"
        />
        <StatCard 
          title="Stock Alerts"
          value="12 Items"
          trend="-2.1%"
          trendType="down"
          icon={AlertTriangle}
          iconBg="bg-error/10"
          iconColor="text-error"
          footer="Immediate action required"
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-container-high flex justify-between items-center">
              <h3 className="font-bold text-lg text-on-surface">Sales Performance Trend</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-bold">Daily</button>
                <button className="px-3 py-1 text-outline hover:bg-surface-container-low rounded-md text-xs font-bold">Weekly</button>
                <button className="px-3 py-1 text-outline hover:bg-surface-container-low rounded-md text-xs font-bold">Monthly</button>
              </div>
            </div>
            <div className="p-6">
              <SalesChart />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Companies', value: '142', icon: 'domain' },
              { label: 'Branches', value: '12', icon: 'account_tree' },
              { label: 'Roles', value: '24', icon: 'admin_panel_settings' },
              { label: 'Users', value: '842', icon: 'person' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-4 rounded-xl border border-surface-container-high shadow-sm hover:shadow-md transition-all group cursor-pointer">
                <p className="text-outline text-[10px] uppercase font-bold tracking-tighter mb-1">{stat.label}</p>
                <h4 className="text-xl font-bold text-on-surface">{stat.value}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="bg-surface-container-lowest h-full rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-surface-container-high flex justify-between items-center">
              <h3 className="font-bold text-lg text-on-surface">Top Selling Products</h3>
              <button className="text-primary text-xs font-bold hover:underline">View All</button>
            </div>
            <div className="p-6 flex-1 space-y-4">
              {TOP_PRODUCTS.map((product) => (
                <div key={product.name} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low overflow-hidden flex-shrink-0">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-on-surface truncate">{product.name}</h4>
                    <p className="text-xs text-outline">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-on-surface">${product.price.toLocaleString()}</p>
                    <p className="text-[10px] text-secondary font-bold">{product.sales} Sales</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-surface-container-low/30 border-t border-surface-container-high">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-on-surface">Target Met</span>
                <span className="text-xs font-bold text-secondary">82%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '82%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-secondary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden">
        <div className="px-6 py-4 border-b border-surface-container-high flex justify-between items-center">
          <h3 className="font-bold text-lg text-on-surface">Recent Sales Transactions</h3>
          <button className="text-sm text-outline hover:text-primary transition-colors flex items-center gap-1 font-semibold">
            All Branches <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low/50 text-outline text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Branch</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {RECENT_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-container-low/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{tx.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{tx.customer}</td>
                  <td className="px-6 py-4 text-xs text-outline">{tx.branch}</td>
                  <td className="px-6 py-4 text-sm font-bold">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold",
                      tx.status === 'Completed' && "bg-secondary-container text-secondary",
                      tx.status === 'Processing' && "bg-tertiary-container/10 text-tertiary",
                      tx.status === 'Pending' && "bg-error-container/30 text-error",
                    )}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
