import { useLeaveTypes } from '../hooks/useLeaveQueries';

export function LeaveTypesPage() {
  const { data: leaveTypes = [], isLoading, isError, refetch, isFetching } = useLeaveTypes();

  return (
    <main className="portal-main">
      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Configured Leave Types</h2>
            <p className="subtitle" style={{ marginTop: '0.25rem' }}>
              Company leave policies and default annual allowances
            </p>
          </div>
          <button
            className="refresh-btn"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? '↻ Refreshing...' : '↻ Refresh'}
          </button>
        </div>

        {isLoading ? (
          <div className="loading-state">Loading leave types...</div>
        ) : isError ? (
          <div className="empty-state">
            Failed to load leave types. Please ensure the backend API is running.
          </div>
        ) : (
          <div className="leave-types-grid">
            {leaveTypes.map((type) => (
              <div key={type.id} className="leave-type-card">
                <div className="type-header">
                  <h3>{type.name}</h3>
                  <span className="days-badge">{type.defaultDays} Days/Year</span>
                </div>
                <p className="type-desc">
                  {type.description || 'No detailed policy description provided.'}
                </p>
                <div className="type-meta">
                  <span>Type ID: #{type.id}</span>
                  <span className="type-status">Active Policy</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
