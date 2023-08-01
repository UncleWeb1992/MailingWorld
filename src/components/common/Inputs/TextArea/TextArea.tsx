import { FC, ChangeEvent, useState, useEffect } from "react";
import styles from "./TextArea.module.scss";
import classNames from "classnames";

type Props = {
  max?: number;
  value: string;
  label?: string;
  placeHolder?: string;
  fieldName?: string;
  onChange: (text: string, fieldName?: string) => void;
};

const TextArea: FC<Props> = ({
  max = 250,
  value,
  label,
  fieldName,
  placeHolder,
  onChange,
}) => {
  const [count, setCount] = useState(0);
  const handleChnage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const val = count < max ? e.target.value : e.target.value.slice(0, max);

    onChange(val, fieldName);
  };

  useEffect(() => {
    setCount(value.length);
  }, [value]);
  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        onChange={handleChnage}
        value={value}
        name={fieldName}
        className={styles.input}
        placeholder={placeHolder}
      />
      <div className={styles.countWrap}>
        <span className={classNames({ [styles.full]: count === max })}>
          {count}/{max}
        </span>
      </div>
    </div>
  );
};

export default TextArea;
