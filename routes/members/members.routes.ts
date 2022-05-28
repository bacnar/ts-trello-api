'use strict'
import express from 'express'
import { MemberController } from '../../controllers'
import cacheWithRedis from '../../middleware/cache.middleware'

/**
 * @swagger
 *
 *  /1/members/{id}:
 *    get:
 *      description: Get member
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: Member id
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
 *          description: Get member
 *
 *    put:
 *      description: Get member
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: Member id
 *          in: path
 *          required: true
 *          type: number
 *        - name: fullName
 *          in: query
 *          required: true
 *          type: string
 *        - name: username
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
 *          description: Member updated
*/

const router = express.Router()

router.get('/:id(\\d+)', cacheWithRedis('5 minutes'), MemberController.get)
router.put('/:id(\\d+)', MemberController.update)

export default router
