"use client";
import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage: FC = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [isLoading,setIsLoading] = React.useState(true);

  const onSignup = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup Success', response.data);
      router.push('/login')
      
    }
    catch(e: any) {
      console.log('Signup error', e.message)
      toast.error(e.message)
    }
    finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setIsLoading(false);
    }
    else if(!isLoading) {
      setIsLoading(true);
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{'Signup'}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
      className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type={"text"}
        value={user.username}
        onChange={(e) => {
          setUser((prev) => ({ ...prev, username: e.target.value }));
        }}
        placeholder='UserName'
      />

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

      <button disabled={isLoading} onClick={() =>onSignup()} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ">Signup here</button>
      <Link href='/login'>Visit Login page</Link>
    </div>
  );
};

export default SignupPage;
