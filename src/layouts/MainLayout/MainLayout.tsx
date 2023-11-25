"use client";
import React from "react";
import useMaxWidth from "hooks/useMaxWidth";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import styles from "./MainLayout.module.scss";

type Props = {
  children: React.ReactNode;
  noDistraction?: boolean;
};

const MainLayout = ({
  children,
  noDistraction = false,
}: Props): React.ReactElement => {
  const maxWidth = useMaxWidth();
  return (
    <div className={styles.root}>
      <Header noDistraction={noDistraction} />
      <div {...maxWidth} className={styles.content}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
