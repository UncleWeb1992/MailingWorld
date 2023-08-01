import { FC, useState, MouseEvent, useEffect } from "react";
import styles from "./link.module.scss";
import { SidebarLinks as SidebarLinksType } from "../../../types/types";
import { RiArrowRightCircleFill } from "react-icons/ri";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../hook/redux";
import { setparentField, setSubField } from "../../../store/Slices/MailSlice";
import SubMenu from "./SubMenu";
import { SideBarLinks } from "../../../constants/db";

type Props = {
  link: SidebarLinksType;
  openSidebar: boolean;
};

const SidebarLink: FC<Props> = ({
  link: { title, children, Icon },
  openSidebar,
}) => {
  const dispacth = useAppDispatch();
  const { parentField, subField } = useAppSelector((state) => state.mail);
  const [open, setOpen] = useState(false);

  const CurrentIcon = SideBarLinks.find((l) => l.title === title)?.Icon;

  const changeparentField = () => {
    dispacth(setparentField(title));
    dispacth(setSubField(""));
  };

  const openSubMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    setOpen(false);
  }, [openSidebar]);
  return (
    <li title={title} className={styles.link}>
      <div
        onClick={changeparentField}
        className={classNames(styles.linkTop, {
          [styles.close]: openSidebar,
          [styles.active]: parentField === title && !subField.length,
        })}
      >
        {children && !openSidebar && (
          <RiArrowRightCircleFill
            onClick={openSubMenu}
            className={classNames(styles.arrow, { [styles.open]: open })}
          />
        )}
        {(!children || openSidebar) && CurrentIcon && (
          <CurrentIcon className={styles.arrow} />
        )}

        <span
          className={classNames({
            [styles.visible]: !openSidebar,
            [styles.hidden]: openSidebar,
          })}
        >
          {title}
        </span>
      </div>
      {children && open && !openSidebar && (
        <SubMenu child={children} subField={subField} />
      )}
    </li>
  );
};

export default SidebarLink;
