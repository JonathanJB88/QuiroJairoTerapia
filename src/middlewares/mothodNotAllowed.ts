import { NextApiRequest, NextApiResponse } from 'next';

export const methodNotAllowed = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Allow', 'POST');
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
