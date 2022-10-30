import { atom } from 'recoil';

export const usersAtom = atom({
  key: 'users',
  default: [],
});

export const curUserAtom = atom({
  key: 'curUser',
  default: {},
});

export const postsAtom = atom({
  key: 'posts',
  default: [{}],
  effects: [],
});
