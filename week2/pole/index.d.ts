import { User } from "./src/routes/user.route";

// declare global {
//   namespace Express {
//     interface Request {
//       user: User;
//     }
//   }
// }

 namespace Express {
    interface Request {
      user: User;
    }
  }