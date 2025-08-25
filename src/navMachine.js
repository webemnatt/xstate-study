import { createMachine, assign } from 'xstate';

export const navMachine = createMachine({
  id: 'navigation',
  initial: 'menu', // começa exibindo a tela do menu
  context: {
    authenticated: false // controle simples de autenticação
  },
  states: {
    menu: { // está na tela 'Menu' por causa do botão 'ir para opções'
      on: {
        OPEN_OPTIONS: [ // uma lista porque nesse há duas possibilidades: está autenticado ou não
          { target: 'options', guard: 'isAuthenticated' }, // exibe as opções apenas se isAuthenticated === true
          { target: 'login' } // se guard retornar false, exibe tela de login
        ]
      }
    },
    options: {
      on: { BACK_TO_MENU: 'menu' } // única opção na tela 'Opções'
    },
    login: { // só é exibido se authenticated: false 
      on: {
        LOGIN: { // evento chamado pelo send
          target: 'options', // se authenticated: true, exibe a tela de opções
          actions: 'setAuthenticated' // modifica o context
        },
        CANCEL: 'menu' // evento chamado pelo send
      }
    }
  }
}, {
  guards: {
    isAuthenticated: (meta) => { // verifica  se context.authenticated é true 
      const { context, event } = meta;
      return !!context.authenticated;
    }
  },
  actions: {
    setAuthenticated: assign({ authenticated: () => true }) // decisão
  }
});
