using System.Collections.Concurrent;
using LeaveManagementSystem.Application.Contracts.Persistence;
using LeaveManagementSystem.Domain.Entities;

namespace LeaveManagementSystem.Infrastructure.Repositories;

public class InMemoryLeaveRequestRepository : ILeaveRequestRepository
{
    private readonly ConcurrentDictionary<int, LeaveRequest> _requests = new();
    private readonly ILeaveTypeRepository _leaveTypeRepository;
    private int _nextId = 1;

    public InMemoryLeaveRequestRepository() : this(new InMemoryLeaveTypeRepository())
    {
    }

    public InMemoryLeaveRequestRepository(ILeaveTypeRepository leaveTypeRepository)
    {
        _leaveTypeRepository = leaveTypeRepository;

        // Seed initial leave request
        var sample = new LeaveRequest
        {
            Id = _nextId++,
            RequestingEmployeeId = "EMP-001",
            LeaveTypeId = 1,
            StartDate = DateTime.UtcNow.AddDays(7),
            EndDate = DateTime.UtcNow.AddDays(10),
            DateRequested = DateTime.UtcNow,
            RequestComments = "Annual family vacation",
            Approved = null,
            Cancelled = false,
            DateCreated = DateTime.UtcNow
        };
        _requests[sample.Id] = sample;
    }

    public Task<IReadOnlyList<LeaveRequest>> GetAllAsync()
    {
        IReadOnlyList<LeaveRequest> list = _requests.Values.OrderByDescending(r => r.DateRequested).ToList();
        return Task.FromResult(list);
    }

    public Task<LeaveRequest?> GetByIdAsync(int id)
    {
        _requests.TryGetValue(id, out var request);
        return Task.FromResult(request);
    }

    public Task<IReadOnlyList<LeaveRequest>> GetByEmployeeIdAsync(string employeeId)
    {
        IReadOnlyList<LeaveRequest> list = _requests.Values
            .Where(r => string.Equals(r.RequestingEmployeeId, employeeId, StringComparison.OrdinalIgnoreCase))
            .ToList();
        return Task.FromResult(list);
    }

    public async Task<IReadOnlyList<LeaveRequest>> GetWithDetailsAsync()
    {
        var leaveTypes = (await _leaveTypeRepository.GetAllAsync()).ToDictionary(lt => lt.Id);
        var list = _requests.Values.OrderByDescending(r => r.DateRequested).ToList();

        foreach (var req in list)
        {
            if (leaveTypes.TryGetValue(req.LeaveTypeId, out var lt))
            {
                req.LeaveType = lt;
            }
        }

        return list;
    }

    public async Task<LeaveRequest> AddAsync(LeaveRequest entity)
    {
        entity.Id = Interlocked.Increment(ref _nextId);
        entity.DateCreated = DateTime.UtcNow;
        entity.DateRequested = DateTime.UtcNow;

        var leaveType = await _leaveTypeRepository.GetByIdAsync(entity.LeaveTypeId);
        entity.LeaveType = leaveType;

        _requests[entity.Id] = entity;
        return entity;
    }

    public Task UpdateAsync(LeaveRequest entity)
    {
        entity.DateModified = DateTime.UtcNow;
        _requests[entity.Id] = entity;
        return Task.CompletedTask;
    }

    public Task DeleteAsync(int id)
    {
        _requests.TryRemove(id, out _);
        return Task.CompletedTask;
    }
}
