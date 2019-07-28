<script>
  export let player;

  // not reactive
  // let isDefault = (player === null);

  // reactive
  $: isDefault = (player === null);
</script>

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
    <img class="crest crest-default" src="/images/teams/default.png" alt="" />
  </div>
</header>
