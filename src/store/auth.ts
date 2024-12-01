import { atom } from 'jotai';
import { User } from '../types';

export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);

// Initialize atoms with null to prevent undefined states
userAtom.onMount = (setValue) => {
  setValue(null);
  return () => setValue(null);
};