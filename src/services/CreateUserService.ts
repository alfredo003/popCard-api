import { UserRepository } from "../repositories/UserRespository";

interface IRequest
{
    name:string;
    email:string;
    password:string
}
class CreateUserService {
  constructor(private userRepository: UserRepository) {}
  execute({name,email,password}:IRequest):void {
     this.userRepository.create({name,email,password});
  }
}

export { CreateUserService };
