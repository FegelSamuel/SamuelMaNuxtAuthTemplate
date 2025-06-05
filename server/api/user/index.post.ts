import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

// CREATE a user; No params needed

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const prisma = event.context.prisma;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email
      },
    });

    if(existingUser){
      setResponseStatus(event, 400)
      return {
        error: "User with this email already exists",
      };
    }


    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        firstname: body.firstname,
        lastname: body.lastname,
        role: body.role,
        phoneNum: body.phoneNum || null,
        profilePic: body.profilePic || null,
        GlobalNotif: body.GlobalNotif || false,
      },
    });

    setResponseStatus(event, 200)
    return {    // manual setting resposne status is removed because I can just check if { response } of a useFetch
      data: newUser,
    };
  } catch (error) {
    setResponseStatus(event, 500)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      error: `Error creating user: ${errorMessage}`,
    };
  }
});