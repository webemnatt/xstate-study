import { createMachine } from 'xstate';

export const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'turn-off',
  states: {
    'turn-off': { on: { TOGGLE: 'turn-on' } },
    'turn-on': { on: { TOGGLE: 'turn-off' } },
  },
});
