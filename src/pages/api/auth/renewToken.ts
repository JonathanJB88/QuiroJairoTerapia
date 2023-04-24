import type { NextApiResponse, NextApiRequest } from 'next';
import { revalidateToken } from '@/controllers';
import { validateJWT, withDbConnection } from '@/middlewares';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return revalidateToken(req, res);
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withDbConnection(validateJWT(handler));
