import React from 'react';
import { useMachine } from '@xstate/react';
import { navigationMachine } from './navigationMachine';
import './App.css';

function Menu({ onOpen }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Menu</h1>
      <button onClick={onOpen}>Ir para Opções</button>
    </div>
  );
}

function Options({ onBack }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Opções</h1>
      <button onClick={onBack}>Voltar ao Menu</button>
    </div>
  );
}


export default function App() {
  const [state, send] = useMachine(navigationMachine);

  return (
    <div className="App">
      {state.matches('menu') && <Menu onOpen={() => send({ type: 'OPEN_OPTIONS' })} />}
      {state.matches('options') && <Options onBack={() => send({ type: 'BACK_TO_MENU' })} />}
    </div>
  );
}
