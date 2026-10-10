using LeaveManagementSystem.Api.Configuration;
using LeaveManagementSystem.Api.Middleware;
using LeaveManagementSystem.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Load and bind strongly typed configuration sections
var apiSettings = builder.Configuration.GetSection(ApiSettings.SectionName).Get<ApiSettings>() ?? new ApiSettings();
var corsSettings = builder.Configuration.GetSection(CorsSettings.SectionName).Get<CorsSettings>() ?? new CorsSettings();

builder.Services.Configure<ApiSettings>(builder.Configuration.GetSection(ApiSettings.SectionName));
builder.Services.Configure<CorsSettings>(builder.Configuration.GetSection(CorsSettings.SectionName));

// Add controllers & OpenAPI documentation
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Register Clean Architecture Infrastructure Services
builder.Services.AddInfrastructureServices(builder.Configuration);

// Configure CORS using appsettings configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsSettings.PolicyName, policy =>
    {
        if (corsSettings.AllowedOrigins.Length > 0)
        {
            policy.WithOrigins(corsSettings.AllowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
        else
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
});

var app = builder.Build();

// Global Exception Handler Middleware
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

// Configure HTTP pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(corsSettings.PolicyName);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
