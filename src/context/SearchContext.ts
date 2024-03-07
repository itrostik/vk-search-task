import { createContext } from 'react';
import { SearchContextType } from '../types/SearchContextType.ts';

export const SearchContext = createContext<SearchContextType>({
  states: {
    users: [],
    currentFormValue: '',
    errorMessage: '',
    currentPaginationPage: 1,
    addedPaginationPages: [],
    currentPageUsers: [],
    isLoading: false,
  },
  setStates: {
    setUsers: () => {},
    setCurrentFormValue: () => {},
    setErrorMessage: () => {},
    setCurrentPaginationPage: () => {},
    setAddedPaginationPages: () => {},
    setCurrentPageUsers: () => {},
    setIsLoading: () => {},
  },
});
