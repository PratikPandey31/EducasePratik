
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types/user";

interface AuthContextType {
  currentUser: User | null;
  signUp: (user: User) => void;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  updateUser: (updatedUser: User) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const signUp = (user: User) => {
    setUsers([...users, user]);
    setCurrentUser(user);
  };

  const signIn = (email: string, password: string) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setCurrentUser(null);
  };
  
  const updateUser = (updatedUser: User) => {
    // Update the current user
    setCurrentUser(updatedUser);
    
    // Update the user in the users array
    setUsers(users.map(user => 
      user.email === updatedUser.email ? updatedUser : user
    ));
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
    updateUser,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
