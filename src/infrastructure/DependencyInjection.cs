using LeaveManagementSystem.Application.Contracts.Persistence;
using LeaveManagementSystem.Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LeaveManagementSystem.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddSingleton<ILeaveTypeRepository, InMemoryLeaveTypeRepository>();
        services.AddSingleton<ILeaveRequestRepository, InMemoryLeaveRequestRepository>();

        return services;
    }
}
