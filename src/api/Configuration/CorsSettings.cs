namespace LeaveManagementSystem.Api.Configuration;

public class CorsSettings
{
    public const string SectionName = "CorsSettings";

    public string PolicyName { get; set; } = "DefaultCorsPolicy";
    public string[] AllowedOrigins { get; set; } = [];
}
