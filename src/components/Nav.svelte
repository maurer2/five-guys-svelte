<script>
  import { createEventDispatcher } from 'svelte';

  // props
  export let players;
  export let activePlayerId;

  // local vars
  const dispatchEvent = createEventDispatcher();

</script>

<style lang='scss'>
  .nav {
    margin: var(--spacing) var(--spacing) calc(var(--spacing) * 1.25) var(--spacing);
  }

  .nav-box {
    padding: calc(var(--spacing) * 0.75);
    width: 100%;
    border: 0;
    border-radius: 0;
    font-size: 1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: var(--gray);
    color: var(--foreground);

    /* chevron down */
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjBxcABA6gPpi5AAAAd0lEQVQoz73RsQ3CMBBA0ZcmJgMYkTarsAGDUiQNFLADIAEbUDAAoqOwEEZxSrjS77s4HX+YTpi0oKvsPaw8i7zWMHeyMRtxrXfVUk5qvUvilBxtNRkPOUPMkjDmPEm8eD9XX8nODa2le3nv6OD8+V1O4q8uMjkvky4ZrJC828QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDctMjJUMjI6MDQ6MTQrMDI6MDDXhR56AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA3LTIyVDIyOjA0OjE0KzAyOjAwptimxgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=');
    background-repeat: no-repeat;
    background-position: calc(100% - var(--spacing)) center;
  }

  /* ie */
  select::-ms-expand {
    display: none;
  }

</style>

<template lang="html">
  <section class="nav">
    <select
      class="nav-box"
      bind:value={activePlayerId}
      on:change="{() => dispatchEvent('playerchange', activePlayerId)}"
    >
      <option value={0} disabled selected>Select player...</option>
      {#each players as player (player.id)}
        <option value={player.id}>
          { player.fullName }
        </option>
      {/each}
    </select>
  </section>
</template>
