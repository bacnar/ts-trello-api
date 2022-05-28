import Prisma from '../../utils/prismaClient'
import { Request, Response, NextFunction } from 'express'
import BaseController from '../base.controller'
import CardCreateRequest from '../../interfaces/cards/cardCreateRequest'
import CardUpdateRequest from '../../interfaces/cards/cardUpdateRequest'
import CardGetResponse from '../../interfaces/cards/cardGetResponse'
import ActionGetResponse from '../../interfaces/cards/actions/actionGetResponse'

export default class CardController extends BaseController {
  async create (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.idList) {
        return super.fail(res, 'List ID is missing in query')
      }

      const data: CardCreateRequest = {
        idList: parseInt(req.query.idList as string),
        name: req.query.name?.toString(),
        desc: req.query.desc?.toString()
      }

      await Prisma.card.create({
        data: data
      })

      return super.ok(res)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction) {
    try {
      await Prisma.card.delete({
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
      const data: CardUpdateRequest = {
        idList: req.query.idList === undefined ? undefined : parseInt(req.query.idList as string),
        name: req.query.name?.toString(),
        desc: req.query.desc?.toString(),
        closed: req.query.closed?.toString() === 'true'
      }

      await Prisma.card.update({
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
      const data = await Prisma.card.findFirst({
        where: {
          id: parseInt(req.params.id)
        }
      })

      if (data === null) {
        return super.notFound(res, "Card wasn't found")
      }

      return super.ok<CardGetResponse>(res, data as CardGetResponse)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }

  async getActionsOnCard (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Prisma.action.findMany({
        where: {
          idCard: parseInt(req.params.id)
        }
      })

      return super.ok<ActionGetResponse[]>(res, data.map((action) => {
        return {
          id: action.id,
          type: action.type,
          data: {
            text: action.text
          }
        } as ActionGetResponse
      }))
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }
}
