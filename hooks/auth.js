import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import jwtDecode from "jwt-decode";

import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

import useApi from "./api";

export default (nav) => {
  const { data, setData, user, setUser } = useContext(AuthContext);
  const { api, loading, error } = useApi();
  const navigation = nav || useNavigation();

  let submitLogin = async (phone) => {
    const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // if (!permission.granted) return; // Включить обратно перед релизом

    const pushToken = await Notifications.getExpoPushTokenAsync().catch((error) => console.log("Ошибка при получении Push-токена:", error));
    const response = await api.users.auth({ phone, pushToken: pushToken?.data });
    setData({ phone });

    if (!response.error) navigation.navigate("CodeEntry");
  };

  let submitCode = async (code) => {
    const response = await api.users.authConfirm({ phone: data.phone, code });
    if (response.error) return;

    if (response.data.register) {
      setData({ ...data, token: response.data.token });
      navigation.navigate("Register");
    } else login(response.data.token);
  };

  let submitRegister = async (name, lastName) => {
    const response = await api.users.register({ name, lastName }, data.token);
    if (!response.error) login(data.token);
  };

  let login = (token) => {
    const user = token ? jwtDecode(token) : null;
    if (!user) return;
    setUser(user);
    authStorage.storeToken(token);
  };

  let logout = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { data, setData, submitLogin, submitCode, submitRegister, login, logout, loading, error };
};
