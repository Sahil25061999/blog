import jwt from "jsonwebtoken";

export const generateToken = (payload: string | object | Buffer) => {
  return jwt.sign(payload, Bun.env.JWT_SECRET as string);
};

export const verifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, Bun.env.JWT_SECRET as string);
    
    return data;
  } catch (e) {
    throw e;
  }
};
