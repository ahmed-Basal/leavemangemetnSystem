export function getLeaveTypeName(typeId: number, fallbackName?: string): string {
  if (fallbackName) {
    return fallbackName;
  }

  switch (typeId) {
    case 1:
      return 'Annual Leave';
    case 2:
      return 'Sick Leave';
    case 3:
      return 'Casual Leave';
    case 4:
      return 'Maternity/Paternity';
    default:
      return 'Other';
  }
}
