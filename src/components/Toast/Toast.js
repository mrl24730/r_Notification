import { useMemo } from "react";
import styles from "./styles.module.css";

export const Toast = ({ mode, onClose, message }) => {
  const classes = useMemo(() => [styles.toast, styles[mode]].join(" "), [mode]);

  return (
    <div className={classes} onClick={onClose}>
      <div className={styles.message}>{message}</div>
    </div>
  );
};
