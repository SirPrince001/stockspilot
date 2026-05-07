import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './pages/Dashboard';
import Organization from './pages/Organization';
import AccessControl from './pages/AccessControl';
import ProductCatalog from './pages/ProductCatalog';
import SalesOrders from './pages/SalesOrders';
import UserManagement from './pages/UserManagement';
import TransactionModal from './components/TransactionModal';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isSuccessModalOpen, setSuccessModalOpen] = React.useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-background">
        <Sidebar onQuickTransaction={() => setSuccessModalOpen(true)} />
        <div className="flex-1 ml-[260px] flex flex-col min-h-screen relative">
          <TopNav />
          <main className="flex-1 pt-16 h-full overflow-x-hidden">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/organization" element={<Organization />} />
                <Route path="/staffing" element={<UserManagement />} />
                <Route path="/access-control" element={<AccessControl />} />
                <Route path="/product-catalog" element={<ProductCatalog />} />
                <Route path="/sales-orders" element={<SalesOrders />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
        
        <TransactionModal 
          isOpen={isSuccessModalOpen} 
          onClose={() => setSuccessModalOpen(false)} 
        />
      </div>
    </Router>
  );
}
