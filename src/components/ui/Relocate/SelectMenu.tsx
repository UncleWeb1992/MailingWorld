import { FC } from "react";
import { LinkChildrenType } from "../../../types/types";
import styles from "./Relocate.module.scss";

type Props = {
  children: LinkChildrenType[];
  onClick: (title: string) => void;
};

const SelectMenu: FC<Props> = ({ children, onClick }) => {
  return (
    <div className={styles.itemMenu}>
      {children &&
        children.map(({ title, children }, i) => (
          <div key={i.toString()}>
            <span onClick={onClick.bind(null, title)} className={styles.item}>
              {title}
            </span>
            {children && <SelectMenu onClick={onClick} children={children} />}
          </div>
        ))}
    </div>
  );
};

export default SelectMenu;
