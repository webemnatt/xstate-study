import { createMachine, assign } from 'xstate';

export const navMachine = createMachine({
  id: 'navigation',
  initial: 'menu',
  context: {
    authenticated: false // controle simples de autenticação
  },
  states: {
    menu: {
      on: {
        OPEN_OPTIONS: [
          { target: 'options', guard: 'isAuthenticated' },
          { target: 'login' } // se a guard falhar, vai para tela de login
        ]
      }
    },
    options: {
      on: { BACK_TO_MENU: 'menu' }
    },
    login: {
      on: {
        LOGIN: {
          target: 'options',
          actions: 'setAuthenticated'
        },
        CANCEL: 'menu'
      }
    }
  }
}, {
  guards: {
    isAuthenticated: (context) => context.authenticated === true
  },
  actions: {
    setAuthenticated: assign({ authenticated: () => true })
  }
});
