import Prisma from '../../utils/prismaClient'
import { Request, Response, NextFunction } from 'express'
import BaseController from '../base.controller'
import crypto from 'crypto'
import { generateAccessToken } from '../../utils/jwt'
import AuthRegisterRequest from '../../interfaces/auth/authRegisterRequest'
import AuthLoginResponse from '../../interfaces/auth/authLoginResponse'
import bcrypt from 'bcrypt'
import AuthLoginRequest from '../../interfaces/auth/authLoginRequest'

export default class AuthController extends BaseController {
  async register (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.username) {
        return super.clientError(res, 'Body is missing field username')
      }

      if (!req.body.password) {
        return super.clientError(res, 'Body is missing field password')
      }

      if (!req.body.appName) {
        return super.clientError(res, 'Body is missing field appName')
      }

      const data = req.body as AuthRegisterRequest
      const userExists = await Prisma.member.findFirst({
        where: {
          username: data.username
        }
      })

      if (userExists !== null) {
        return super.conflict(res, 'User with same username exists')
      }

      const apiKey = crypto.randomBytes(20).toString('hex')
      data.password = await bcrypt.hash(data.password, 10)

      await Prisma.member.create({
        data: {
          username: data.username,
          password: data.password,
          fullName: data.fullName,
          appName: data.appName,
          apiKey: apiKey
        }
      })

      return super.ok(res)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }

  async login (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.username) {
        return super.clientError(res, 'Body is missing field username')
      }

      if (!req.body.password) {
        return super.clientError(res, 'Body is missing field password')
      }

      const data = req.body as AuthLoginRequest

      const user = await Prisma.member.findFirst({
        where: {
          username: data.username
        }
      })

      if (user === null) {
        return super.unauthorized(res, 'Wrong username or password')
      }

      if (!(await bcrypt.compare(data.password, user.password))) {
        return super.unauthorized(res, 'Wrong username or password')
      }

      const token = generateAccessToken({ userId: user.id, apiKey: user.apiKey })

      return super.ok<AuthLoginResponse>(res, {
        id: user.id,
        username: user.username,
        appName: user.appName,
        apiKey: user.apiKey,
        token: token
      })
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }
}
