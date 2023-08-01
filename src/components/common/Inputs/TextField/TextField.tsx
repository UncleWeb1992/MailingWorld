import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./TextField.module.scss";
import classNames from "classnames";

type Props = {
  value: string;
  classess?: {
    root?: string;
    input?: string;
  };
  label?: string;
  fieldName?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onChange: (text: string, fieldName?: string) => void;
};

const TextField: FC<Props> = ({
  value,
  label,
  classess,
  fieldName,
  placeholder,
  error,
  required,
  onChange,
}) => {
  const [err, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(e.target.value, fieldName);
  };

  const handleBlur = () => {
    if (required) {
      !value.length
        ? setError("Поле обязательно для заполнения")
        : error
        ? setError(error)
        : setError("");
    }
  };

  useEffect(() => {
    setError("");
  }, [value]);

  useEffect(() => {
    error && setError(error);
  }, [error]);
  return (
    <div className={classNames(styles.root, classess?.root)}>
      <label className={styles.label}>{label}</label>
      <input
        name={fieldName}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className={classNames(styles.input, classess?.input)}
      />
      {err && <span className={styles.error}>{err}</span>}
    </div>
  );
};

export default TextField;
