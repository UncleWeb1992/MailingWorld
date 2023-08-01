import { FC, useState } from "react";
import styles from "./LoginForm.module.scss";
import { Button } from "../../common/Button";
import { TextField } from "../../common/Inputs/TextField";
import { LK_KEYS } from "../../../constants/constants";
import { useAppDispatch } from "../../../hook/redux";
import { setUserName } from "../../../store/Slices/UserSlice";
import { toast } from "react-toastify";

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  const disabled = name.length < 3;

  const onSubmit = () => {
    dispatch(setUserName(name));
    localStorage.setItem(LK_KEYS.User, name);
    toast.success("Ваше имя сохранено");
  };

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h2 className={styles.title}>Давайте познакомимся</h2>
        <TextField
          placeholder="Ваше имя"
          value={name}
          onChange={setName}
          required
          label="Введите ваше имя"
          classess={{ root: styles.input }}
        />
        <Button
          classess={styles.btn}
          disabled={disabled}
          onClick={onSubmit}
          title="Сохранить"
        />
      </div>
    </div>
  );
};

export default LoginForm;
