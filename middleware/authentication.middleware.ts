import { Request, Response, NextFunction } from 'express'
import { checkToken } from '../utils/jwt'

const authentication = (req: Request, res: Response, next: NextFunction) => {
  let token = ''
  let apiKey = ''

  if (req.query.key && req.query.token) {
    token = req.query.token.toString()
    apiKey = req.query.key.toString()
  } else if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization.split(' ').map(v => v.trim())

    apiKey = (/oauth_consumer_key="(.+)",/.exec(authorization.find(key => /oauth_consumer_key=".+",/.test(key)) || 'none') as string[])[1]
    token = (/oauth_token="(.+)"/.exec(authorization.find(key => /oauth_token=".+"/.test(key)) || 'none') as string[])[1]
  } else if (req.body.key && req.body.token) {
    token = req.body.key
    apiKey = req.body.token
  }

  try {
    const session = checkToken(token)
    if (session !== null && session.apiKey === apiKey) {
      res.locals.userId = session.userId
      return next()
    } else {
      return res.status(403).json({
        error: 'Error with token, please login again'
      })
    }
  } catch (exception) {
    return res.status(403).json(exception)
  }
}

export default authentication
