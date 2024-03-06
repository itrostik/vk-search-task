import styles from './UserCard.module.scss';
import { UserType } from '../../types/UserType.ts';

type PropsType = {
  user: UserType;
};

export function UserCard({ user }: PropsType) {
  return (
    <div className={styles.userCard}>
      <img className={styles.userPic} src={user.image} alt={'user-picture'} />
      <div className={styles.userInfo}>
        <div>{`${user.firstName} ${user.lastName}`}</div>
        <div>{user.address.city}</div>
      </div>
    </div>
  );
}
