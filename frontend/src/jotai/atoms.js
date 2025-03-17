import { atom } from 'jotai';
import { atomWithStorage } from "jotai/utils";

export const emailStorageAtom = atomWithStorage("email", null);
export const tokenStorageAtom = atomWithStorage("token", null);

export const emailAtom = atom(null);
export const isLoginAtom = atom(false);
export const isAnimatedAtom = atom(false);
export const isRightAtom = atom(false);
export const isOpenModalAtom = atom(false);
export const userDataAtom = atom(null);
export const transactionsAtom = atom(null);
export const isTransactionAtom = atom(false);
export const totalTransactionsAtom = atom(0);
export const walletTypeAtom = atom("");