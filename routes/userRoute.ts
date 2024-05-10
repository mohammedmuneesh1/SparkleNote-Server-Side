import { Router } from "express";
import { tryCatch } from "../middlewares/tryCatch";
import { checkAuth } from "../middlewares/checkAuth";
import { joiValidation } from "../middlewares/joiValidation";
import { loginJoi, registerJoi } from "../configs/validations/joiValidate";
import {userLogin, userRegistration, userVerification} from "../controllers/userController";
export const router = Router();


router.route('/login').post(joiValidation(loginJoi),tryCatch(userLogin))
router.route("/registration").post(joiValidation(registerJoi),tryCatch(userRegistration))
router.route('/:userId/verify/:token').put(tryCatch(userVerification))
