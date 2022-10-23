import React, {useState} from "react"; 

const loginPage = () => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
} 

const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submit", {email, password});
}

function Login() {
    return(
        <div id="login">
            <h1 className="title">Área do funcionário</h1> 
            <form className="form" onSubmit="handleSubmit"></form>
        </div>
    )
} 

export default Login;