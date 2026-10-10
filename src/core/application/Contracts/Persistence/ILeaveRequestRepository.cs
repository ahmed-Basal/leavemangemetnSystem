using LeaveManagementSystem.Domain.Entities;

namespace LeaveManagementSystem.Application.Contracts.Persistence;

public interface ILeaveRequestRepository : IAsyncRepository<LeaveRequest>
{
    Task<IReadOnlyList<LeaveRequest>> GetByEmployeeIdAsync(string employeeId);
    Task<IReadOnlyList<LeaveRequest>> GetWithDetailsAsync();
}
