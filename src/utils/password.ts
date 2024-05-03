import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const generateHashedPassword = (password: string) => {
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

export const verifyPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
