import { Router } from "express";
import { UserRepository } from "../repositories/UserRespository";
import { CreateUserService } from "../services/CreateUserService";

const authRouter = Router();

const userRepository = new UserRepository();

authRouter.post("/sign-up", (req, res) => {
 const { name, email, password } = req.body;

 const createUserService = new CreateUserService(userRepository);

 createUserService.execute({name,email,password});

 return res.status(201).send();
});


export { authRouter };
