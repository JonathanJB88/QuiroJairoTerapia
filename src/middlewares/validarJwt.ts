import type { NextApiResponse, NextApiHandler, NextApiRequest } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomNextApiRequest extends NextApiRequest {
  uid: string;
  name: string;
}

const validateJWT = (handler: NextApiHandler) => async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const token = req.headers['x-token'] as string;

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'There is no token in the request',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_JWT_SEED || '') as JwtPayload & {
      uid: string;
      name: string;
    };

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token is not valid',
    });
  }

  return handler(req, res);
};

export default validateJWT;
