import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { LeaveRequest, LeaveType } from '../types/leave';
import { leaveService } from '../services/leaveService';
import { leaveTypeService } from '../services/leaveTypeService';

export const LEAVE_QUERY_KEYS = {
  allRequests: ['leaveRequests'] as const,
  allTypes: ['leaveTypes'] as const,
};

export function useLeaveRequests() {
  return useQuery<LeaveRequest[]>({
    queryKey: LEAVE_QUERY_KEYS.allRequests,
    queryFn: () => leaveService.getAll(),
  });
}

export function useLeaveTypes() {
  return useQuery<LeaveType[]>({
    queryKey: LEAVE_QUERY_KEYS.allTypes,
    queryFn: () => leaveTypeService.getAll(),
  });
}

export function useCreateLeaveRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRequest: Omit<LeaveRequest, 'id'>) => leaveService.create(newRequest),
    onSuccess: (createdRequest) => {
      queryClient.setQueryData<LeaveRequest[]>(LEAVE_QUERY_KEYS.allRequests, (old = []) => [
        createdRequest,
        ...old,
      ]);
      queryClient.invalidateQueries({ queryKey: LEAVE_QUERY_KEYS.allRequests });
    },
  });
}
