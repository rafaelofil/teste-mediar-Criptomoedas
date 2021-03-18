import React from 'react';
import styles from '../styles/components/About.module.css';

function About() {
  return (
    <div className={styles.container} id="about">
      <div>
        <p>
          Você está pronto para
          <br />
          saber o que você vende.
          <br />
          Nós podemos mostrar
          <br />o que você poderia vender.
        </p>
      </div>
    </div>
  );
}

export default About;
