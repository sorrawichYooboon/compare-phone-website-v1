import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import firebaseService from "@/firebase/Interface";

const AuthenticationContext = createContext<{
  user: any;
  handleUserLogout: () => void;
  handleUserLogin: (email: string, password: string) => void;
  handleUserRegister: (
    email: string,
    password: string,
    displayName: string
  ) => void;
  handleResendVerificationEmail?: (email: string, password: string) => void;
  handleResetPassword?: (email: string) => void;
}>({
  user: null,
  handleUserLogout: () => {},
  handleUserLogin: (email: string, password: string) => {},
  handleUserRegister: (
    email: string,
    password: string,
    displayName: string
  ) => {},
  handleResendVerificationEmail: (email: string, password: string) => {},
  handleResetPassword: (email: string) => {},
});

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = firebaseService.AuthStateListener().then((user) => {
      setUser(user);
    });

    if (user) {
      if (!user?.emailVerified) {
        handleUserLogout();
      }
    }

    return () => {
      unsubscribe.then(() => setUser(null));
    };
  }, [user]);

  const handleUserLogout = async () => {
    await firebaseService.SignOut();
    setUser(null);
  };

  const handleUserLogin = async (email: string, password: string) => {
    const response = await firebaseService.SignInWithEmailAndPassword(
      email,
      password
    );

    const user = response?.user;
    if (!user?.emailVerified) {
      await firebaseService.SignOut();
      throw new Error("email-not-verified");
    }
    setUser(response?.user);
    return response?.user;
  };

  const handleUserRegister = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    await firebaseService.CreateUserWithEmailAndPassword(
      email,
      password,
      displayName
    );
  };

  const handleResendVerificationEmail = async (
    email: string,
    password: string
  ) => {
    await firebaseService.SendEmailVerification(email, password);
  };

  const handleResetPassword = async (email: string) => {
    await firebaseService.SendPasswordResetEmail(email);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        handleUserLogout,
        handleUserLogin,
        handleUserRegister,
        handleResendVerificationEmail,
        handleResetPassword,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthentication = () => useContext(AuthenticationContext);
