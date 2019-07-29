<script>
  export let player;

  // reactive
  $: isDefault = (player === null);
</script>

<style type='text/scss'>
  @import './styles/variables';

  .hero {
    padding: 0 $spacing;
    background-image: url(/images/other/background-pattern.png);
    background-position: right center;
    background-repeat: no-repeat;

    .default-image {
      display: block;
      width: 150px;
      height: 190px;
      overflow: hidden;
    }

    .hero-image {
      display: block;
      width: 150px;
      height: 190px;

      @supports(object-position: -5px) {
        object-position: -5px;
      }
    }
  }

</style>

<section class="hero">
  {#if isDefault}
    <div class="default-image">
      <img inline class="hero-image" src="/images/players/default.svg" alt="player photo" />
    </div>
  {:else}
    <img class="hero-image" src="/images/players/p{player.id}.png" alt="player photo" />
  {/if}
</section>
