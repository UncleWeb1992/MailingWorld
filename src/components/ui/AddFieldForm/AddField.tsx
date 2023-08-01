import { FC, useState } from "react";
import styles from "./AddField.module.scss";
import { TextField } from "../../common/Inputs/TextField";
import { Button } from "../../common/Button";

import { IoClose } from "react-icons/io5";
import { BiSolidDownArrow } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../hook/redux";
import classNames from "classnames";
import SelectMenu from "./SelectMenu";
import { LinkChildrenType, MessageFields } from "../../../types/types";
import { setFields } from "../../../store/Slices/AppSlice";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
}

const AddField: FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { fiedls } = useAppSelector((state) => state.app);
  const { parentField } = useAppSelector((state) => state.mail);
  const [name, setName] = useState("");
  const [menu, setMenu] = useState(false);
  const [field, setField] = useState("");

  const disabled = name?.length < 3 || !field?.length;
  const currField = fiedls.find((fld) => fld.title === parentField);
  const child = currField?.children || [];

  const selectField = (title: string) => {
    setField(title);
    setMenu(false);
  };

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleSubmit = () => {
    const updateChildren = (
      arr: LinkChildrenType[],
      targetName: string,
      newtitle: string
    ): LinkChildrenType[] => {
      return arr.map((fld) => {
        if (fld.title === targetName) {
          if (fld.children) {
            return {
              ...fld,
              children: [
                ...fld.children,
                {
                  title: newtitle,
                  children: null,
                  parent: parentField as MessageFields,
                },
              ],
            };
          } else {
            return {
              ...fld,
              children: [
                {
                  title: newtitle,
                  children: null,
                  parent: parentField as MessageFields,
                },
              ],
            };
          }
        } else if (fld.children) {
          return {
            ...fld,
            children: updateChildren(fld.children, targetName, newtitle),
          };
        } else {
          return fld;
        }
      });
    };

    const newFields = fiedls.map((fld) =>
      fld.title === parentField
        ? { ...fld, children: updateChildren(child, field, name) }
        : fld
    );

    dispatch(setFields(newFields));
    toast.success("Изменения сохранены");
    onClose();
  };

  return (
    <div onClick={onClose} className={styles.root}>
      <div onClick={(e) => e.stopPropagation()} className={styles.content}>
        <IoClose onClick={onClose} className={styles.close} />
        <TextField
          placeholder="Название папки"
          label="Название папки"
          value={name}
          onChange={setName}
        />
        <div className={styles.threeSelect}>
          <label className={styles.label}>Выбрать родительскую папку</label>
          <div onClick={toggleMenu} className={styles.selector}>
            <span>{field}</span>
            <BiSolidDownArrow
              className={classNames(styles.arrow, { [styles.open]: menu })}
            />
          </div>
          <ul className={classNames(styles.menu, { [styles.openMenu]: menu })}>
            {fiedls.map(({ title, children }, i) => (
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
          onClick={handleSubmit}
          classess={styles.btn}
          disabled={disabled}
          title="Сохранить"
        />
      </div>
    </div>
  );
};

export default AddField;
