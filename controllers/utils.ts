import { DataResponse } from '@/types/responses';

function createDataResponse<T>(data: T): DataResponse<T> {
  return { data };
}

export { createDataResponse };
