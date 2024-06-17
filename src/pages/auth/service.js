import {
  client,
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from "../../api/client";
import storage from "../utils/storage";

export const login = async (credentials, storageRequest) => {
  return client.post("api/auth/login", credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    console.log("Esto es storageRequest que me llega: ", storageRequest);
    if (storageRequest) {
      storage.set("auth", accessToken);
    }
  });
};

export const logout = () => {
  removeAuthorizationHeader();
  storage.remove("auth");
};
