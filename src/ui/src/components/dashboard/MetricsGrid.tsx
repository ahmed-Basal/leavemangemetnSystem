import type { LeaveRequest } from '../../types/leave';

interface MetricsGridProps {
  requests: LeaveRequest[];
}

export function MetricsGrid({ requests }: MetricsGridProps) {
  const pendingCount = requests.filter((r) => r.approved === null && !r.cancelled).length;

  return (
    <section className="metrics-grid">
      <div className="metric-card">
        <span className="metric-title">Annual Leave</span>
        <div className="metric-value">
          18 <span>/ 24 days left</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '75%' }}></div>
        </div>
      </div>

      <div className="metric-card">
        <span className="metric-title">Sick Leave</span>
        <div className="metric-value">
          8 <span>/ 10 days left</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '80%' }}></div>
        </div>
      </div>

      <div className="metric-card">
        <span className="metric-title">Pending Requests</span>
        <div className="metric-value count-pending">{pendingCount}</div>
        <p className="metric-sub">Awaiting HR / Manager approval</p>
      </div>

      <div className="metric-card">
        <span className="metric-title">Stack Architecture</span>
        <div className="architecture-tags">
          <span className="tech-tag">TanStack React Query</span>
          <span className="tech-tag">Axios Client</span>
          <span className="tech-tag">Zustand Store</span>
          <span className="tech-tag">.NET 11 Web API</span>
        </div>
      </div>
    </section>
  );
}
