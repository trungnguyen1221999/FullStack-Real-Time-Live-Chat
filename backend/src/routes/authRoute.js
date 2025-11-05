import {Router} from 'express';
import { Signin, Signout, Signup , refreshToken} from '../controller/authController.js';

const router = Router();


router.post("/signup", Signup);

router.post("/signin", Signin);
router.post("/signout", Signout);
router.post("/refresh", refreshToken)
export default router;