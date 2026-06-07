import { useEffectEvent } from "react";
import { useState } from "react";
import { createContext } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){

    const [UserLogin, setUserLogin] = useState(localStorage.getItem("userToken"));

    // useEffect(() => {
        
    //     if(localStorage.getItem("userToken")){
    //         setUserLogin
            
    //     };
    // }, []);

    return(
        <>
        <UserContext.Provider value={{UserLogin , setUserLogin}}>
            {props.children}
        </UserContext.Provider>
        
        </>
    )
}