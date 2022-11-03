import { atom } from 'recoil';

export const postsAtom = atom({
  key: 'posts',
  default: [],
});

export const totalPagesAtom = atom({
  key: 'totalPages',
  default: 1,
});

export const totalQuestionsAtom = atom({
  key: 'totalQuestions',
  default: 0,
});

export const timeNowAtom = atom({
  key: 'timeNow',
  default: 0,
});

export const pagesAtom = atom({
  key: 'pages',
  default: [],
});

export const curPageAtom = atom({
  key: 'curPage',
  default: 1,
});

export const sortByAtom = atom({
  key: 'sortBy',
  default: 'present',
});
