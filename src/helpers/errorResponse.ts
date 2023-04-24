import { NextApiResponse } from 'next';

export const errorResponse = (res: NextApiResponse, status: number, msg: string) =>
  res.status(status).json({ ok: false, msg });
