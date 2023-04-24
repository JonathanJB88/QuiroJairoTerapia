import jwt from 'jsonwebtoken';

export const generateJWT = (uid: string, name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.NEXT_PUBLIC_SECRET_JWT_SEED || '',
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('The token could not be generated');
        } else {
          resolve(token);
        }
      }
    );
  });
};
