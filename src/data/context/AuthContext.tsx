import { createContext, useState } from "react";
import { Profile as ProfileModel } from "../models/Profile";

interface AuthContextProps {
  profile: ProfileModel | null;
  updateProfile: (newProfile: ProfileModel | null) => void;
  token: string;
  updateToken: (newToken: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  profile: null,
  updateProfile: () => {},
  token: "",
  updateToken: (newToken: string) => {},
});

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

export function AuthProvider(props: AuthProviderProps) {
  const [profile, setProfile] = useState<ProfileModel | null>(null);
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider
      value={{
        profile,
        updateProfile: (newProfile: ProfileModel | null) =>
          setProfile(newProfile),
        token,
        updateToken: (newToken: string) => setToken(newToken),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
