import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { votingMachine } from './votingMachine';

function Menu({ onOpen }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Menu</h1>
      <button onClick={onOpen}>Ir para Opções / Resultado</button>
    </div>
  );
}

function Options({ onFinish, onBack }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Opções</h1>
      <button onClick={onFinish}>Finalizar (Resultado)</button>
      <button onClick={onBack} style={{ marginLeft: 8 }}>Voltar</button>
    </div>
  );
}

function Final({ onMenu }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Resultado Final</h1>
      <button onClick={onMenu} style={{ marginLeft: 8 }}>Sair da votação</button>
    </div>
  );
}

function Button({ closed, send }) {
  return (
    <button
      onClick={() => send({ type: 'SET_VOTING_CLOSED', value: true })}
      disabled={closed}
    >
      {closed ? 'Votação Encerrada' : 'Encerrar Votação'}
    </button>
  )
}

function State({state}){
  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, background: '#eee', padding: 8 }}>
    <div>State: {String(state.value)}</div>
    <div>votingClosed (context): {String(state.context.votingClosed)}</div>
  </div>
  )
}

export default function Voting() {
  const [state, send] = useMachine(votingMachine);
  const closed = !!state.context.votingClosed;

  return (
    <>
      <Button closed={closed} send={send} />

      {state.matches('menu') && <Menu onOpen={() => send({ type: 'OPEN' })} />}
      {state.matches('options') && <Options onFinish={() => send({ type: 'FINISH' })} onBack={() => send({ type: 'BACK' })} />}
      {state.matches('final') && <Final onMenu={() => send({ type: 'MENU' })} />}

      <State state={state}/>
    </>
  );
}