<script>
  // imports
  import Nav from './Nav.svelte';
  import Hero from './Hero.svelte';
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
  @import './styles/variables';
  @import './styles/global';

  .page {
    margin: auto;
    width: 100%;
    border: 1px solid $gray;
    max-width: 380px;
  }

</style>

<!-- markup -->
<article class="page">
  <Nav players={ players } activePlayerId={ activePlayerId } on:playerchange="{ updateSelectedPlayer }" />
  <Hero player={ getPlayerById(activePlayerId) } />
  <Header player={ getPlayerById(activePlayerId) } />
  <Statistics player={ getPlayerById(activePlayerId) } />
</article>
