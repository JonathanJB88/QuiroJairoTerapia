import type { NextApiRequest, NextApiResponse } from 'next';
import { check } from 'express-validator';
import { likeComment } from '@/controllers';
import { validateFields, validateJWT, withDbConnection, methodNotAllowed } from '@/middlewares';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') return likeComment(req, res);
  return methodNotAllowed(req, res);
};

const validationMiddleware = [check('commentId', 'El id del comentario es obligatorio').not().isEmpty()];

export default withDbConnection(validateJWT(validateFields(handler, validationMiddleware)));
