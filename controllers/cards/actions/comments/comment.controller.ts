import Prisma from '../../../../utils/prismaClient'
import { Request, Response, NextFunction } from 'express'
import BaseController from '../../../base.controller'
import CommentCreateRequest from '../../../../interfaces/cards/actions/comments/commentCreateRequest'
import CommentUpdateRequest from '../../../../interfaces/cards/actions/comments/commentUpdateRequest'

export default class CommentController extends BaseController {
  async create (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.text) {
        return super.fail(res, 'Field text is missing in query')
      }

      const data: CommentCreateRequest = {
        idCard: parseInt(req.params.id),
        text: req.query.text.toString(),
        type: 'commentCard'
      }

      await Prisma.action.create({
        data: data
      })

      return super.ok(res)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction) {
    try {
      await Prisma.action.delete({
        where: {
          id: parseInt(req.params.idAction)
        }
      })

      return super.ok(res)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }

  async update (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.text) {
        return super.fail(res, 'Field text is missing in query')
      }

      const data: CommentUpdateRequest = {
        idCard: parseInt(req.params.id),
        text: req.query.text.toString()
      }

      await Prisma.action.update({
        where: {
          id: parseInt(req.params.idAction)
        },
        data: data
      })

      return super.ok(res)
    } catch (error: unknown) {
      return super.fail(res, error)
    }
  }
}
