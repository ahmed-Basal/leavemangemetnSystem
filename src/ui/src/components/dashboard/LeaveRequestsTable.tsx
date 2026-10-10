import type { LeaveRequest } from '../../types/leave';
import { StatusBadge } from '../common/StatusBadge';
import { getLeaveTypeName } from '../../utils/leaveUtils';
import { useLeaveStore } from '../../store/useLeaveStore';

interface LeaveRequestsTableProps {
  requests: LeaveRequest[];
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  onRefresh: () => void;
}

export function LeaveRequestsTable({
  requests,
  isLoading,
  isError,
  isFetching,
  onRefresh,
}: LeaveRequestsTableProps) {
  const setShowModal = useLeaveStore((state) => state.setShowModal);

  return (
    <section className="table-card">
      <div className="table-header">
        <h2>Recent Leave Applications</h2>
        <button
          className="refresh-btn"
          onClick={onRefresh}
          disabled={isFetching}
        >
          {isFetching ? '↻ Refreshing...' : '↻ Refresh'}
        </button>
      </div>

      {isLoading ? (
        <div className="loading-state">Loading applications via TanStack Query & Axios...</div>
      ) : isError ? (
        <div className="empty-state">Error fetching data. Check your API server connection.</div>
      ) : requests.length === 0 ? (
        <div className="empty-state">
          No leave applications found. Click{' '}
          <button
            className="secondary-btn"
            style={{ display: 'inline-block', marginLeft: '0.5rem' }}
            onClick={() => setShowModal(true)}
          >
            + Request Leave
          </button>{' '}
          to submit.
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="leave-table">
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Requested On</th>
                <th>Comments</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((item, index) => (
                <tr key={item.id ?? index}>
                  <td className="emp-id">{item.requestingEmployeeId}</td>
                  <td>{getLeaveTypeName(item.leaveTypeId, item.leaveType?.name)}</td>
                  <td>{item.startDate ? new Date(item.startDate).toLocaleDateString() : '-'}</td>
                  <td>{item.endDate ? new Date(item.endDate).toLocaleDateString() : '-'}</td>
                  <td>{item.dateRequested ? new Date(item.dateRequested).toLocaleDateString() : '-'}</td>
                  <td className="reason-cell">{item.requestComments || 'None provided'}</td>
                  <td>
                    <StatusBadge request={item} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
