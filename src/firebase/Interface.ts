import {
  CreateUserWithEmailAndPassword,
  SignInWithEmailAndPassword,
  SignOut,
  AuthStateListener,
  GetCurrentUser,
  SendEmailVerification,
  SendPasswordResetEmail,
} from "./FirebaseService";

interface IFirebaseService {
  CreateUserWithEmailAndPassword(
    email: string,
    password: string,
    displayName: string
  ): Promise<any>;
  SignInWithEmailAndPassword(email: string, password: string): Promise<any>;
  SignOut(): Promise<any>;
  AuthStateListener(): Promise<any>;
  GetCurrentUser(): any;
  SendEmailVerification(email: string, password: string): Promise<any>;
  SendPasswordResetEmail(email: string): Promise<any>;
}

const firebaseService: IFirebaseService = {
  CreateUserWithEmailAndPassword,
  SignInWithEmailAndPassword,
  SignOut,
  AuthStateListener,
  GetCurrentUser,
  SendEmailVerification,
  SendPasswordResetEmail,
};

export default firebaseService;
