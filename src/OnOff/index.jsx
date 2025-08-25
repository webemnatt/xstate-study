import React from 'react';
import { useMachine } from '@xstate/react';
import { toggleMachine } from './toggleMachine';

export default function OnOff() {
  const [state, send] = useMachine(toggleMachine);

  return (
    <div style={{ position: 'fixed', left: 16, top: 16, background: '#eee', padding: 8 }}>
      <h3>Aperte o botão para alterna entre ligado/desligado</h3>
      <button onClick={() => send({ type: 'TOGGLE' })} >
        {state.matches('turn-on') ? 'Ligado' : 'Desligado'}
      </button>
    </div>
  );
}
