using LeaveManagementSystem.Application.Contracts.Persistence;
using LeaveManagementSystem.Application.DTOs;
using LeaveManagementSystem.Application.Exceptions;
using LeaveManagementSystem.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LeaveManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeaveTypesController : ControllerBase
{
    private readonly ILeaveTypeRepository _leaveTypeRepository;

    public LeaveTypesController(ILeaveTypeRepository leaveTypeRepository)
    {
        _leaveTypeRepository = leaveTypeRepository;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<LeaveTypeDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<LeaveTypeDto>>> GetAll()
    {
        var leaveTypes = await _leaveTypeRepository.GetAllAsync();
        var dtos = leaveTypes.Select(lt => new LeaveTypeDto
        {
            Id = lt.Id,
            Name = lt.Name,
            DefaultDays = lt.DefaultDays,
            Description = lt.Description
        }).ToList();

        return Ok(dtos);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(LeaveTypeDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<LeaveTypeDto>> GetById(int id)
    {
        var leaveType = await _leaveTypeRepository.GetByIdAsync(id);
        if (leaveType == null)
        {
            throw new NotFoundException(nameof(LeaveType), id);
        }

        return Ok(new LeaveTypeDto
        {
            Id = leaveType.Id,
            Name = leaveType.Name,
            DefaultDays = leaveType.DefaultDays,
            Description = leaveType.Description
        });
    }

    [HttpPost]
    [ProducesResponseType(typeof(LeaveTypeDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LeaveTypeDto>> Create([FromBody] CreateLeaveTypeDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name))
        {
            throw new BadRequestException("Leave type name is required.");
        }

        var isUnique = await _leaveTypeRepository.IsLeaveTypeNameUniqueAsync(dto.Name);
        if (!isUnique)
        {
            throw new BadRequestException($"A leave type named '{dto.Name}' already exists.");
        }

        var entity = new LeaveType
        {
            Name = dto.Name,
            DefaultDays = dto.DefaultDays,
            Description = dto.Description
        };

        var created = await _leaveTypeRepository.AddAsync(entity);
        var resultDto = new LeaveTypeDto
        {
            Id = created.Id,
            Name = created.Name,
            DefaultDays = created.DefaultDays,
            Description = created.Description
        };

        return CreatedAtAction(nameof(GetById), new { id = resultDto.Id }, resultDto);
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] LeaveTypeDto dto)
    {
        var existing = await _leaveTypeRepository.GetByIdAsync(id);
        if (existing == null)
        {
            throw new NotFoundException(nameof(LeaveType), id);
        }

        existing.Name = dto.Name;
        existing.DefaultDays = dto.DefaultDays;
        existing.Description = dto.Description;

        await _leaveTypeRepository.UpdateAsync(existing);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _leaveTypeRepository.GetByIdAsync(id);
        if (existing == null)
        {
            throw new NotFoundException(nameof(LeaveType), id);
        }

        await _leaveTypeRepository.DeleteAsync(id);
        return NoContent();
    }
}
