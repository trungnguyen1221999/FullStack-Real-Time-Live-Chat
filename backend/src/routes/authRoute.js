import {Router} from 'express';
import { Signin, Signout, Signup } from '../controller/authController.js';

const router = Router();


router.post("/signup", Signup);

router.post("/signin", Signin);
router.post("/signout", Signout);
export default router;