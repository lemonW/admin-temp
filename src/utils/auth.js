import storage from "good-storage";

const TokenKey = "vue_admin_template_token";

export function getToken() {
  return storage.session.get(TokenKey);
}

export function setToken(token) {
  return storage.session.set(TokenKey, token);
}

export function removeToken() {
  return storage.session.remove(TokenKey);
}
