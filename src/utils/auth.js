import storage from "good-storage";

const storage_pre_fix = "ncme_admin_";

export function getToken() {
  return storage.session.get(storage_pre_fix + "token");
}

export function setToken(token) {
  return storage.session.set(storage_pre_fix + "token", token);
}

export function removeToken() {
  return storage.session.remove(storage_pre_fix + "token");
}

export function getUserInfo() {
  return storage.session.get(storage_pre_fix + "user_info");
}

export function setUserInfo(val) {
  return storage.session.set(storage_pre_fix + "user_info", val);
}

export function removeUserInfo() {
  return storage.session.remove(storage_pre_fix + "user_info");
}
