import { FC, useState } from "react";
import styles from "./Rename.module.scss";
import { TextField } from "../../common/Inputs/TextField";
import { Button } from "../../common/Button";
import { useAppDispatch, useAppSelector } from "../../../hook/redux";
import { LinkChildrenType } from "../../../types/types";
import { setFields } from "../../../store/Slices/AppSlice";
import { toast } from "react-toastify";

interface Props {
  fieldname: string;
  onClose: () => void;
}

const RenameForm: FC<Props> = ({ fieldname, onClose }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(fieldname);
  const { fiedls } = useAppSelector((state) => state.app);
  const { parentField } = useAppSelector((state) => state.mail);

  const disabled = name.length < 3;

  const handleSubmit = () => {
    if (disabled) return;
    const currField = fiedls.find((field) => field.title === parentField);

    if (!currField) {
      throw new Error("Field not found");
    }

    let child = currField.children || [];

    function updateTitle(
      arr: LinkChildrenType[],
      targetTitle: string,
      newTitle: string
    ): LinkChildrenType[] {
      return arr.map((item) => {
        if (item.title === targetTitle) {
          return { ...item, title: newTitle };
        } else if (item.children && item.children.length > 0) {
          return {
            ...item,
            children: updateTitle(item.children, targetTitle, newTitle),
          };
        } else {
          return item;
        }
      });
    }

    const newFields = fiedls.map((field) =>
      field.title === parentField
        ? { ...field, children: updateTitle(child, fieldname, name) }
        : field
    );

    dispatch(setFields(newFields));
    toast.success("Изменения сохранены");
    onClose();
  };

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <TextField value={name} onChange={setName} required label="Имя папки" />
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

export default RenameForm;
