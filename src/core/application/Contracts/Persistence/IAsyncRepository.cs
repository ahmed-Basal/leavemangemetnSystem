using LeaveManagementSystem.Domain.Common;

namespace LeaveManagementSystem.Application.Contracts.Persistence;

public interface IAsyncRepository<T> where T : BaseEntity
{
    Task<IReadOnlyList<T>> GetAllAsync();
    Task<T?> GetByIdAsync(int id);
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
}
