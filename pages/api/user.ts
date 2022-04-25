// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  if (req.method === "GET") {
    const { userId } = req.query;

    console.log(userId);

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: `${userId}`,
        },
        include: {
          selfType: true,
          typology: true,
        },
      });

      await console.log(user);

      res.status(200).json({ message: `failed to send message` });
    } catch (error) {
      res.status(500).json({ message: `failed to send message ${error}` });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
