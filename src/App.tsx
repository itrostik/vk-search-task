import { useState } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { SearchPagination } from './components/SearchPagination/SearchPagination.tsx';
import { SearchResults } from './components/SearchResults/SearchResults';

import { SearchContext } from './context/SearchContext.ts';

import { UserType } from './types/UserType.ts';
import './styles/global.scss';

export default function App() {
  //инициализируем все нужные состояния приложения
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentFormValue, setCurrentFormValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentPaginationPage, setCurrentPaginationPage] = useState<number>(1);
  const [addedPaginationPages, setAddedPaginationPages] = useState<number[]>([]);
  const [currentPageUsers, setCurrentPageUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    //оборачиваем всё в provider SearchContext
    <SearchContext.Provider
      value={{
        states: {
          users,
          currentFormValue,
          errorMessage,
          currentPaginationPage,
          addedPaginationPages,
          currentPageUsers,
          isLoading,
        },
        setStates: {
          setUsers,
          setAddedPaginationPages,
          setCurrentFormValue,
          setCurrentPageUsers,
          setIsLoading,
          setErrorMessage,
          setCurrentPaginationPage,
        },
      }}
    >
      <div className={'wrapper'}>
        <SearchForm />
        <SearchResults />

        {/*пагинация*/}
        {currentFormValue &&
          ((currentPaginationPage === 1 && currentPageUsers.length === 20) ||
            currentPaginationPage > 1) && <SearchPagination />}
      </div>
    </SearchContext.Provider>
  );
}
