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

  .masthead {
    display: flex;
    padding: 0 $spacing;
    background: $red;
    color: white;

    .text-column,
    .crest-column {
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: auto;
    }

    .crest-column {
      margin-left: $spacing / 2;
      flex-grow: 0;
    }

    .title {
      margin-top: $spacing * 1.25;
      margin-bottom: 0.75rem;
      font-size: 1.35rem;

      &--is-hidden {
        visibility: hidden;
      }
    }

    .position {
      margin-bottom: 1rem;
      font-size: 1rem;

      &--is-hidden {
        visibility: hidden;
      }
    }

    .crest {
      display: block;
      padding: $spacing / 4;
      width: 83px;
      height: 83px;
      transform: translateY(-45%);
      background: $background;
      border-radius: 50%;

      @supports(object-fit: contain) {
        object-fit: contain;
      }
    }

    .crest-default {
      padding: $spacing;
    }
  }

</style>

<header class="header">
  <div class="hero">
    {#if isDefault}
      <div class="default-image">
        <img inline class="hero-image" src="/images/players/default.svg" alt="player photo" />
      </div>
    {:else}
      <img class="hero-image" src="/images/players/p{player.id}.png" alt="player photo" />
    {/if}
  </div>
  <div class="masthead">
    <div class="text-column">
      <h1 class="title" class:title--is-hidden={ isDefault }>
        { isDefault ? '' : player.fullName }
      </h1>
      <div class="position" class:position--is-hidden={ isDefault }>
        { isDefault ? '' : player.position }
      </div>
    </div>
    <div class="crest-column">
      {#if isDefault}
        <img class="crest crest-default" src="/images/teams/default.png" alt="" />
      {:else}
        <img class="crest" src="/images/teams/{player.team.id}.svg" alt="" />
      {/if}
    </div>
  </div>
</header>
