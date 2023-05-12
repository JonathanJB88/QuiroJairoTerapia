import type { NextApiRequest, NextApiResponse } from 'next';
import { check } from 'express-validator';
import { updateComment } from '@/controllers';
import { validateFields, validateJWT, withDbConnection, methodNotAllowed } from '@/middlewares';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    return updateComment(req, res);
  }
  return methodNotAllowed(req, res);
};

const validationMiddleware = [check('commentId', 'commentId is required').not().isEmpty()];

export default withDbConnection(validateJWT(validateFields(handler, validationMiddleware)));
