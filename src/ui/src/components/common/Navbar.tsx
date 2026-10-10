import { NavLink } from 'react-router-dom';
import { useLeaveStore } from '../../store/useLeaveStore';

export function Navbar() {
  const setShowModal = useLeaveStore((state) => state.setShowModal);

  return (
    <header className="portal-header">
      <div className="brand-nav-group">
        <NavLink to="/" className="brand-link">
          <div className="logo-badge">LMS</div>
          <div>
            <h1>Leave Management</h1>
            <p className="subtitle">React Router + TanStack Query</p>
          </div>
        </NavLink>

        <nav className="header-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/leave-types"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Leave Types
          </NavLink>
        </nav>
      </div>

      <div className="header-actions">
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          + Request Leave
        </button>
      </div>
    </header>
  );
}
