import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext.ts';
import { UserCard } from '../UserCard/UserCard';

import styles from './SearchResults.module.scss';
import Skeleton from '../Skeleton/Skeleton.tsx';

export function SearchResults() {
  const { states } = useContext(SearchContext);
  return (
    <div className={styles.usersList}>
      {states.currentFormValue &&
        states.currentPageUsers.length > 0 &&
        states.currentPageUsers.map((user) => <UserCard user={user} key={user.id} />)}

      {!states.isLoading && states.currentFormValue && states.users.length === 0 ? (
        <span className={styles.result}>
          {!states.errorMessage ? (
            'Нет результатов'
          ) : (
            <span className={styles.error}>Возникла ошибка: {states.errorMessage}</span>
          )}
        </span>
      ) : (
        ''
      )}

      {!states.isLoading &&
        !states.currentFormValue &&
        states.currentPageUsers.length === 0 && (
          <span className={styles.enter}>
            Введите что-нибудь в форму выше, чтобы найти пользователя
          </span>
        )}

      {states.isLoading &&
        states.currentFormValue &&
        states.currentPageUsers.length === 0 &&
        [...new Array(20)].map((_, index) => <Skeleton key={index} />)}
    </div>
  );
}
