"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [fetchedUser, setFetchedUser] = React.useState<any>(null);
  

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (e: any) {
      console.log("Logout Failed");
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get('/api/users/me');
      console.log('getUser', response.data);
      setFetchedUser(response.data.data);
    } catch (e:any) {
      console.log('getUserDetail Failed');
      toast.error(e.message);
    }
  }

  const navigateToUserDetailsPage = () => {
    router.push(`/profile/${fetchedUser._id}`)
  }
  return (
    <div className="bg-white text-black flex-col min-h-screen flex justify-center items-center">
      ProfilePage
      <div className="flex space-x-4">
      <button
        onClick={onLogout}
        className="text-center text-white bg-blue-500 px-4 py-2 rounded-xl"
      >
        Logout
      </button>
      <button onClick={getUserDetails} className="text-center text-white bg-green-500 px-4 py-2 rounded-xl">
        Fetch User Details
      </button>

      {fetchedUser && <button onClick={navigateToUserDetailsPage} className='text-center bg-orange-400 px-4 py-2 rounded-xl'>
        Goto Details Page
      </button>}

      </div>
      {fetchedUser && <h3>{fetchedUser?.username}</h3>}
      
    </div>
  );
};

export default ProfilePage;
