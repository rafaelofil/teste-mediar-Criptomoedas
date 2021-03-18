import React, { useRef, useState } from 'react';
import styles from '../styles/components/Contact.module.css';

function Contact() {
  const contactRef = useRef(null);
  const windowHalf = window.innerHeight * 0.6;
  const [animation, setAnimation] = useState(false);

  function animationScroll() {
    const sectionTop = contactRef.current?.getBoundingClientRect().top;
    const isSectionVisible = sectionTop - windowHalf < 0;
    if (isSectionVisible) {
      setAnimation(true);
      window.removeEventListener('scroll', animationScroll);
    }
  }

  window.addEventListener('scroll', animationScroll);

  return (
    <div className={styles.container} id="contact" ref={contactRef}>
      <div
        className={
          animation ? styles.animationContactActive : styles.animationContact
        }
      >
        <h1 className={styles.marginLeft}>Contato</h1>
        <div className={`${styles.contact} ${styles.marginLeft}`}>
          <div className={styles.forms}>
            <form>
              <label htmlFor="name">Nome</label>
              <input type="text" name="name" id="name" />
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
              <label htmlFor="message">Mensagem</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
              ></textarea>
            </form>
            <button>Enviar</button>
          </div>

          <div>
            <p className={styles.adress}>Rua Visconde de Mauá</p>
            <p className={styles.adress}>+55 99999-9999</p>
            <p className={styles.adress}>rafaelofil@outlook.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
