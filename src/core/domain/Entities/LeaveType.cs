using LeaveManagementSystem.Domain.Common;

namespace LeaveManagementSystem.Domain.Entities;

public class LeaveType : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int DefaultDays { get; set; }
    public string? Description { get; set; }
}
