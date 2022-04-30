import loginContext from "./Logincontext";
import { useState } from "react";

const LoginState = (props) =>{
    const [loginStatus, setLoginstatus] = useState(false);
    const userLogin = () =>{
        setLoginstatus(true);
    }
    const userLogout = () =>{
        setLoginstatus(false);
    }
    return (
        <loginContext.Provider value={{loginStatus, userLogin, userLogout}}>
            {props.children}
        </loginContext.Provider>
    )
}
export default LoginState;