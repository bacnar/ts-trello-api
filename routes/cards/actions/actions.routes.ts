'use strict'
import express from 'express'
import commentsRouter from './comments/comments.routes'
import { CardController } from '../../../controllers'

/**
 * @swagger
 *  /1/cards/{id}/actions/:
 *    get:
 *      description: Get actions on card
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: Card id
 *          in: path
 *          required: true
 *          type: number
 *        - name: token
 *          in: query
 *          required: true
 *          type: string
 *        - name: key
 *          in: query
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Get actions
 */

const router = express.Router({ mergeParams: true })

router.get('/', CardController.getActionsOnCard)

router.use('/comments', commentsRouter)
router.use('/:idAction(\\d+)/comments', commentsRouter)

export default router
