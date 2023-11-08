import { Router, Request, Response } from 'express';
import { signUpUser } from '../controller/user-controllers/user-signup';
import { loginUser } from '../controller/user-controllers/user-login';





const router = Router();
// GET - users
router.post('/create', signUpUser);
router.post('/login', loginUser);

// GET - users/:id
// router.get('/:id', async (req: Request, res: Response) => {
//   // TO DO
//   const result : string = '';
//   res.status(200).json({ user: result });
// });
// // POST - users
// router.post('/', async (req: Request, res: Response) => {
//   // TO DO
//   res.status(201).json({ user: {} });
// });
export default router;