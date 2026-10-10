namespace LeaveManagementSystem.Api.Configuration;

public class ApiSettings
{
    public const string SectionName = "ApiSettings";

    public string Title { get; set; } = "Leave Management API";
    public string Version { get; set; } = "v1.0";
    public string Description { get; set; } = string.Empty;
}
