'use strict'
import express from 'express'
import { AuthController } from '../../controllers'

const router = express.Router()

/**
 * @swagger
 *  /1/auth/register:
 *    post:
 *      description: Register
 *      consumes:
 *      - application/json
 *      requestBody:
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *                - appName
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *                appName:
 *                  type: string
 *                fullName:
 *                  type: string
 *      responses:
 *        200:
 *          description: login
 * @swagger
 *  /1/auth/login:
 *    post:
 *      description: Login
 *      consumes:
 *      - application/json
 *      requestBody:
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        200:
 *          description: login
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  username:
 *                    type: string
 *                  appName:
 *                    type: string
 *                  apiKey:
 *                    type: string
 *                  token:
 *                    type: string
*/
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

export default router
