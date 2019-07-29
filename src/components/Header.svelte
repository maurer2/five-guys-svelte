<script>
  export let player;

  // reactive
  $: isDefault = (player === null);
</script>

<style type='text/scss'>
  @import './styles/variables';

  .header {
    display: flex;

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
      margin-bottom: $spacing;
      font-size: 1rem;

      &--is-hidden {
        visibility: hidden;
      }
    }

    .crest {
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
  <div class="text-column">
    <h1 class="title" class:title--is-hidden={ isDefault }>
      { isDefault ? '-' : player.fullName }
    </h1>
    <div class="position" class:position--is-hidden={ isDefault }>
      { isDefault ? '-' : player.position }
    </div>
  </div>
  <div class="crest-column">
    {#if isDefault}
      <img class="crest crest-default" src="/images/teams/default.png" alt="" />
    {:else}
      <img class="crest" src="/images/teams/{player.team.id}.svg" alt="" />
    {/if}
  </div>
</header>
