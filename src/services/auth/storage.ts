const AUTH_TOKEN_KEY = 'auth_token';
const REMEMBER_ME_KEY = 'remember_me';

export function saveAuthToken(token: string, rememberMe: boolean = false): void {
  if (rememberMe) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(REMEMBER_ME_KEY, 'true');
  } else {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.removeItem(REMEMBER_ME_KEY);
  }
}

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function removeAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(REMEMBER_ME_KEY);
}

export function wasRememberMeChecked(): boolean {
  return localStorage.getItem(REMEMBER_ME_KEY) === 'true';
}