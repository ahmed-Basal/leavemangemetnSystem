using System.Net;
using System.Text.Json;
using LeaveManagementSystem.Application.Exceptions;

namespace LeaveManagementSystem.Api.Middleware;

public class GlobalExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;

    public GlobalExceptionHandlerMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var statusCode = HttpStatusCode.InternalServerError;
        var errorResponse = new
        {
            StatusCode = (int)statusCode,
            Message = "An unexpected server error occurred.",
            Detail = exception.Message,
            Timestamp = DateTime.UtcNow
        };

        if (exception is NotFoundException notFound)
        {
            statusCode = HttpStatusCode.NotFound;
            errorResponse = new
            {
                StatusCode = (int)statusCode,
                Message = notFound.Message,
                Detail = "The requested resource could not be found.",
                Timestamp = DateTime.UtcNow
            };
        }
        else if (exception is BadRequestException badRequest)
        {
            statusCode = HttpStatusCode.BadRequest;
            errorResponse = new
            {
                StatusCode = (int)statusCode,
                Message = badRequest.Message,
                Detail = "Invalid request payload or parameters.",
                Timestamp = DateTime.UtcNow
            };
        }

        context.Response.StatusCode = (int)statusCode;
        var json = JsonSerializer.Serialize(errorResponse);
        return context.Response.WriteAsync(json);
    }
}
