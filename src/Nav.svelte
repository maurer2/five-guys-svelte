<script>
  // https://svelte.dev/docs#createEventDispatcher
	import { createEventDispatcher } from 'svelte';

  // props
  export let players;

  // local vars
  let activePlayerId = 0;
  const dispatch = createEventDispatcher();

</script>

<div class="nav">
  <select bind:value={ activePlayerId } on:change="{ () => dispatch('playerchange', activePlayerId) }">
    <option value={ 0 } selected disabled>Select player...</option>
    {#each players as player (player.id)}
      <option value={player.id}>{player.fullName}</option>
    {/each}
  </select>
</div>