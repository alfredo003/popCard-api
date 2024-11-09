import { User } from "../model/User";

interface IUserDTO {
  name: string;
  email: string;
  password:string;
}
class UserRepository {
  private users: User[];
  constructor() {
    this.users = [];
  }

  create({name,email,password}:IUserDTO):User {
    const user = new User();
    Object.assign(user,{
        name,
        email,
        password
    });
    this.users.push(user);
    return user;
  }
  findAll():User[]
  {
    return this.users;
  }
}

export { UserRepository };
