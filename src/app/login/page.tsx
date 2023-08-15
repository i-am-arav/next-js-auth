"use client";
import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage: FC = () => {
  const router = useRouter(); 
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(true);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post('/api/users/login', user);
      console.log('Login Successful', res.data);
      toast.success('Login Successful');
      router.push('/profile')
    }
    catch(e:any) {
      console.log('Login Error',e.message)
      toast.error(e.message)
    }
    finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
      setIsLoading(false);
    }
    else if(!isLoading) {
      setIsLoading(true);
    }
  }, [user])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />

<label htmlFor="email">Email</label>
      <input
      className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type={"text"}
        value={user.email}
        onChange={(e) => {
          setUser((prev) => ({ ...prev, email: e.target.value }));
        }}
        placeholder='Email'
      />

<label htmlFor="password">Password</label>
      <input
      className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type={"text"}
        value={user.password}
        onChange={(e) => {
          setUser((prev) => ({ ...prev, password: e.target.value }));
        }}
        placeholder='Password'
      />

      <button disabled={isLoading} onClick={() =>onLogin()} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ">Sigin here</button>
      <Link href='/signup'>Visit Signup page</Link>
    </div>
  );
};

export default LoginPage;
