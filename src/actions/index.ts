"use server";

import { db } from "@/server/db";
import { getUserSession } from "@/server/lib/auth";

// get user details
export const getUser = async () => {
  const session = await getUserSession();
  return await db.user.findFirst({ where: { email: session?.email! } });
};

// update user details
export const updateUser = async (values: any) => {
  const session = await getUserSession();
  return await db.user.update({
    where: { id: session?.id },
    data: {
      name: values.name,
      title: values.title,
    },
  });
};
