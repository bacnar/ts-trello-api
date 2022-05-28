'use strict'
import express from 'express'
import { CommentController } from '../../../../controllers'

/**
 * @swagger
 *  /1/cards/{id}/actions/comments:
 *    post:
 *      description: Create comment
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Card id
 *          type: number
 *        - name: text
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
 *          description: Comment created
 * @swagger
 *  /1/cards/{id}/actions/{idAction}/comments:
 *    put:
 *      description: Update comment
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Card id
 *          type: number
 *        - name: idAction
 *          in: path
 *          required: true
 *          description: Action id
 *          type: number
 *        - name: text
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
 *          description: Comment updated
 *
 *    delete:
 *      description: Delete comment
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Card id
 *          type: number
 *        - name: idAction
 *          in: path
 *          required: true
 *          description: Action id
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
 *          description: Comment deleted
 */

const router = express.Router({ mergeParams: true })

router.post('/', CommentController.create)
router.put('/', CommentController.update)
router.delete('/', CommentController.delete)

export default router
