import styles from './SearchPagination.module.scss';
import { useContext, useEffect } from 'react';
import { SearchContext } from '../../context/SearchContext.ts';
import { UserType } from '../../types/UserType.ts';

export function SearchPagination() {
  const { states, setStates } = useContext(SearchContext);

  async function setCurrentUsersOnPage(
    currentPage: number = states.currentPaginationPage,
  ) {
    const currentUsers = states.users.filter(
      (_, index) => index >= (currentPage - 1) * 20 && index < currentPage * 20,
    );
    setStates.setCurrentPageUsers([...currentUsers]);
  }
  async function pagination() {
    setStates.setIsLoading(true);
    setStates.setCurrentPageUsers([]);
    const currentValue = states.currentFormValue.trim();
    const currentSkip = (states.currentPaginationPage - 1) * 20;
    if (states.addedPaginationPages.includes(states.currentPaginationPage)) {
      await setCurrentUsersOnPage();
      setStates.setIsLoading(false);
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}?q=${currentValue}&limit=20&skip=${currentSkip}`,
    );
    const addedPages = states.addedPaginationPages;
    addedPages.push(states.currentPaginationPage);
    setStates.setAddedPaginationPages([...addedPages]);
    const result = await response.json();
    const newUsers = result.users as UserType[];
    const bufferUsers = states.users;
    newUsers.forEach((user) => bufferUsers.push(user));
    setStates.setUsers([...bufferUsers]);
    await setCurrentUsersOnPage();
    setStates.setIsLoading(false);
  }

  async function swap(value: number) {
    setStates.setCurrentPaginationPage(value);
    await setCurrentUsersOnPage(value);
  }

  useEffect(() => {
    setCurrentUsersOnPage();
  }, [states.users]);

  useEffect(() => {
    pagination();
  }, [states.currentPaginationPage]);

  return (
    <div className={styles.wrapper}>
      {states.currentPaginationPage !== 1 && (
        <div
          className={styles.prev}
          onClick={() => swap(states.currentPaginationPage - 1)}
        >
          {states.currentPaginationPage - 1}
        </div>
      )}
      <div className={styles.current}>{states.currentPaginationPage}</div>
      {states.currentPageUsers.length === 20 && (
        <div
          className={styles.next}
          onClick={() => swap(states.currentPaginationPage + 1)}
        >
          {states.currentPaginationPage + 1}
        </div>
      )}
    </div>
  );
}
