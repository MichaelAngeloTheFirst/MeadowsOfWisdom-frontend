export function getBaseUrl() {
  return 'http://localhost:8000';
}

export function getApiUrl() {
  return getBaseUrl() + '/api';
}

export function getRegisterUrl() {
    return getApiUrl() + '/register/';
}

export function getLoginUrl() {
  return getApiUrl() + '/token/';
}

export function getLogoutUrl() {
  return getApiUrl() + '/logout/';
}