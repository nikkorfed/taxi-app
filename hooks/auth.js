import { useContext } from "react";

import jwtDecode from "jwt-decode";

import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

export default () => {
  const { user, setUser } = useContext(AuthContext);

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

  const getUser = async () => {
    const token = await authStorage.getToken();
    const user = token ? jwtDecode(token) : null;
    if (user) setUser(user);
  };

  return { user, logIn, logOut, getUser };
};
