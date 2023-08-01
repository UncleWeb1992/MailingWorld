import { FC, useState } from "react";
import { Layout } from "../../components/layout";
import { useAppDispatch, useAppSelector } from "../../hook/redux";
import styles from "./MessageList.module.scss";
import { formatDate } from "../../utils/date";
import { CheckBox } from "../../components/common/CheckBox";
import { MessageFields, MessageType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../config/routes/routes";
import { deleteMessage, updateMessage } from "../../store/Slices/MailSlice";
import { Relocate } from "../../components/ui/Relocate";

import { FaTrash } from "react-icons/fa";

const MessageList: FC = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const { messages, parentField, subField } = useAppSelector(
    (state) => state.mail
  );
  const [selected, setSelected] = useState<MessageType[]>([]);
  const [newField, setNewField] = useState(false);

  const currMsgs = subField
    ? messages.filter((msg) => msg.field === subField)
    : messages.filter((msg) => msg.type === parentField);

  const cartMsgs = messages.filter((msg) => msg.type === MessageFields.Cart);

  const isChecked = (id: string) => !!selected.find((msg) => msg.id === id);

  const textInHtml = (html: string) => {
    // eslint-disable-next-line no-useless-escape
    return html.replace(/(\<(\/?[^>]+)>)/g, "");
  };

  const selectMessage = (message: MessageType) => {
    const isInclude = !!selected.find((msg) => msg.id === message.id);

    isInclude
      ? setSelected((prev) => prev.filter((msg) => msg.id !== message.id))
      : setSelected((prev) => [...prev, message]);
  };

  const readMsg = (id: string) => {
    const find = messages.find((msg) => msg.id === id);

    if (find) {
      dispatch(updateMessage({ ...find, read: true }));
      nav(RoutePaths.Message + `?id=${id}`);
    }
  };

  const markAsRead = () => {
    selected.forEach((msg) => {
      const find = messages.find((m) => m.id === msg.id);
      if (find) {
        dispatch(updateMessage({ ...find, read: true }));
      }
    });
  };

  const deleteMsg = () => {
    selected.forEach((msg) => {
      const find = messages.find((m) => m.id === msg.id);
      if (find) {
        setSelected((prev) => prev.filter((msg) => msg.id !== find.id));
        dispatch(updateMessage({ ...find, type: MessageFields.Cart }));
      }
    });
  };

  const clearCart = () => {
    cartMsgs.forEach((msg) => {
      dispatch(deleteMessage({ id: msg.id }));
    });
  };

  const closeModalField = () => {
    setNewField(false);
    setSelected([]);
  };

  if (!currMsgs?.length) {
    return (
      <Layout>
        <h2 className={styles.notFound}>Нет сообщений</h2>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div>
          {!!selected.length && (
            <ul className={styles.actions}>
              {parentField !== MessageFields.Cart && (
                <li onClick={markAsRead}>Отметить как прочитанные</li>
              )}
              {parentField !== MessageFields.Cart && (
                <li onClick={deleteMsg}>Удалить</li>
              )}
              <li onClick={setNewField.bind(null, true)}>Переместить</li>
            </ul>
          )}
          <ul>
            {currMsgs.map((msg) => (
              <li
                onClick={readMsg.bind(null, msg.id)}
                key={msg.id}
                className={styles.msg}
              >
                <CheckBox
                  checked={isChecked(msg.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectMessage(msg);
                  }}
                />
                <div className={styles.autor}>{msg.autor}</div>
                <span className={styles.preview}>{textInHtml(msg.body)}</span>
                <div className={styles.date}>{formatDate(msg.date)}</div>
                <div className={styles.isRead}>
                  {!msg.read && <div className={styles.dot} />}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {parentField === MessageFields.Cart && (
          <FaTrash
            onClick={clearCart}
            title="Очистить корзину"
            className={styles.clearCart}
          />
        )}
      </Layout>
      {newField && (
        <Relocate selectedMsgs={selected} onClose={closeModalField} />
      )}
    </>
  );
};

export default MessageList;
