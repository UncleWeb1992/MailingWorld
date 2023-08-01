import { FC, HTMLAttributes } from "react";
import styles from "./CheckBox.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
  checked: boolean;
}

const Checkbox: FC<Props> = ({ checked, ...rest }) => {
  return (
    <div {...rest} className={styles.root}>
      {checked && <div className={styles.check} />}
    </div>
  );
};

export default Checkbox;
