import Auth from './auth/auth.controller'
import Board from './boards/board.controller'
import Card from './cards/card.controller'
import List from './lists/list.controller'
import Member from './members/member.controller'
import Comment from './cards/actions/comments/comment.controller'

const AuthController = new Auth()
const BoardController = new Board()
const CardController = new Card()
const ListController = new List()
const CommentController = new Comment()
const MemberController = new Member()

export {
  AuthController,
  BoardController,
  CardController,
  ListController,
  CommentController,
  MemberController
}
