import { FC, useState } from "react";
import styles from "./Relocate.module.scss";

import { IoClose } from "react-icons/io5";
import { SideBarLinks } from "../../../constants/db";

import { BiSolidDownArrow } from "react-icons/bi";
import { Button } from "../../common/Button";
import classNames from "classnames";
import SelectMenu from "./SelectMenu";
import { useAppDispatch, useAppSelector } from "../../../hook/redux";
import { MessageType } from "../../../types/types";
import { updateMessage } from "../../../store/Slices/MailSlice";
import { toast } from "react-toastify";

interface Props {
  selectedMsgs: MessageType[];
  onClose: () => void;
}

const Relocate: FC<Props> = ({ onClose, selectedMsgs }) => {
  const dispatch = useAppDispatch();
  const { parentField } = useAppSelector((state) => state.mail);
  const [field, setField] = useState("Пусто");
  const [openMenu, setOpenMenu] = useState(false);

  const disabled = field === "Пусто";

  const currMenuItems = SideBarLinks.filter(
    (item) => item.title === parentField
  );

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const selectField = (title: string) => {
    setField(title);
    setOpenMenu(false);
  };

  const handleSave = () => {
    if (disabled) return;
    selectedMsgs.forEach((msg) => {
      dispatch(updateMessage({ ...msg, field }));
    });

    toast.success("Изменения сохранены");
    onClose();
  };

  return (
    <div onClick={onClose} className={styles.root}>
      <div onClick={(e) => e.stopPropagation()} className={styles.content}>
        <IoClose onClick={onClose} className={styles.close} />
        <div className={styles.threeSelect}>
          <label className={styles.label}>Выбрать папку</label>
          <div onClick={toggleMenu} className={styles.selector}>
            <span>{field}</span>
            <BiSolidDownArrow
              className={classNames(styles.arrow, { [styles.open]: openMenu })}
            />
          </div>
          <ul
            className={classNames(styles.menu, { [styles.openMenu]: openMenu })}
          >
            {currMenuItems.map(({ title, children }, i) => (
              <li key={i.toString()}>
                <span
                  onClick={selectField.bind(null, title)}
                  className={styles.item}
                >
                  {title}
                </span>
                {children && (
                  <SelectMenu onClick={selectField} children={children} />
                )}
              </li>
            ))}
          </ul>
        </div>
        <Button
          onClick={handleSave}
          disabled={disabled}
          classess={styles.btn}
          title="Сохранить"
        />
      </div>
    </div>
  );
};

export default Relocate;
