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

export function getUserUrl(id : number){
  return `${getApiUrl()}/users/${id}`
}

export function getFunFactsUrl() {
  return getApiUrl() + '/funfacts';
}

export function getFunFactUrl(id: number) {
  return `${getFunFactsUrl()}/${id}`;
}

// export function getUsersFunFactsUrl() {
//   return getFunFactsUrl() + '/owner';
// }

export function getCommentsUrl(id: number) {
  return `${getFunFactsUrl()}/${id}/comments`;
}

// export function getOwnerUrl() {
//   return `${getApiUrl()}/content_owner/`;
// }

export function getCommentUrl(factID: number, id: number) {
  return `${getCommentsUrl(factID)}/${id}`;
}

export function getCommentVotesUrl(comment_id: number, vote_value: string) {
  return `${getApiUrl()}/${comment_id}/comments/${vote_value}/votes/`;
}