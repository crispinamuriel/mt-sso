import { Request, Response, NextFunction } from 'express';

import { getUserFromLogin, generateToken } from '../middleware/user-auth';
import { LoginRequest } from '../types';

export const jwtLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let { username, password }: LoginRequest = req.body;
    let { user, errorMessage } = await getUserFromLogin(username, password);
    if (user === null) {
      // send error
      res.json({
        user,
        message: errorMessage,
      });
      return;
    }

    let token = await generateToken(user);
    res.json({
      user,
      mtToken: token,
    });
    return;
  } catch (err) {
    next(err);
  }
};
