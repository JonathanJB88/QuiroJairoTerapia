import type { NextApiRequest, NextApiResponse } from 'next';
import { check } from 'express-validator';
import { deleteComment } from '@/controllers';
import { validateFields, validateJWT, withDbConnection } from '@/middlewares';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    return deleteComment(req, res);
  } else {
    res.setHeader('Allow', 'DELETE');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const validationMiddleware = [check('commentId', 'commentId is required').not().isEmpty()];

export default withDbConnection(validateJWT(validateFields(handler, validationMiddleware)));
