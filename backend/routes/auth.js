import Router from "express";
import {
  RegisterUser,
  LoginUser,
  ResetPassword,
  RequestPasswordReset
} from "../controllers/auth.js";

const router = Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/reset-password", ResetPassword); 
router.post("/request-reset", RequestPasswordReset); 

export default router;