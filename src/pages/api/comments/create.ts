import type { NextApiRequest, NextApiResponse } from 'next';
import { check } from 'express-validator';
import { createComment } from '@/controllers';
import { validateFields, validateJWT, withDbConnection } from '@/middlewares';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return createComment(req, res);
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const validationMiddleware = [
  check('postId', 'postId is required').not().isEmpty(),
  check('userId', 'userId is required').not().isEmpty(),
  check('content', 'Content is required').not().isEmpty(),
  check('rating', 'Rating is required and must be between 1 and 5').isInt({ min: 1, max: 5 }),
  check('type', 'Type is required and must be either review or comment').isIn(['review', 'comment']),
];

export default withDbConnection(validateJWT(validateFields(handler, validationMiddleware)));
