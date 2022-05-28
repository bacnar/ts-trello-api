import Prisma from '../../utils/prismaClient'
import { Request, Response, NextFunction } from 'express'
import BaseController from '../base.controller'
import ListCreateRequest from '../../interfaces/lists/listCreateRequest'
import ListUpdateRequest from '../../interfaces/lists/listUpdateRequest'
import ListGetResponse from '../../interfaces/lists/listGetResponse'
import CardGetResponse from '../../interfaces/cards/cardGetResponse'

export default class ListController extends BaseController {
  async create (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.name) {
        return super.fail(res, 'Field name is missing in query')
      }

      // Because there are two routes to this endpoint
      if (!req.query.idBoard && !req.params.id) {
        return super.fail(res, 'Field idBoard is missing in query')
      }

      const data: ListCreateRequest = {
        name: req.query.name.toString(),
        idBoard: req.query.idBoard === undefined ? parseInt(req.params.id) : parseInt(req.query.idBoard as string)
      }

      await Prisma.list.create({
        data: data
      })

      return super.ok(res)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }

  async update (req: Request, res: Response, next: NextFunction) {
    try {
      const data: ListUpdateRequest = {
        name: req.query.name?.toString(),
        idBoard: req.query.idBoard === undefined ? undefined : parseInt(req.query.idBoard as string),
        closed: req.query.closed?.toString() === 'true'
      }

      await Prisma.list.update({
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
      const data = await Prisma.list.findFirst({
        where: {
          id: parseInt(req.params.id)
        }
      })

      if (data === null) {
        return super.notFound(res, "List wasn't found")
      }

      return super.ok<ListGetResponse>(res, data as ListGetResponse)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }

  async getCardsOnList (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Prisma.card.findMany({
        where: {
          idList: parseInt(req.params.id)
        }
      })

      return super.ok<CardGetResponse[]>(res, data)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }
}
