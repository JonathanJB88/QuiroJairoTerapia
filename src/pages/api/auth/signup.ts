import type { NextApiRequest, NextApiResponse } from 'next';
import { check } from 'express-validator';
import { createUser } from '@/controllers';
import { validateFields, withDbConnection } from '@/middlewares';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return createUser(req, res);
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const validationMiddleware = [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'La constraseña debe ser de 6 carácteres').isLength({
    min: 6,
  }),
];

export default withDbConnection(validateFields(handler, validationMiddleware));
