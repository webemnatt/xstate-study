import { createMachine } from 'xstate';

export const navigationMachine = createMachine({
  id: 'navigation',
  initial: 'menu',
  states: {
    menu: {
      on: { OPEN_OPTIONS: 'options' }
    },
    options: {
      on: { BACK_TO_MENU: 'menu' }
    }
  }
});
