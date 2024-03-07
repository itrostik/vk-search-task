import styles from './SearchForm.module.scss';
import { useContext, useRef } from 'react';
import { debounce } from '../../utils/debounce.ts';
import { SearchContext } from '../../context/SearchContext.ts';

export function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { states, setStates } = useContext(SearchContext);

  async function search() {
    setStates.setIsLoading(true);
    resetPagination();
    if (inputRef.current) {
      const currentValue = inputRef.current.value.trim();
      setStates.setCurrentFormValue(currentValue);
      if (currentValue.length > 0) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?q=${currentValue}&limit=20`,
        );
        const addedPages = states.addedPaginationPages;
        addedPages.push(states.currentPaginationPage);
        setStates.setAddedPaginationPages([...addedPages]);

        if (response.ok) {
          const { users } = await response.json();
          setStates.setUsers(users);
          setStates.setCurrentPageUsers(users);
          if (states.errorMessage) setStates.setErrorMessage('');
        } else {
          const { message } = await response.json();
          setStates.setErrorMessage(message);
        }
      } else {
        resetPagination();
      }
    }
    setStates.setIsLoading(false);
  }

  function reset() {
    if (inputRef.current) inputRef.current.value = '';
    setStates.setCurrentFormValue('');
    resetPagination();
  }

  function resetPagination() {
    setStates.setUsers([]);
    setStates.setCurrentPaginationPage(1);
    setStates.setCurrentPageUsers([]);
    setStates.setAddedPaginationPages([]);
    setStates.setErrorMessage('');
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
