import AsyncStorage from "@react-native-async-storage/async-storage";

import jwtDecode from "jwt-decode";

const key = "authToken";

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(key, token);
  } catch (error) {
    console.log("Произошла ошибка при сохранении токена для авторизации", error);
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log("Произошла ошибка при получении токена для авторизации", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Произошла ошибка при удалении токена для авторизации", error);
  }
};

export default { storeToken, getUser, removeToken };
