import type { NextApiRequest, NextApiResponse } from 'next';
import { check } from 'express-validator';
import { getCommentsByTypeOrPost } from '@/controllers';
import { validateFields, withDbConnection, methodNotAllowed } from '@/middlewares';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getCommentsByTypeOrPost(req, res);
  }
  return methodNotAllowed(req, res);
};

const validationMiddleware = [
  check('type')
    .exists()
    .withMessage('Type is required')
    .isIn(['review', 'comment'])
    .withMessage('Type must be either review or comment'),
  check('postId')
    .if((value, { req }) => req.query?.type === 'comment')
    .exists()
    .withMessage('postId is required when type is comment'),
  check('custom').custom((value, { req }) => {
    if (!req.query?.postId && !req.query?.type) {
      throw new Error('Either postId or type must be provided');
    }
    return true;
  }),
];

export default withDbConnection(validateFields(handler, validationMiddleware));
