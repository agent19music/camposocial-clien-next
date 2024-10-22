"use client";

import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import {toast} from 'react-hot-toast'

interface User {
  username: string;
  password: string;
}

// Define the AuthContext interface
interface AuthContextType {
  login: (username:string, password:string, apiEndpoint:string) => void; 
  sellerlogin: (email:string, password:string) => void; 

  logout: () => void; 
  currentUser: [] | null;
  authToken : string | null;
  updateUserContext: () => void; 

}

// Create the AuthContext with a default value (null user initially)
export const AuthContext = createContext<AuthContextType>({

  login: () => {},
  logout: () => {},
  currentUser : [],
  authToken: null,
  updateUserContext: () => {},
  sellerlogin: ()=> {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const apiEndpoint = "http://127.0.0.1:5000"; 
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [onChange, setOnChange] = useState(false)
  const [authToken, setAuthToken] = useState(() =>
    sessionStorage.getItem('authToken')
      ? sessionStorage.getItem('authToken')
      : null
  )
  const router = useRouter();

  async function login(username: string, password: string, apiEndpoint: string) {
    try {
      const response = await fetch(`${apiEndpoint}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (data.access_token) {
        sessionStorage.setItem('authToken', data.access_token);
        setAuthToken(data.access_token);
        toast.success('Welcome back');
        setOnChange(!onChange)
        router.push('/yaps')
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred. Please try again.');
    }
  }

  function sellerlogin(email:string, password:string) {
    fetch(`${apiEndpoint}/seller/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log('Server response:', response); // Log the server response
        if (response.access_token) {
          sessionStorage.setItem('authToken', response.access_token);
          setAuthToken(response.access_token);
          toast.success("You are now logged in."); // Success toast
          setOnChange(!onChange);
          router.push('/products');
        } else {
          toast.error("Incorrect username or password"); // Error toast
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        toast.error('Error logging in'); // Error toast
      });
  }

  
  // Logout user
  function logout() {
    sessionStorage.removeItem('authToken')
    setCurrentUser(null)
    setAuthToken(null)
    setOnChange(!onChange)
    router.push('/login')
  }

    // Get Authenticated user
    useEffect(() => {
        if (authToken) {
          fetch(`${apiEndpoint}/authenticated_user`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          })
            .then((res) => res.json())
            .then((response) => {
              if (response.email || response.username) {
                setCurrentUser(response)
              } else {
                setCurrentUser(null)
              }
            })
        }
      }, [authToken, onchange])
    
      const updateUserContext = () => {
        fetch(`${apiEndpoint}/authenticated_user`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.email || response.username) {
              setCurrentUser(response)
            } else {
              setCurrentUser(null)
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      };
    

  const contextData: AuthContextType = {
    currentUser,
    authToken,
    updateUserContext,
    login,
    logout,
    sellerlogin
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);