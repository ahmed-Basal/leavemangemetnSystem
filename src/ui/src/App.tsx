import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Toast } from './components/common/Toast';
import { ApplyLeaveModal } from './components/modals/ApplyLeaveModal';
import { DashboardPage } from './pages/DashboardPage';
import { LeaveTypesPage } from './pages/LeaveTypesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="portal-container">
        <Navbar />
        <Toast />

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/leave-types" element={<LeaveTypesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Global modal accessible from any route */}
        <ApplyLeaveModal />
      </div>
    </BrowserRouter>
  );
}
