using LeaveManagementSystem.Domain.Entities;

namespace LeaveManagementSystem.Application.Contracts.Persistence;

public interface ILeaveTypeRepository : IAsyncRepository<LeaveType>
{
    Task<bool> IsLeaveTypeNameUniqueAsync(string name, int? excludeId = null);
}
