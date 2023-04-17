import { useState } from 'react';
import { randomBytes } from 'crypto';
//Asetaan "getteri ja setteri" tokenille välimuistiin
export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}
/*
import { randomBytes } from 'crypto';
require('crypto').randomBytes(64).toString('hex')*/