using LeaveManagementSystem.Domain.Entities;
using LeaveManagementSystem.Infrastructure.Repositories;
using Xunit;

namespace LeaveManagementSystem.Tests;

public class LeaveRequestRepositoryTests
{
    [Fact]
    public async Task GetAllAsync_ShouldReturnInitialSeedData()
    {
        // Arrange
        var repository = new InMemoryLeaveRequestRepository();

        // Act
        var result = await repository.GetAllAsync();

        // Assert
        Assert.NotEmpty(result);
        Assert.Contains(result, r => r.RequestingEmployeeId == "EMP-001");
    }

    [Fact]
    public async Task AddAsync_ShouldAddNewLeaveRequest()
    {
        // Arrange
        var repository = new InMemoryLeaveRequestRepository();
        var newRequest = new LeaveRequest
        {
            RequestingEmployeeId = "EMP-002",
            LeaveTypeId = 2,
            StartDate = DateTime.UtcNow.AddDays(14),
            EndDate = DateTime.UtcNow.AddDays(16),
            RequestComments = "Personal leave",
            DateRequested = DateTime.UtcNow,
            Approved = null,
            Cancelled = false
        };

        // Act
        var created = await repository.AddAsync(newRequest);
        var retrieved = await repository.GetByIdAsync(created.Id);

        // Assert
        Assert.NotNull(retrieved);
        Assert.Equal("EMP-002", retrieved.RequestingEmployeeId);
        Assert.Null(retrieved.Approved);
        Assert.False(retrieved.Cancelled);
    }
}
