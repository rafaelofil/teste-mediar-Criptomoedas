import React, { useState } from 'react';
import About from './components/About';
import ChartCoin from './components/ChartCoin';
import ChartCurrency from './components/ChartCurrency';
import Contact from './components/Contact';
import Header from './components/Header';
import ModalLogin from './components/ModalLogin';

function App() {
  const [modalLogin, setModalLogin] = useState(false);

  return (
    <div>
      <Header setModalLogin={setModalLogin} />
      {modalLogin && <ModalLogin setModalLogin={setModalLogin} />}
      <About />
      <ChartCoin />
      <ChartCurrency />
      <Contact />
    </div>
  );
}

export default App;
