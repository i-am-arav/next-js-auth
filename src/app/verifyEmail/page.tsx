"use client";

import axios from "axios";
import React, { useState } from "react";

const VerifyEmailPage = () => {

  const [token, setToken] = useState("");
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const fetchTokenFromUrl = () => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  };

  const verifyUserEmail = async () => {
    try {
      const { data } = await axios.post("/api/users/verifyEmail", { token });
      if (data.success) {
        setVerified(true);
        setVerifiedUser(data.user);
      }
    } catch (e: any) {
      setError(true);
      console.log("error verify email", e.message);
    }
  };

  React.useEffect(() => {
    fetchTokenFromUrl();
  }, []);
  React.useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white text-black">
      Verify Email Page
      {!verified && error && <div className="text-red-500">Error Happened</div>}
      {verifiedUser && <div>{JSON.stringify(verifiedUser)}</div>}
    </div>
  );
};

export default VerifyEmailPage;
