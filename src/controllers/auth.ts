import User from '@/models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import generateJWT from '@/helpers/jwt';

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'An user with this email already exists',
      });
    }
    user = new User({ name, email });

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'There is no user with this email',
      });
    }

    // Confirm passwords
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password is incorrect',
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const revalidateToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, name } = req.body;

  // Generate JWT
  const token = await generateJWT(uid, name);

  res.status(200).json({
    ok: true,
    uid,
    name,
    token,
  });
};
