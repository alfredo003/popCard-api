import { User } from "../model/User";

interface IUserDTO {
  name: string;
  email: string;
  password:string;
}
class UserRepository {
  private users: User[];
  private static INSTANCE:UserRepository;

  private constructor() {
    this.users = [];
  }
  public static getInstance():UserRepository
  {
      if(!this.INSTANCE)
          this.INSTANCE = new UserRepository();
        return this.INSTANCE;
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
