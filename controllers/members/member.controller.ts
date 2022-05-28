import Prisma from '../../utils/prismaClient'
import { Request, Response, NextFunction } from 'express'
import BaseController from '../base.controller'
import MemberUpdateRequest from '../../interfaces/members/memberUpdateRequest'
import MemberGetResponse from '../../interfaces/members/memberGetResponse'

export default class MemberController extends BaseController {
  async update (req: Request, res: Response, next: NextFunction) {
    try {
      const data: MemberUpdateRequest = {
        fullName: req.query.fullName?.toString(),
        username: req.query.username?.toString()
      }

      await Prisma.member.update({
        where: {
          id: parseInt(req.params.id)
        },
        data: data
      })

      return super.ok(res)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }

  async get (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Prisma.member.findFirst({
        where: {
          id: parseInt(req.params.id)
        },
        include: {
          boards: {
            select: {
              id: true
            }
          }
        }
      })

      if (data === null) {
        return super.notFound(res, "Member wasn't found")
      }

      return super.ok<MemberGetResponse>(res, {
        id: data.id,
        fullName: data.fullName,
        username: data.username,
        idBoards: data.boards.map(board => board.id)
      })
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }
}
