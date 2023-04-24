import type { NextApiResponse, NextApiHandler, NextApiRequest } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { errorResponse } from '@/helpers';
import { CustomNextApiRequest } from '@/interfaces';

export const validateJWT = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers['x-token'] as string;

  if (!token) {
    return errorResponse(res, 401, 'No token provided');
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_JWT_SEED || '') as JwtPayload & {
      uid: string;
      name: string;
    };

    (req as CustomNextApiRequest).uid = uid;
    (req as CustomNextApiRequest).name = name;
  } catch (error) {
    console.log('Error validating token', error);
    return errorResponse(res, 401, 'Invalid token');
  }

  return handler(req, res);
};
