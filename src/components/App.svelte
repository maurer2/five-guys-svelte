<script>
  // imports
  import Nav from './Nav.svelte';
  import Header from './Header.svelte';
  import Statistics from './Statistics.svelte';

  // props
  export let players;

  // vars
  let activePlayerId = 0;

  function getPlayerById(id) {
    const playerFound = players.find((player) => player.id === id);

    return (playerFound === undefined) ? null : playerFound;
  }

  function updateSelectedPlayer({ detail }) {
    activePlayerId = detail;
  };

</script>

<style type='text/scss'>
  @import './styles/normalize.scss';
  @import './styles/variables';
  @import './styles/global';

  .app {
    margin: auto;
    width: 100%;
    border: 1px solid $gray;
    max-width: 380px;
  }

</style>

<!-- markup -->
<article class="app">
  <Nav players={ players } activePlayerId={ activePlayerId } on:playerchange="{ updateSelectedPlayer }" />
  <Header player={ getPlayerById(activePlayerId) } />
  <Statistics player={ getPlayerById(activePlayerId) } />
</article>
