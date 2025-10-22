// Login.jsx
import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email , setEmail] = React.useState("");
  const [password , setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
  };
    

  return (
    <AuthLayout>
    <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
      <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to login.
      </p>

      <form onSubmit={handleLogin}>
        <Input 
        value={email}
        onChange ={({ target }) => setEmail(target.value)}
        label="Email Address" 
        type="text" 
        placeholder="Enter your email" 
        />
      </form>

    </div>
    </AuthLayout>
  );
};

export default Login;
