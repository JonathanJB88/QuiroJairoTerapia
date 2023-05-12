import type { NextApiRequest, NextApiResponse } from 'next';
import { check } from 'express-validator';
import { createComment } from '@/controllers';
import { validateFields, validateJWT, withDbConnection, methodNotAllowed } from '@/middlewares';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return createComment(req, res);
  }
  return methodNotAllowed(req, res);
};

const validationMiddleware = [
  check('userId', 'userId is required').not().isEmpty(),
  check('content', 'Content is required').not().isEmpty(),
  check('rating', 'Rating is required and must be between 1 and 5').isInt({ min: 1, max: 5 }),
  check('type', 'Type is required and must be either review or comment').isIn(['review', 'comment']),
  check('postId')
    .if((value, { req }) => req.body?.type === 'comment')
    .not()
    .isEmpty()
    .withMessage('postId is required when type is comment'),
];

export default withDbConnection(validateJWT(validateFields(handler, validationMiddleware)));
