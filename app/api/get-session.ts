// pages/api/get-session.ts

import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  console.log(session);

  if (session) {
    res.status(200).json({ accessToken: session });
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
}
