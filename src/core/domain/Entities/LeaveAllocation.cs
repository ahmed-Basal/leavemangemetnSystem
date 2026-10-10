using LeaveManagementSystem.Domain.Common;

namespace LeaveManagementSystem.Domain.Entities;

public class LeaveAllocation : BaseEntity
{
    public int NumberOfDays { get; set; }
    public string EmployeeId { get; set; } = string.Empty;
    public int Period { get; set; }
    public int LeaveTypeId { get; set; }
    public LeaveType? LeaveType { get; set; }
}
