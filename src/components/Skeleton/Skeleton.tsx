import styles from './Skeleton.module.scss';

export default function Skeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.skeleton}></div>
    </div>
  );
}
