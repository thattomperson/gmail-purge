// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(req, res) {
  const token = await getToken({ req, secret })
  if (token) {
    // Signed in
    const results = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/labels?access_token=${token.accessToken}`
    )
    const { labels } = await results.json()
    res.status(200).json(labels)
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
