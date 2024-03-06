import { createContext } from 'react';
import { SearchType } from '../types/SearchType.ts';

export const SearchContext = createContext<SearchType>({
  users: [],
  currentFormValue: '',
  errorMessage: '',
});
