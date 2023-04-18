import type { NextApiResponse, NextApiRequest } from 'next';
import { revalidateToken } from '@/controllers/auth';
import validateJWT from '@/middlewares/validarJwt';
import dbConnection from '@/database/dbConnect';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnection();
  if (req.method === 'GET') {
    return revalidateToken(req, res);
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default validateJWT(handler);
