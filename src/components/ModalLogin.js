import React from 'react';
import styles from '../styles/components/ModalLogin.module.css';

function ModalLogin({ setModalLogin }) {
  const visible = 'password';

  function closeModal() {
    setModalLogin(false);
  }

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) setModalLogin(false);
  }

  return (
    <div className={styles.modalContainer} onClick={handleOutsideClick}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
        <form action="">
          <label htmlFor="email">Email</label>
          <input type="text" htmlFor="email" id="email" />
          <label htmlFor="password">Senha</label>
          <input type={visible} htmlFor={visible} id={visible} />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalLogin;
