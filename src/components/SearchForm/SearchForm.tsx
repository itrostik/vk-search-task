import styles from './SearchForm.module.scss';
import React, { useContext, useRef } from 'react';
import { UserType } from '../../types/UserType.ts';
import { debounce } from '../../utils/debounce.ts';
import { SearchContext } from '../../context/SearchContext.ts';

type PropsType = {
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  setCurrentFormValue: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export function SearchForm({
  setUsers,
  setCurrentFormValue,
  setErrorMessage,
}: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { errorMessage } = useContext(SearchContext);
  async function search() {
    if (inputRef.current) {
      const currentValue = inputRef.current.value.trim();
      setCurrentFormValue(currentValue);
      if (currentValue.length > 0) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?q=${currentValue}`,
        );
        if (response.ok) {
          const { users } = await response.json();
          setUsers(users);
          if (errorMessage) setErrorMessage('');
        } else {
          const { message } = await response.json();
          setErrorMessage(message);
        }
      } else {
        setUsers([]);
      }
    }
  }

  function reset() {
    if (inputRef.current) inputRef.current.value = '';
    setCurrentFormValue('');
    if (errorMessage) setErrorMessage('');
  }

  const debounceSearch = debounce(search, 150);

  return (
    <div className={styles.searchWrapper}>
      <form className={styles.searchForm}>
        <input
          type="text"
          ref={inputRef}
          onChange={() => debounceSearch()}
          placeholder={'Введите что-нибудь'}
          className={styles.searchInput}
        />
        {inputRef.current && inputRef.current.value.trim().length > 0 && (
          <button
            className={styles.searchReset}
            onClick={(event) => {
              event.preventDefault();
              reset();
            }}
          >
            <div className={styles.left}></div>
            <div className={styles.right}></div>
          </button>
        )}
      </form>
    </div>
  );
}
