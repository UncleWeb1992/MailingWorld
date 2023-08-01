import { FC, useState } from "react";
import styles from "./MessageForm.module.scss";
import classNames from "classnames";
import { TextField } from "../../common/Inputs/TextField";

import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../../hook/redux";
import { setMessages, setSend } from "../../../store/Slices/MailSlice";
import { Button } from "../../common/Button";
import { TextArea } from "../../common/Inputs/TextArea";
import { emailRegex } from "../../../constants/constants";
import { MessageFields, MessageType } from "../../../types/types";
import { randomId } from "../../../utils/randomId";

const MessageForm: FC = () => {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.user);
  const { messages } = useAppSelector((state) => state.mail);
  const { send } = useAppSelector((state) => state.mail);
  const [state, setState] = useState({
    body: "",
    address: "",
  });

  const emailErr = !!state.address?.length && !emailRegex.test(state.address);

  const disabled =
    Object.values(state).filter((item) => item.length === 0).length !== 0 ||
    !!emailErr;

  const handleChange = (val: string, fieldName?: string) => {
    fieldName && setState((prev) => ({ ...prev, [fieldName]: val }));
  };

  const closeSendler = () => {
    setState({
      body: "",
      address: "",
    });
    dispatch(setSend(false));
  };

  const onSubmit = () => {
    if (disabled) return;

    setState({
      body: "",
      address: "",
    });

    const newMsg: MessageType = {
      ...state,
      autor: name,
      date: new Date(Date.now()).getTime(),
      field: "",
      id: randomId(),
      read: false,
      type: MessageFields.Send,
    };

    dispatch(setMessages([...messages, newMsg]));
    dispatch(setSend(false));
  };

  return (
    <div
      onClick={closeSendler}
      className={classNames(styles.root, { [styles.open]: send })}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={classNames(styles.content, {
          [styles.openContent]: send,
        })}
      >
        <IoClose onClick={closeSendler} className={styles.close} />
        <TextField
          classess={{ root: styles.input }}
          onChange={handleChange}
          value={state.address}
          required
          error={emailErr ? "Не корректный email" : undefined}
          fieldName="address"
          placeholder="Адресс почты"
          label="Кому"
        />
        <TextArea
          label="Сообщение"
          value={state.body}
          fieldName="body"
          onChange={handleChange}
        />
        <Button onClick={onSubmit} disabled={disabled} title="Отправить" />
      </div>
    </div>
  );
};

export default MessageForm;
