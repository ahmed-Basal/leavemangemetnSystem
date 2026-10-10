import type { LeaveRequest } from '../../types/leave';

interface StatusBadgeProps {
  request: LeaveRequest;
}

export function StatusBadge({ request }: StatusBadgeProps) {
  if (request.cancelled) {
    return <span className="status-badge cancelled">Cancelled</span>;
  }
  if (request.approved === true) {
    return <span className="status-badge approved">Approved</span>;
  }
  if (request.approved === false) {
    return <span className="status-badge rejected">Rejected</span>;
  }
  return <span className="status-badge pending">Pending</span>;
}
