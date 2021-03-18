import React from 'react';
import styles from '../styles/components/Header.module.css';
import { Link } from 'react-scroll';
import useMedia from '../hooks/useMedia';

function Header({ setModalLogin }) {
  const mobile = useMedia('(max-width: 860px)');
  const [mobileMenu, setMobileMenu] = React.useState(false);

  function disapearMenuMobile() {
    setMobileMenu(false);
  }

  function handleClick() {
    setModalLogin(true);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img className={styles.logo} src="./logo.png" alt="logo" />
        {mobile && (
          <button
            aria-label="Menu"
            className={`${styles.mobileButton} ${
              mobileMenu && styles.mobileButtonActive
            }`}
            onClick={() => setMobileMenu(!mobileMenu)}
          ></button>
        )}
        <nav
          className={`${mobile ? styles.navMobile : styles.nav} ${
            mobileMenu && styles.navMobileActive
          }`}
        >
          <Link
            className={styles.link}
            to="about"
            smooth={true}
            duration={500}
            onClick={disapearMenuMobile}
          >
            Sobre
          </Link>
          <Link
            className={styles.link}
            to="chart"
            smooth={true}
            duration={500}
            onClick={disapearMenuMobile}
          >
            Gráficos
          </Link>
          <Link
            className={styles.link}
            to="contact"
            smooth={true}
            duration={1000}
            onClick={disapearMenuMobile}
          >
            Contato
          </Link>
          {mobile && (
            <button
              className={styles.login}
              onClick={() => {
                handleClick();
                disapearMenuMobile();
              }}
            >
              Login
            </button>
          )}
        </nav>
      </div>
      {!mobile && (
        <button className={styles.login} onClick={handleClick}>
          Login
        </button>
      )}
    </header>
  );
}

export default Header;
