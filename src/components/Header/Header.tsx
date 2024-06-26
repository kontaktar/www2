import React, { useState } from "react";
import screensizes from "data/screensizes";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import cx from "classnames";
import { Routes } from "types";
import { useAuth } from "@/components/Auth/provider";
import useMaxWidth from "hooks/useMaxWidth";
import Button from "src/components/Button";
import Logo from "src/components/Logo";
import Link from "components/LinkWrap";
import Modal from "components/Modal";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Header.module.scss";

type Props = {
  className?: string;
  noDistraction: boolean;
};
const Header = ({
  className,
  noDistraction = false,
}: Props): React.ReactElement => {
  const { width } = useWindowDimensions();
  const { isLoggedIn, logOut } = useAuth();
  const [openBurger, setOpenBurger] = useState(false);
  const router = useRouter();

  const mobileView = width < screensizes.tabletsPortrait;
  const tabletPortrait = width < screensizes.tabletsPortrait;

  return (
    <header className={styles.root} {...useMaxWidth()}>
      <div className={cx(styles.header, className)}>
        <div className={styles.logo_area}>
          {width < screensizes.default ? <Logo /> : <Logo withTitle />}
        </div>
        {!noDistraction && (
          <>
            {mobileView ? (
              <>
                {!openBurger ? (
                  <>
                    <Button.Hamburger
                      // hasFocus={hamburgerFocus}
                      onClick={() => {
                        setOpenBurger(true);
                      }}
                    />
                  </>
                ) : (
                  <Modal
                    ariaLabel="Valmynd"
                    open={openBurger}
                    onClose={() => setOpenBurger(false)}
                    className={styles.modal_container}
                    aria-labelledby="mobile-menu"
                    aria-describedby="mobile-dropdown-menu"
                  >
                    <div className={styles.modal_content}>
                      <div className={styles.header}>
                        <div className={styles.logo_area}>
                          <Logo />
                        </div>
                        <button
                          type="button"
                          className={styles.close_button}
                          onClick={() => setOpenBurger(false)}
                        >
                          <div />
                        </button>
                      </div>
                      <nav className={styles.mobile_navigation}>
                        <span>
                          <NextLink href="/">Kontaktar</NextLink>
                        </span>
                        <span>
                          <NextLink href={Routes.Profile}>Prófill</NextLink>
                        </span>
                        <span>
                          <NextLink href={Routes.Search}>Leita</NextLink>
                        </span>
                        <span>
                          <NextLink href={Routes.Subcription}>Áskrift</NextLink>
                        </span>

                        <span>
                          <NextLink href={Routes.Login}>Innskráning</NextLink>
                        </span>
                      </nav>
                    </div>
                  </Modal>
                )}
              </>
            ) : (
              <div role="navigation" className={styles.navigation}>
                {!tabletPortrait && (
                  <Link href="/">
                    <Button
                      name="homeNavigation"
                      className={cx(styles.tab, styles.ripple)}
                      modifier={["borderless"]}
                    >
                      Kontaktar
                    </Button>
                  </Link>
                )}
                {isLoggedIn && (
                  <Link href={Routes.Profile}>
                    <Button
                      name="profileNavigation"
                      className={cx(styles.tab, styles.ripple)}
                      modifier={["borderless"]}
                    >
                      Prófíll
                    </Button>
                  </Link>
                )}
                <Link href={Routes.Search}>
                  <Button
                    name="searchNavigation"
                    className={cx(styles.tab, styles.ripple)}
                    modifier={["borderless"]}
                  >
                    Leita
                  </Button>
                </Link>
                <Link href={Routes.Subcription}>
                  <Button
                    name="subscriptionNavigation"
                    className={cx(styles.tab, styles.ripple)}
                    modifier={["borderless"]}
                  >
                    Áskrift
                  </Button>
                </Link>
                <Button
                  name="logoutNavigation"
                  className={styles.login}
                  onClick={
                    !isLoggedIn
                      ? () => router.push(Routes.Login)
                      : () => logOut()
                  }
                  modifier={!isLoggedIn ? ["inverted"] : []}
                >
                  {!isLoggedIn ? "Innskráning" : "Útskrá"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
