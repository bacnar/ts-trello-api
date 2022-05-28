'use strict'
import express from 'express'
import { ListController } from '../../controllers'
import cacheWithRedis from '../../middleware/cache.middleware'

/**
 * @swagger
 *  /1/lists/{id}/cards:
 *    get:
 *      description: Get cards on list
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: List id
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
 *          description: Get cards
 * @swagger
 *  /1/lists/{id}:
 *    get:
 *      description: Get list
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: List id
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
 *          description: Get list
 *
 *    put:
 *      description: Update list
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: List id
 *          in: path
 *          required: true
 *          type: number
 *        - name: name
 *          in: query
 *          type: string
 *        - name: idBoard
 *          in: query
 *          type: number
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
 *          description: Get cards
 * @swagger
 *  /1/lists/:
 *    post:
 *      description: Create list
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: name
 *          in: query
 *          type: string
 *          required: true
 *        - name: idBoard
 *          in: query
 *          type: number
 *          required: true
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
 *          description: Create list
 */

const router = express.Router()

router.get('/:id(\\d+)/cards', ListController.getCardsOnList)
router.get('/:id(\\d+)', cacheWithRedis('5 minutes'), ListController.get)
router.post('/', ListController.create)
router.put('/:id(\\d+)', ListController.update)

export default router
