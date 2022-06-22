import {createContext, useEffect, useState,useContext} from 'react';
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged
} from 'firebase/auth';
import {auth} from './registerAuthentication'


const userAuthContext = createContext();

export function UserAuthContextProvider({children}){
    const [user,setUser] = useState("");
    const [loading,setLoading] = useState("");
    
     function signUp(email,password,confirmPassword){
          return createUserWithEmailAndPassword(auth,email,password,confirmPassword);
    }
    function logIn(email,password,confirmPassword){
        console.log("Email:",email);
        return signInWithEmailAndPassword(auth,email,password,confirmPassword);
  }
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
           setUser(currentUser)
           setLoading(false);
      });
      return()=>{
          unsubscribe();
      }
    },[]);
    return <userAuthContext.Provider value={{user,signUp,logIn}}>{!loading&&children}</userAuthContext.Provider>
}
export function useUserAuth(){

    return useContext(userAuthContext);
}