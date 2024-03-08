import { createContext } from 'react';
import { SearchContextType } from '../types/SearchContextType.ts';

export const SearchContext = createContext<SearchContextType>({
  //два глобальных поля: states и setStates
  states: {
    users: [], //общее количество пользователей
    currentFormValue: '', //текущее значение инпута в форме
    errorMessage: '', //сообщение об ошибке
    currentPaginationPage: 1, //текущая страница пагинации
    addedPaginationPages: [], //посещённые страницы пагинации
    currentPageUsers: [], //список пользователей на текущей страницы пагинации
    isLoading: false, //флаг загрузки
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
