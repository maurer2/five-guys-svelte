<script>
  // https://svelte.dev/docs#createEventDispatcher
  import { createEventDispatcher } from 'svelte';

  // props
  export let players;
  export let activePlayerId;

  // local vars
  const dispatch = createEventDispatcher();

</script>

<div class="nav">
  <select bind:value={ activePlayerId } on:change="{ () => dispatch('playerchange', activePlayerId) }">
    <option value={ 0 } disabled selected>Select player...</option>
    {#each players as player (player.id)}
      <option value={player.id} selected="{ activePlayerId === player.id }">
        { player.fullName }
      </option>
    {/each}
  </select>
</div>