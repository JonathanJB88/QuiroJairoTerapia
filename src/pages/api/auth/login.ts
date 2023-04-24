import type { NextApiRequest, NextApiResponse } from 'next';
import { check } from 'express-validator';
import { loginUser } from '@/controllers';
import { validateFields, withDbConnection } from '@/middlewares';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return loginUser(req, res);
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const validationMiddleware = [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'La constraseña debe ser de 6 carácteres').isLength({
    min: 6,
  }),
];

export default withDbConnection(validateFields(handler, validationMiddleware));
