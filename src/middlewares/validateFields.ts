import { ValidationChain, validationResult } from 'express-validator';
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const validateFields =
  (handler: NextApiHandler, validationRules: ValidationChain[]) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    // Run the validation rules
    await Promise.all(validationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.mapped(),
      });
    }

    return handler(req, res);
  };

export default validateFields;
