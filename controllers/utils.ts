import { DataResponse, ErrorResponse } from '@/types/responses';

function createDataResponse<T>(data: T): DataResponse<T> {
  return { data };
}

function createErrorResponse(message: string): ErrorResponse {
  return { message };
}

export { createDataResponse, createErrorResponse };
