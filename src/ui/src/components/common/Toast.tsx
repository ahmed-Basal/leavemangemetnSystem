import { useLeaveStore } from '../../store/useLeaveStore';

export function Toast() {
  const notification = useLeaveStore((state) => state.notification);

  if (!notification) return null;

  return (
    <div className="toast-notification">
      <span>✓ {notification}</span>
    </div>
  );
}
