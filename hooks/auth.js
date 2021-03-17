import { useContext } from "react";

import jwtDecode from "jwt-decode";

import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

import api from "../api";

export default () => {
  const { data, setData, user, setUser } = useContext(AuthContext);

  const logIn = (token) => {
    const user = token ? jwtDecode(token) : null;
    if (!user) return;
    setUser(user);
    authStorage.storeToken(token);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const me = async () => {
    let result = await api.users.me().catch((error) => error.response.data);
    console.log(result);
  };

  return { data, setData, logIn, logOut, me };
};
