import { v4 as uuidv4 } from "uuid";
class Wallet {
  id?: string;
  user: number;
  balance: number;
  status: string;
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidv4();
    this.created_at = new Date();
  }
}
export { Wallet };
