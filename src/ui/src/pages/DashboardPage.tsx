import { useLeaveRequests } from '../hooks/useLeaveQueries';
import { MetricsGrid } from '../components/dashboard/MetricsGrid';
import { LeaveRequestsTable } from '../components/dashboard/LeaveRequestsTable';

export function DashboardPage() {
  const { data: requests = [], isLoading, isError, isFetching, refetch } = useLeaveRequests();

  return (
    <main className="portal-main">
      {/* Top metrics summary cards */}
      <MetricsGrid requests={requests} />

      {/* Main Leave requests table */}
      <LeaveRequestsTable
        requests={requests}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        onRefresh={() => refetch()}
      />
    </main>
  );
}
