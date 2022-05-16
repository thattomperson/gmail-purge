// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fetcher = (...args) => fetch(...args).then(res => res.json())
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(req, res) {
  const token = await getToken({ req, secret })

  if (token) {
    // Signed in
    const { messages } = await fetcher(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=500&labelIds=${req.query.id}&access_token=${token.accessToken}`
    )

    const ids = messages.map(message => message.id)

    const result = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/batchDelete?access_token=${token.accessToken}`, {
      method: 'POST',
      body: JSON.stringify({ ids })
    })

    if (result.ok) {
      const label = await fetcher(
        `https://gmail.googleapis.com/gmail/v1/users/me/labels/${req.query.id}?access_token=${token.accessToken}`
      )

      res.status(200).json(label)
    } else {
      res.status(500)
    }
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
