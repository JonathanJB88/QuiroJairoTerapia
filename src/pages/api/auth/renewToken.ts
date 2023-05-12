import type { NextApiResponse, NextApiRequest } from 'next';
import { revalidateToken } from '@/controllers';
import { validateJWT, withDbConnection, methodNotAllowed } from '@/middlewares';
import { CustomNextApiRequest } from '@/interfaces';

const handlerWrapper = (req: NextApiRequest, res: NextApiResponse) => {
  return revalidateToken(req as CustomNextApiRequest, res);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return handlerWrapper(req, res);
  }
  return methodNotAllowed(req, res);
};

export default withDbConnection(validateJWT(handler));
