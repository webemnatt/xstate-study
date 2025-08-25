import { createMachine, assign } from 'xstate';

export const votingMachine = createMachine({
    id: 'navigation',
    initial: 'menu',
    context: {
      votingClosed: false
    },
    states: {
      menu: {
        on: {
          OPEN: [
            { target: 'final', guard: 'isVotingClosed' },
            { target: 'options' }
          ],
          SET_VOTING_CLOSED: { actions: 'setVotingClosed' }
        }
      },
      options: {
        on: { FINISH: 'final', BACK: 'menu' }
      },
      final: {
        on: { MENU: 'menu' } // envia send({ type: 'MENU' }) para voltar
      }
    }
  }, {
    guards: {
      isVotingClosed: (meta) => !!meta.context.votingClosed
    },
    actions: {
      setVotingClosed: assign({ votingClosed: (meta) => !!meta.event.value})
    } 
});
