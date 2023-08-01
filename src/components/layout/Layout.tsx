import { FC, ReactNode } from "react";
import styles from "./Layout.module.scss";
import { Sidebar } from "../ui/Sidebar";
import { Header } from "../ui/Header";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <div className={styles.wrap}>
        <Header />
        <div className={styles.contentWrap}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
