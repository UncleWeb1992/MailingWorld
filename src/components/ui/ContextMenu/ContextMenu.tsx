import { FC } from "react";
import styles from "./ContextMenu.module.scss";

type Props = {
  top: number;
  left: number;
  items: { title: string; onClick: (args?: any) => void }[];
};

const ContextMenu: FC<Props> = ({ left, top, items }) => {
  return (
    <div style={{ left, top }} className={styles.root}>
      {items.map((item) => (
        <div key={item.title} onClick={item.onClick} className={styles.item}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
