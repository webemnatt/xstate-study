import React from 'react';
import { useMachine } from '@xstate/react';
import { toggleMachine } from './toggleMachine';
import './App.css';

export default function App() {
  const [state, send] = useMachine(toggleMachine);

  return (
    <div className="App">
      <button onClick={() => send({ type: 'TOGGLE' })}>
        {state.matches('on') ? 'Ligado' : 'Desligado'}
      </button>
    </div>
  );
}
