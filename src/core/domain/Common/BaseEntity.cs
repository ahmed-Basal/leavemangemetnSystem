namespace LeaveManagementSystem.Domain.Common;

public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    public string? CreatedBy { get; set; }
    public DateTime? DateModified { get; set; }
    public string? ModifiedBy { get; set; }
}
