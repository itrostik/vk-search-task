import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext.ts';
import { UserCard } from '../UserCard/UserCard';

import styles from './SearchResults.module.scss';

export function SearchResults() {
  const { users, currentFormValue, errorMessage } = useContext(SearchContext);
  console.log(users);
  return (
    <div className={styles.usersList}>
      {currentFormValue && users.length > 0 ? (
        users.map((user) => <UserCard user={user} key={user.id} />)
      ) : currentFormValue ? (
        <span className={styles.result}>
          {!errorMessage ? (
            'Нет результатов'
          ) : (
            <span className={styles.error}>Возникла ошибка: {errorMessage}</span>
          )}
        </span>
      ) : (
        <span className={styles.enter}>
          Введите что-нибудь в форму выше, чтобы найти пользователя
        </span>
      )}
    </div>
  );
}
