import { NextApiHandler } from 'next';
import { dbConnection } from '@/database';

export const withDbConnection = (handler: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    await dbConnection();
    return handler(req, res);
  };
};
