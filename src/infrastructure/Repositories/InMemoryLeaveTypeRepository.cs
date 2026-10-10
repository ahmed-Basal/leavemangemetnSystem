using System.Collections.Concurrent;
using LeaveManagementSystem.Application.Contracts.Persistence;
using LeaveManagementSystem.Domain.Entities;

namespace LeaveManagementSystem.Infrastructure.Repositories;

public class InMemoryLeaveTypeRepository : ILeaveTypeRepository
{
    private readonly ConcurrentDictionary<int, LeaveType> _leaveTypes = new();
    private int _nextId = 1;

    public InMemoryLeaveTypeRepository()
    {
        // Seed default leave types
        Seed(new LeaveType { Name = "Annual Leave", DefaultDays = 24, Description = "Standard paid annual vacation leave" });
        Seed(new LeaveType { Name = "Sick Leave", DefaultDays = 10, Description = "Medical or illness-related leave" });
        Seed(new LeaveType { Name = "Casual Leave", DefaultDays = 5, Description = "Short-term personal or urgent leave" });
        Seed(new LeaveType { Name = "Maternity/Paternity", DefaultDays = 30, Description = "Parental family care leave" });
    }

    private void Seed(LeaveType leaveType)
    {
        leaveType.Id = _nextId++;
        leaveType.DateCreated = DateTime.UtcNow;
        _leaveTypes[leaveType.Id] = leaveType;
    }

    public Task<IReadOnlyList<LeaveType>> GetAllAsync()
    {
        IReadOnlyList<LeaveType> list = _leaveTypes.Values.OrderBy(lt => lt.Id).ToList();
        return Task.FromResult(list);
    }

    public Task<LeaveType?> GetByIdAsync(int id)
    {
        _leaveTypes.TryGetValue(id, out var leaveType);
        return Task.FromResult(leaveType);
    }

    public Task<LeaveType> AddAsync(LeaveType entity)
    {
        entity.Id = Interlocked.Increment(ref _nextId);
        entity.DateCreated = DateTime.UtcNow;
        _leaveTypes[entity.Id] = entity;
        return Task.FromResult(entity);
    }

    public Task UpdateAsync(LeaveType entity)
    {
        entity.DateModified = DateTime.UtcNow;
        _leaveTypes[entity.Id] = entity;
        return Task.CompletedTask;
    }

    public Task DeleteAsync(int id)
    {
        _leaveTypes.TryRemove(id, out _);
        return Task.CompletedTask;
    }

    public Task<bool> IsLeaveTypeNameUniqueAsync(string name, int? excludeId = null)
    {
        var exists = _leaveTypes.Values.Any(lt =>
            lt.Name.Equals(name, StringComparison.OrdinalIgnoreCase) &&
            (!excludeId.HasValue || lt.Id != excludeId.Value));
        return Task.FromResult(!exists);
    }
}
