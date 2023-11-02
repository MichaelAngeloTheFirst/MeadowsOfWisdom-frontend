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

export function getCommentVotesUrl(comment_id: number, vote_value: string) {
  return `${getApiUrl()}/${comment_id}/comments/${vote_value}/votes/`;
}