using LeaveManagementSystem.Domain.Entities;

namespace LeaveManagementSystem.Application.Contracts.Persistence;

public interface ILeaveAllocationRepository : IAsyncRepository<LeaveAllocation>
{
    Task<IReadOnlyList<LeaveAllocation>> GetAllocationsByEmployeeIdAsync(string employeeId);
}
