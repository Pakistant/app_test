import { User } from '../../../src/types/auth';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
