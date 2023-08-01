import { FC } from "react";
import { Layout } from "../../components/layout";
import { useAppSelector } from "../../hook/redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Message.module.scss";
import { formatDate } from "../../utils/date";

import { BiArrowBack } from "react-icons/bi";

const Message: FC = () => {
  const nav = useNavigate();
  const { messages } = useAppSelector((state) => state.mail);
  const [searchParams] = useSearchParams();
  const id = Object.fromEntries(searchParams)?.id;
  const currMsg = messages.find((msg) => msg.id === id);

  const back = () => nav("/");

  if (currMsg) {
    return (
      <Layout>
        <div>
          <div onClick={back} className={styles.action}>
            <BiArrowBack className={styles.icon} />
            <span>Назад</span>
          </div>
          <div className={styles.top}>
            <span className={styles.autor}>{currMsg?.autor}</span>
            <span className={styles.date}>
              {formatDate(currMsg?.date as number)}
            </span>
          </div>

          <div
            className={styles.msg}
            dangerouslySetInnerHTML={{ __html: currMsg?.body ?? "" }}
          />
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div>
          <div onClick={back} className={styles.action}>
            <BiArrowBack className={styles.icon} />
            <span>Назад</span>
          </div>
          <h3 className={styles.notFound}>Сообщение не найдено</h3>
        </div>
      </Layout>
    );
  }
};

export default Message;
