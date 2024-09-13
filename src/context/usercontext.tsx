"use client";

import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import {nanoid} from 'nanoid';
import { useRouter } from "next/navigation";

interface UserContextProps {
  user: any[];
  
}

// Yap interface to define the structure of each yap
interface Event {
  id: string;
  avatar: string;
  course: string;
  email: string;
  
}

const defaultValue: UserContextProps = {
  user: [],
  
};

export const UserContext = createContext<UserContextProps>(defaultValue);

interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const apiEndpoint = "http://127.0.0.1:5000"; 

  const [isLoading, setIsLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [onchange, setOnchange] = useState(false);
  const [category, setCategory] = useState("Fun"); // Default category
  const user = ['fuck ts']


  const router = useRouter()

 
  const contextData = {
    user
   
  };

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
}

// To use the context
export const useUserContext = () => useContext(UserContext);
