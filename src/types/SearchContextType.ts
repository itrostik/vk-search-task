import { UserType } from './UserType.ts';
import React from 'react';

//типизация контекста SearchContext

export type SearchContextType = {
  states: {
    users: UserType[];
    currentFormValue: string;
    errorMessage: string;
    currentPaginationPage: number;
    addedPaginationPages: number[];
    currentPageUsers: UserType[];
    isLoading: boolean;
  };

  setStates: {
    setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
    setCurrentFormValue: React.Dispatch<React.SetStateAction<string>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    setCurrentPaginationPage: React.Dispatch<React.SetStateAction<number>>;
    setAddedPaginationPages: React.Dispatch<React.SetStateAction<number[]>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentPageUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  };
};
