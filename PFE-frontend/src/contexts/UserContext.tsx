import React, { createContext, useState , useEffect} from "react";
import { saveUser , deleteUser as removeFromStorage , getUser as getUserFromStorage} from "../utils/auth";
import { User } from "../models/user";


interface UserContextProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
  user?: User;
}
const UserContext = createContext<UserContextProps>({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  user: undefined,
});


const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchUserFromStorage = async () => {
      const storedUser : User | null = await getUserFromStorage();
      if (storedUser) {
        setIsAuthenticated(true);
        setIsAdmin(storedUser.is_admin ?? false);
        setUser(storedUser);
      }
    };

    fetchUserFromStorage();
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    removeFromStorage();
  };


  // login function save user in storage and set isAuthenticated to true and isAdmin to user.is_admin
  const login = async (user: User) => {
    try {
      saveUser(user); // save user in storage
      setUser(user); // set user in state
      setIsAuthenticated(true);
      setIsAdmin(user.is_admin ?? false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };



  const exposedValue: UserContextProps = {
    isAuthenticated,
    isAdmin,
    login,
    logout,
    user,
  };


  

  return (
    <UserContext.Provider value={exposedValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
