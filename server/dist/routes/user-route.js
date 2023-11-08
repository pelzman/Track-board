"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_signup_1 = require("../controller/user-controllers/user-signup");
const user_login_1 = require("../controller/user-controllers/user-login");
const router = (0, express_1.Router)();
// GET - users
router.post('/create', user_signup_1.signUpUser);
router.post('/login', user_login_1.loginUser);
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
exports.default = router;
