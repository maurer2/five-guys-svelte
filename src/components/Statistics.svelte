<script>
  export let player;

  // const statisticsKeys = ['appearances', 'goals', 'goalsAssist', 'goalsPerMatch', 'passesPerMinute'];
  const statisticsKeyMapping = {
    appearances: 'Appearances',
    goals: 'Goals',
    goalsAssist: 'Assists',
    goalsPerMatch: 'Goals per match',
    passesPerMinute: 'Passes per minute',
  }
  const statisticsKeys = Object.keys(statisticsKeyMapping);

  // reactive
  $: playerStatistics = (player === null) ? null : player.statistics;
</script>

<div class="statistics">
  {#each statisticsKeys as statisticsKey, i (statisticsKey)}
    <dl class="entry">
      <dt class="key">
        {statisticsKeyMapping[statisticsKey]}
      </dt>
      <dd class="value">
        {#if playerStatistics !== null }
          {playerStatistics[statisticsKey]}
        {:else}
          -
        {/if}
      </dd>
    </dl>
  {/each}
</div>
