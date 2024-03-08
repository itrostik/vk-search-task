import styles from './SearchForm.module.scss';
import { useContext, useRef } from 'react';
import { debounce } from '../../utils/debounce.ts';
import { SearchContext } from '../../context/SearchContext.ts';

export function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { states, setStates } = useContext(SearchContext);

  //функция вызывается при изменении инпута
  async function search() {
    //загрузка началась...
    setStates.setIsLoading(true);

    //сброс настроек пагинации
    resetPagination();
    if (inputRef.current) {
      const currentValue = inputRef.current.value.trim(); //trim, чтобы убрать лишние пробелы
      setStates.setCurrentFormValue(currentValue); //обновляем состояние

      //если значение не пустое
      if (currentValue.length > 0) {
        //делаем запрос
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?q=${currentValue}&limit=20`,
        ); //вынес URL API в .env файл, а limit=20 нужен для пагинации
        //заносим первую страницу пагинации в список посещённых
        setStates.setAddedPaginationPages([1]);

        //если ответ сервера положительный, обновляем состояния всех пользователей и тех, что будут на текущей странице
        if (response.ok) {
          const { users } = await response.json();
          setStates.setUsers(users);
          setStates.setCurrentPageUsers(users);
          if (states.errorMessage) setStates.setErrorMessage(''); //сбрасываем, если оно было
        } else {
          //сообщение об ошибке заносим в соответствующий state
          const { message } = await response.json();
          setStates.setErrorMessage(message);
        }
      }
    }
    //загрузка закончилась...
    setStates.setIsLoading(false);
  }

  //функция сброса текущего значения инпута
  function reset() {
    if (inputRef.current) inputRef.current.value = '';
    setStates.setCurrentFormValue('');
    resetPagination();
  }

  //функция сброса настроек пагинации
  function resetPagination() {
    setStates.setUsers([]);
    setStates.setCurrentPaginationPage(1);
    setStates.setCurrentPageUsers([]);
    setStates.setAddedPaginationPages([]);
    setStates.setErrorMessage('');
  }

  //функция, оптимизирующая отправку запросов (получается и сам поиск в целом)
  const debounceSearch = debounce(search, 200);

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
