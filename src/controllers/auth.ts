import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import User, { IUser } from '@/models/User';
import { errorResponse, generateJWT } from '@/helpers';

import { CreateUserBody, CustomNextApiRequest, LoginUserBody, RevalidateTokenRequest } from '@/interfaces';

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req.body as CreateUserBody;

  if (!name || !email || !password) {
    return errorResponse(res, 400, 'All fields (name, email, password) are required');
  }

  try {
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, 'A user with this email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: IUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = await generateJWT(newUser.id, newUser.name);

    res.status(201).json({ ok: true, uid: newUser.id, name: newUser.name, token });
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, 'Please contact the administrator');
  }
};

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body as LoginUserBody;

  if (!email || !password) {
    return errorResponse(res, 400, 'Both email and password are required');
  }

  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 400, 'There is no user with this email');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 400, 'Password is incorrect');
    }

    const token = await generateJWT(user.id, user.name);

    res.status(200).json({ ok: true, uid: user.id, name: user.name, token });
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, 'Please contact the administrator');
  }
};

const revalidateToken = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { uid, name } = req as RevalidateTokenRequest;

  if (!uid || !name) {
    return errorResponse(res, 400, 'Both uid and name are required');
  }

  const token = await generateJWT(uid, name);

  res.status(200).json({ ok: true, uid, name, token });
};

export { createUser, loginUser, revalidateToken };
