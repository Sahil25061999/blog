import { PrismaClient } from "@prisma/client";
import type { TSignUpValidation } from "../types";

const prisma = new PrismaClient();

export class UserRepositories {
  static async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  static async createUser(data: TSignUpValidation) {
    try{
      const user = await prisma.user.create({
        data,
        select: {
          email: true,
          username: true,
        },
      });
      return user;
    }catch(e){
      throw e
    }
    
    
  }
}
