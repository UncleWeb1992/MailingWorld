import { FC, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  classess?: string;
}

const Button: FC<Props> = ({ title, classess, ...rest }) => {
  return (
    <button {...rest} className={classNames(styles.btn, classess)}>
      {title}
    </button>
  );
};

export default Button;
