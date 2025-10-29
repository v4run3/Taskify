import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link } from 'react-router-dom';
import {validateEmail} from "../../utils/helper";
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector';
import Input from '../../components/Input/Input';

const SignUp = () => {
  const [profilePic,setProfilePic] =useState(null);
  const [fullName,setFullName] =useState("");
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  const [adminInviteToken,setAdminInviteToken] =useState('');

  const [error,setError] =useState(null);

   // Handle Signup form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    
    //Signup API call
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold textblack">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today! It takes only a few moments to create your account and start managing your tasks efficiently.
        </p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onchange={({ target }) => setFullName(target.value)}
              label="Full Name"
              type="text"
              Placeholder="Enter your full name"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              type="email"
              placeholder="Enter your email"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Admin Invite Token"
              type="text"
              placeholder="6 Digit  Code"
            />
          </div>  

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">
              SIGN UP
            </button>

            <p className="text-[13px] text-slate-800 mt-3">
              Already have an account{" "}
              <Link className="text-blue-700 font-medium" to="/login">
                Login
              </Link>
            </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp