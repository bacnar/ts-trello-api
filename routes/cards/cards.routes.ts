'use strict'
import express from 'express'
import { CardController } from '../../controllers'
import cacheWithRedis from '../../middleware/cache.middleware'
import actionsRouter from './actions/actions.routes'

/**
 * @swagger
 *  /1/cards/{id}:
 *    get:
 *      description: Get card
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
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
 *          description: Get card
 *
 *    delete:
 *      description: Delete card
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
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
 *          description: Deleted
 *
 *    put:
 *      description: Update card
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          type: number
 *        - name: idList
 *          in: query
 *          type: number
 *        - name: name
 *          in: query
 *          type: string
 *        - name: desc
 *          in: query
 *          type: string
 *        - name: closed
 *          in: query
 *          type: boolean
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
 *          description: Get card
 * @swagger
 *  /1/cards/:
 *    post:
 *      description: Create card
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: idList
 *          in: query
 *          type: number
 *          required: true
 *        - name: name
 *          in: query
 *          type: string
 *        - name: desc
 *          in: query
 *          type: string
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
 *          description: Get card
 */

const router = express.Router({ mergeParams: true })

router.use('/:id(\\d+)/actions', actionsRouter)

router.get('/:id(\\d+)', cacheWithRedis('5 minutes'), CardController.get)
router.post('/', CardController.create)
router.put('/:id(\\d+)', CardController.update)
router.delete('/:id(\\d+)', CardController.delete)

export default router
