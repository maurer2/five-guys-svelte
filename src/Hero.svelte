<script>
  export let player;

  // reactive
  $: isDefault = (player === null);
</script>

<section class="hero">
  {#if isDefault}
    <div class="default-image">
      <img inline class="hero-image" src="/images/players/default.svg" alt="player photo" />
    </div>
  {:else}
    <img class="hero-image" src="/images/players/p{player.id}.png" alt="player photo" />
  {/if}
</section>
