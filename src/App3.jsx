import React from 'react';
import { useMachine } from '@xstate/react';
import { navMachine } from './navMachine';
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
      <h1>Opções (somente autenticado)</h1>
      <button onClick={onBack}>Voltar ao Menu</button>
    </div>
  );
}

function Login({ onLogin, onCancel }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <button onClick={onLogin}>Fazer Login (simulado)</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
}

export default function App() {
  const [state, send] = useMachine(navMachine);

  return (
    <div className="App">
      {state.matches('menu') && <Menu onOpen={() => send({ type: 'OPEN_OPTIONS' })} />}
      {state.matches('options') && <Options onBack={() => send({ type: 'BACK_TO_MENU' })} />}
      {state.matches('login') && (
        <Login
          onLogin={() => send({ type: 'LOGIN' })}
          onCancel={() => send({ type: 'CANCEL' })}
        />
      )}
      <div style={{ position: 'fixed', right: 16, bottom: 16, background: '#eee', padding: 8 }}>
        <div>State: {state.value.toString()}</div>
        <div>Authenticated: {String(state.context.authenticated)}</div>
      </div>
    </div>
  );
}
