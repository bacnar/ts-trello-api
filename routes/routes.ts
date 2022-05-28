'use strict'
import authRouter from './auth/auth.routes'
import boardsRouter from './boards/boards.routes'
import cardsRouter from './cards/cards.routes'
import listsRouter from './lists/lists.routes'
import membersRouter from './members/members.routes'
import express from 'express'
import authentication from '../middleware/authentication.middleware'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/boards', authentication, boardsRouter)
router.use('/cards', authentication, cardsRouter)
router.use('/lists', authentication, listsRouter)
router.use('/members', authentication, membersRouter)

export default router
