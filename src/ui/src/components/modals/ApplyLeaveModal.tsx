import type { FormEvent } from 'react';
import { useLeaveStore } from '../../store/useLeaveStore';
import { useCreateLeaveRequest, useLeaveTypes } from '../../hooks/useLeaveQueries';

export function ApplyLeaveModal() {
  const showModal = useLeaveStore((state) => state.showModal);
  const formData = useLeaveStore((state) => state.formData);
  const setShowModal = useLeaveStore((state) => state.setShowModal);
  const setNotification = useLeaveStore((state) => state.setNotification);
  const updateFormField = useLeaveStore((state) => state.updateFormField);
  const resetFormData = useLeaveStore((state) => state.resetFormData);

  const { data: leaveTypes = [], isLoading: isLoadingTypes } = useLeaveTypes();
  const createMutation = useCreateLeaveRequest();

  if (!showModal) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.requestingEmployeeId || !formData.startDate || !formData.endDate) {
      alert('Please fill out all required fields');
      return;
    }

    createMutation.mutate(
      {
        requestingEmployeeId: formData.requestingEmployeeId,
        leaveTypeId: Number(formData.leaveTypeId) || (leaveTypes[0]?.id ?? 1),
        startDate: formData.startDate,
        endDate: formData.endDate,
        requestComments: formData.requestComments,
        approved: null,
        cancelled: false,
      },
      {
        onSuccess: () => {
          setShowModal(false);
          resetFormData();
          setNotification('Leave application submitted successfully!');
          setTimeout(() => setNotification(null), 4000);
        },
        onError: () => {
          alert('Failed to submit application. Please check backend connection.');
        },
      }
    );
  };

  return (
    <div className="modal-backdrop" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Apply for Leave</h3>
          <button className="close-btn" onClick={() => setShowModal(false)}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="leave-form">
          <div className="form-group">
            <label>Requesting Employee ID</label>
            <input
              type="text"
              required
              placeholder="e.g. EMP-104"
              value={formData.requestingEmployeeId}
              onChange={(e) => updateFormField('requestingEmployeeId', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Leave Type</label>
            <select
              value={formData.leaveTypeId}
              onChange={(e) => updateFormField('leaveTypeId', Number(e.target.value))}
              disabled={isLoadingTypes}
            >
              {leaveTypes.map((lt) => (
                <option key={lt.id} value={lt.id}>
                  {lt.name} ({lt.defaultDays} days)
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => updateFormField('startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => updateFormField('endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Request Comments</label>
            <textarea
              rows={3}
              placeholder="Explain reason or notes for leave request..."
              value={formData.requestComments}
              onChange={(e) => updateFormField('requestComments', e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setShowModal(false)}
              disabled={createMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-btn"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
