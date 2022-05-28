'use strict'
import express from 'express'
import { BoardController, ListController } from '../../controllers'
import cacheWithRedis from '../../middleware/cache.middleware'

/**
 * @swagger
 *  /1/boards/{id}/lists:
 *    get:
 *      description: Get lists on board
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: Board id
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
 *          description: Get lists
 *
 *    post:
 *      description: Create list on board
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: Board id
 *          in: path
 *          required: true
 *          type: number
 *        - name: name
 *          in: query
 *          required: true
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
 *          description: List created
 * @swagger
 *  /1/boards/{id}:
 *    get:
 *      description: Get board
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: Board id
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
 *          description: Get board
 *
 *    put:
 *      description: Create list on board
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: Board id
 *          in: path
 *          required: true
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
 *          description: Update board
 *
 *    delete:
 *      description: Delete board
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: Board id
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
 *          description: Board deleted
 * @swagger
 *  /1/boards/:
 *    post:
 *      description: Create board
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: name
 *          in: query
 *          required: true
 *          type: string
 *        - name: desc
 *          in: query
 *          type: string
 *        - name: defaultLists
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
 *          description: Create board
 */

const router = express.Router()

router.get('/:id(\\d+)/lists', cacheWithRedis('5 minutes'), BoardController.getListsOnBoard)
router.post('/:id(\\d+)/lists', ListController.create)
router.get('/:id(\\d+)', cacheWithRedis('5 minutes'), BoardController.get)
router.post('/', BoardController.create)
router.put('/:id(\\d+)', BoardController.update)
router.delete('/:id(\\d+)', BoardController.delete)

export default router
