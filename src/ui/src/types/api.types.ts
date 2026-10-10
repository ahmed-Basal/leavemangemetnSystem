/**
 * Standard API error structure matching backend GlobalExceptionHandlerMiddleware.
 */
export interface IApiError {
  statusCode: number;
  message: string;
  detail?: string;
  timestamp: string;
}

/**
 * Generic wrapper for API responses.
 */
export interface IApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/**
 * Filter and pagination query parameters.
 */
export interface IPaginationParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
}
