using LeaveManagementSystem.Application.Contracts.Persistence;
using LeaveManagementSystem.Application.DTOs;
using LeaveManagementSystem.Application.Exceptions;
using LeaveManagementSystem.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LeaveManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeaveRequestsController : ControllerBase
{
    private readonly ILeaveRequestRepository _repository;
    private readonly ILeaveTypeRepository _leaveTypeRepository;

    public LeaveRequestsController(
        ILeaveRequestRepository repository,
        ILeaveTypeRepository leaveTypeRepository)
    {
        _repository = repository;
        _leaveTypeRepository = leaveTypeRepository;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<LeaveRequestDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<LeaveRequestDto>>> GetAll()
    {
        var requests = await _repository.GetWithDetailsAsync();
        var dtos = requests.Select(MapToDto).ToList();
        return Ok(dtos);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(LeaveRequestDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<LeaveRequestDto>> GetById(int id)
    {
        var request = await _repository.GetByIdAsync(id);
        if (request == null)
        {
            throw new NotFoundException(nameof(LeaveRequest), id);
        }

        return Ok(MapToDto(request));
    }

    [HttpGet("employee/{employeeId}")]
    [ProducesResponseType(typeof(IReadOnlyList<LeaveRequestDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<LeaveRequestDto>>> GetByEmployee(string employeeId)
    {
        var requests = await _repository.GetByEmployeeIdAsync(employeeId);
        var dtos = requests.Select(MapToDto).ToList();
        return Ok(dtos);
    }

    [HttpPost]
    [ProducesResponseType(typeof(LeaveRequestDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LeaveRequestDto>> Create([FromBody] CreateLeaveRequestDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.RequestingEmployeeId))
        {
            throw new BadRequestException("Requesting Employee ID is required.");
        }

        if (dto.StartDate > dto.EndDate)
        {
            throw new BadRequestException("Start date cannot be after end date.");
        }

        var leaveType = await _leaveTypeRepository.GetByIdAsync(dto.LeaveTypeId);
        if (leaveType == null)
        {
            throw new BadRequestException($"Leave type with ID {dto.LeaveTypeId} does not exist.");
        }

        var request = new LeaveRequest
        {
            RequestingEmployeeId = dto.RequestingEmployeeId,
            LeaveTypeId = dto.LeaveTypeId,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            RequestComments = dto.RequestComments,
            DateRequested = DateTime.UtcNow,
            Approved = null,
            Cancelled = false
        };

        var created = await _repository.AddAsync(request);
        var resultDto = MapToDto(created);

        return CreatedAtAction(nameof(GetById), new { id = resultDto.Id }, resultDto);
    }

    [HttpPut("{id:int}/status")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateLeaveRequestStatusDto statusDto)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null)
        {
            throw new NotFoundException(nameof(LeaveRequest), id);
        }

        existing.Approved = statusDto.Approved;
        existing.Cancelled = statusDto.Cancelled;

        await _repository.UpdateAsync(existing);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null)
        {
            throw new NotFoundException(nameof(LeaveRequest), id);
        }

        await _repository.DeleteAsync(id);
        return NoContent();
    }

    private static LeaveRequestDto MapToDto(LeaveRequest entity)
    {
        return new LeaveRequestDto
        {
            Id = entity.Id,
            StartDate = entity.StartDate,
            EndDate = entity.EndDate,
            LeaveTypeId = entity.LeaveTypeId,
            LeaveType = entity.LeaveType != null
                ? new LeaveTypeDto
                {
                    Id = entity.LeaveType.Id,
                    Name = entity.LeaveType.Name,
                    DefaultDays = entity.LeaveType.DefaultDays,
                    Description = entity.LeaveType.Description
                }
                : null,
            DateRequested = entity.DateRequested,
            RequestComments = entity.RequestComments,
            Approved = entity.Approved,
            Cancelled = entity.Cancelled,
            RequestingEmployeeId = entity.RequestingEmployeeId
        };
    }
}
