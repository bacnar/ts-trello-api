import Prisma from '../../utils/prismaClient'
import { Request, Response, NextFunction } from 'express'
import BaseController from '../base.controller'
import BoardUpdateRequest from '../../interfaces/boards/boardUpdateRequest'
import BoardCreateRequest from '../../interfaces/boards/boardCreateRequest'
import BoardGetResponse from '../../interfaces/boards/boardGetResponse'
import ListGetResponse from '../../interfaces/lists/listGetResponse'

export default class BoardController extends BaseController {
  async create (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.name) {
        return super.fail(res, 'Field name is missing in query')
      }

      const data: BoardCreateRequest = {
        idMember: res.locals.userId,
        name: req.query.name.toString(),
        desc: req.query.desc?.toString(),
        defaultLists: req.query.defaultList?.toString() === 'true'
      }

      await Prisma.board.create({
        data: data
      })

      return super.ok(res)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction) {
    try {
      await Prisma.board.delete({
        where: {
          id: parseInt(req.params.id)
        }
      })

      return super.ok(res)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }

  async update (req: Request, res: Response, next: NextFunction) {
    try {
      const data: BoardUpdateRequest = {
        name: req.query.name?.toString(),
        desc: req.query.desc?.toString(),
        closed: req.query.closed?.toString() === 'true'
      }

      await Prisma.board.update({
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
      const data = await Prisma.board.findFirst({
        where: {
          id: parseInt(req.params.id)
        }
      })

      if (data === null) {
        return super.notFound(res, "Board wasn't found")
      }

      return super.ok<BoardGetResponse>(res, data as BoardGetResponse)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }

  async getListsOnBoard (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Prisma.list.findMany({
        where: {
          idBoard: parseInt(req.params.id)
        }
      })

      return super.ok<ListGetResponse[]>(res, data)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }
}
