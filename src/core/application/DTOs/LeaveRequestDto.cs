namespace LeaveManagementSystem.Application.DTOs;

public class LeaveRequestDto
{
    public int Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int LeaveTypeId { get; set; }
    public LeaveTypeDto? LeaveType { get; set; }
    public DateTime DateRequested { get; set; }
    public string? RequestComments { get; set; }
    public bool? Approved { get; set; }
    public bool Cancelled { get; set; }
    public string RequestingEmployeeId { get; set; } = string.Empty;
}

public class CreateLeaveRequestDto
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int LeaveTypeId { get; set; }
    public string? RequestComments { get; set; }
    public string RequestingEmployeeId { get; set; } = string.Empty;
}

public class UpdateLeaveRequestStatusDto
{
    public bool? Approved { get; set; }
    public bool Cancelled { get; set; }
}
