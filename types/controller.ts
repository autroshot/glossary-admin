import { NextApiRequest, NextApiResponse } from 'next';
import { DataResponse, ErrorResponse } from './responses';

export type Controller = (
  req: NextApiRequest,
  res: NextApiResponse<DataResponse<any> | ErrorResponse>
) =>
  | Promise<NextApiResponse<DataResponse<any> | ErrorResponse> | void>
  | NextApiResponse<DataResponse<any> | ErrorResponse>
  | void;
