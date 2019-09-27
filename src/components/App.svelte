<script>
  // imports
  import Nav from './Nav.svelte';
  import Header from './Header.svelte';
  import Statistics from './Statistics.svelte';

  // props
  export let players;

  // functions
  function getPlayerById(id) {
    const playerFound = players.find((entry) => entry.id === id);

    return (playerFound === undefined) ? null : playerFound;
  }

  function updateSelectedPlayer({ detail }) {
    activePlayerId = detail;
  }

  // vars
  $: activePlayerId = 0;
  $: player = getPlayerById(activePlayerId);

</script>

<style lang="scss">
  @import '../styles/normalize.scss';
  @import '../styles/variables';
  @import '../styles/global';

  .app {
    margin: auto;
    width: 100%;
    border: 1px solid var(--gray);
    max-width: 380px;
  }

</style>

<template lang="html">
  <article class="app">
    <Nav
      players={ players }
      activePlayerId={ activePlayerId }
      on:playerchange="{ updateSelectedPlayer }"
    />
    <Header player={ player } />
    <Statistics player={ player } />
  </article>
</template>
