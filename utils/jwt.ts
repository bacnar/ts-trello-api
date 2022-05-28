import jwt from 'jsonwebtoken'
import Session from '../interfaces/session/session'

const secret: string = process.env.JWT_SECRET || 'testKey'

const generateAccessToken = (session: Session) => {
  return jwt.sign(session, secret, { expiresIn: '1d' })
}

const checkToken = (token: string) => {
  const payload = jwt.verify(token, secret) as Session
  return payload
}

export {
  generateAccessToken,
  checkToken
}
