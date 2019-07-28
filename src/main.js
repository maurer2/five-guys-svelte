import App from './App.svelte';

import { players as playersJSON } from './data/players.json';
import getPlayers from './data/transform';

const players = getPlayers(playersJSON);

const app = new App({
  target: document.body,
  props: {
    players,
  }
});

export default app;