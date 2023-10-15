export function getBaseUrl() {
  return 'http://localhost:8000';
}

export function getApiUrl() {
  return getBaseUrl() + '/api';
}

export function getRegisterUrl() {
    return getApiUrl() + '/register';
}

export function getLoginUrl() {
  return getApiUrl() + '/token';
}

export function getRefreshUrl() {
  return getLoginUrl() + '/refresh/';
}

export function getLogoutUrl() {
  return getApiUrl() + '/logout';
}

export function getFunFactsUrl() {
  return getApiUrl() + '/funfacts';
}

export function getCommentsUrl(id: number) {
  return `${getFunFactsUrl()}/${id}/comments`;
}

// export function getSubCommentsUrl(id: number, subID : number) {
//   return `${getCommentsUrl(id)}/${subID}/subcomments`;
// }