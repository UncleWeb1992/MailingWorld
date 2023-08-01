import classNames from "classnames";
import { FC, useState, useRef, useEffect, MouseEvent } from "react";
import { RiArrowRightCircleFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../../hook/redux";
import { setparentField, setSubField } from "../../../store/Slices/MailSlice";
import { LinkChildrenType } from "../../../types/types";
import { ContextMenu } from "../ContextMenu";
import { RenameForm } from "../RenameForm";
import styles from "./link.module.scss";
import { setFields } from "../../../store/Slices/AppSlice";
import { toast } from "react-toastify";

interface ItemProps {
  subField: string;
  child: LinkChildrenType[];
}

const SubMenu: FC<ItemProps> = ({ subField, child }) => {
  const dispatch = useAppDispatch();
  const { fiedls } = useAppSelector((state) => state.app);
  const { parentField } = useAppSelector((state) => state.mail);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );
  const [action, setAction] = useState({ rename: false, delete: false });
  const [selectedField, setSelectedField] = useState("");
  const contextMenu = useRef<HTMLDivElement>(null);

  const fieldContextItems = [
    {
      title: "Переименовать папку",
      onClick: () => {
        setAction({ rename: true, delete: false });
        setCoords(null);
      },
    },
    {
      title: "Удалить папку",
      onClick: handleDeleteField,
    },
  ];

  const dispacth = useAppDispatch();
  const changeSubFIeld = (field: LinkChildrenType) => {
    dispacth(setparentField(field.parent));
    dispacth(setSubField(field.title));
  };

  const openSubMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleContext = (e: MouseEvent) => {
    e.preventDefault();
    setSelectedField(e.currentTarget.textContent as string);

    setCoords({ top: e.clientY, left: e.clientX });
  };

  function handleDeleteField() {
    setCoords(null);
    const currField = fiedls.find((field) => field.title === parentField);

    if (!currField) {
      throw new Error("Field not found");
    }

    let child = currField.children || [];
    // @ts-ignore
    function updateFields(arr: LinkChildrenType[], targetTitle: string) {
      if (arr.find((field) => field.title === targetTitle)) {
        // @ts-ignore
        return arr.filter((field) => field.title !== targetTitle);
      } else {
        // @ts-ignore
        return arr.map((field) => ({
          ...field,
          children: field.children
            ? updateFields(field.children, targetTitle)?.length
              ? updateFields(field.children, targetTitle)
              : null
            : null,
        }));
      }
    }

    const newFields = fiedls.map((field) =>
      field.title === parentField
        ? { ...field, children: updateFields(child, selectedField) }
        : field
    );

    dispatch(setFields(newFields));
    toast.success("Изменения сохранены");
  }

  useEffect(() => {
    const closeContextMenu = () => {
      setCoords(null);
    };
    window.addEventListener("click", closeContextMenu);
    return () => window.removeEventListener("click", closeContextMenu);
  }, []);

  return (
    <div onClick={(e) => e.stopPropagation()} className={styles.linkMenu}>
      {child &&
        child.map((item, i) => (
          <div key={i.toString()} className={classNames(styles.linkMenuItem)}>
            <div
              onContextMenu={handleContext}
              onClick={changeSubFIeld.bind(null, item)}
              className={classNames(styles.linkMenuTop, {
                [styles.subActive]: item.title === subField,
              })}
            >
              {item.children && (
                <RiArrowRightCircleFill
                  onClick={openSubMenu}
                  className={classNames(styles.arrow, { [styles.open]: open })}
                />
              )}
              <span onClick={changeSubFIeld.bind(null, item)}>
                {item.title}
              </span>
            </div>
            {item.children && open && (
              <SubMenu child={item.children} subField={subField} />
            )}
          </div>
        ))}
      {coords && (
        <div ref={contextMenu}>
          <ContextMenu {...coords} items={fieldContextItems} />
        </div>
      )}
      {action.rename && (
        <RenameForm
          onClose={setAction.bind(null, { rename: false, delete: false })}
          fieldname={selectedField}
        />
      )}
    </div>
  );
};

export default SubMenu;
