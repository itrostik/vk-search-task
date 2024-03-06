import { useState } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { SearchContext } from './context/SearchContext.ts';
import { SearchResults } from './components/SearchResults/SearchResults';
import { UserType } from './types/UserType.ts';
import './styles/global.scss';
export default function App() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentFormValue, setCurrentFormValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  return (
    <SearchContext.Provider value={{ users, currentFormValue, errorMessage }}>
      <div className={'wrapper'}>
        <SearchForm
          setUsers={setUsers}
          setCurrentFormValue={setCurrentFormValue}
          setErrorMessage={setErrorMessage}
        />
        <SearchResults />
      </div>
    </SearchContext.Provider>
  );
}
