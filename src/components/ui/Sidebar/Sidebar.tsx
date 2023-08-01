import { FC, useState } from "react";
import styles from "./Sidebar.module.scss";
import classNames from "classnames";

import LogoIcon from "../../../assets/icon/logo.png";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPenClip } from "react-icons/fa6";

import SidebarLink from "./Link";
import { GitHubLink } from "../../common/GithabLink";
import { useAppDispatch, useAppSelector } from "../../../hook/redux";
import { setSend } from "../../../store/Slices/MailSlice";
import { AddForm } from "../AddFieldForm";

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const { fiedls } = useAppSelector((state) => state.app);
  const [close, setClose] = useState(false);
  const [newField, setNewField] = useState(false);
  const clickSend = () => {
    dispatch(setSend(true));
  };

  const addField = () => {
    setNewField(true);
  };

  const onCloseAddField = () => {
    setNewField(false);
  };
  return (
    <div className={classNames(styles.root, { [styles.close]: close })}>
      <div className={styles.top}>
        <img
          className={styles.logo}
          alt="logo icon"
          src={LogoIcon}
          onClick={setClose.bind(null, !close)}
        />
      </div>
      <div className={styles.wrap}>
        <ul className={styles.links}>
          <li
            onClick={clickSend}
            title="Написать"
            aria-label="Написать"
            className={classNames(styles.btn, {
              [styles.closeBtn]: close,
              [styles.visibleBtn]: !close,
            })}
          >
            <FaPenClip onClick={clickSend} className={styles.sendImg} />{" "}
            <span>Написать</span>
          </li>
          {fiedls.map((link, i) => (
            <SidebarLink openSidebar={close} key={i.toString()} link={link} />
          ))}
          <li
            onClick={addField}
            title="Добавить папку"
            aria-label="Добавить папку"
            className={classNames(styles.btn, {
              [styles.closeBtn]: close,
              [styles.visibleBtn]: !close,
            })}
          >
            <AiOutlinePlus className={styles.plus} /> <span>новая папка</span>
          </li>
        </ul>
        <GitHubLink />
      </div>
      {newField && <AddForm onClose={onCloseAddField} />}
    </div>
  );
};

export default Sidebar;
