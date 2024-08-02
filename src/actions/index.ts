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

type LinkProps = {
  id: string;
  name: string;
  url: string;
};

// add link
export const addLink = async (newLink: LinkProps) => {
  const session = await getUserSession();
  const u = await db.user.findFirst({
    where: { id: session?.id },
    select: { links: true },
  });
  const updatedLink = await db.user.update({
    where: { id: session?.id },
    data: { links: [...u?.links, newLink] },
  });
  return updatedLink;
};
