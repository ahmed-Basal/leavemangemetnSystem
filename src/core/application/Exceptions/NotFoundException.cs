namespace LeaveManagementSystem.Application.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(string name, object key)
        : base($"{name} with key ({key}) was not found.")
    {
    }
}

public class BadRequestException : Exception
{
    public BadRequestException(string message) : base(message)
    {
    }
}
