<script>
  export let player;

  const statisticsKeyMapping = {
    appearances: 'Appearances',
    goals: 'Goals',
    goalsAssist: 'Assists',
    goalsPerMatch: 'Goals per match',
    passesPerMinute: 'Passes per minute',
  };
  const statisticsKeys = Object.keys(statisticsKeyMapping);
  const itemsFormatToFixedPoint = ['goalsPerMatch', 'passesPerMinute'];

  // reactive
  $: playerStatistics = (player === null) ? {} : player.statistics;
</script>

<style type='text/scss'>
  @import './styles/variables';

  .statistics {
    padding: 0 var(--spacing) var(--spacing) var(--spacing);
    background: var(--red);
    color: var(--background);
  }

  .wrapper {
    box-shadow: 0px 0px 5px 0px rgba(black, 0.5);
  }

  .entry {
    display: flex;
    margin: 0 0 2px 0;
    padding: 0.75rem;
    align-items: center;
    background: var(--gray);
    color: var(--foreground);
  }

  .key {
    margin-right: auto;
    font-size: 1rem;
  }

  .value {
    margin-left: calc(var(--spacing) / 2);
    font-weight: bold;
    font-size: 1.25rem;
  }

</style>

<section class="statistics">
  <div class="wrapper">
    {#each statisticsKeys as statisticsKey (statisticsKey)}
      <dl class="entry">
        <dt class="key">
          {statisticsKeyMapping[statisticsKey]}
        </dt>
        <dd class="value">
          {#if statisticsKey in playerStatistics }
            { (itemsFormatToFixedPoint.includes(statisticsKey))
              ? playerStatistics[statisticsKey].toFixed(2)
              : playerStatistics[statisticsKey]
            }
          {:else}
            -
          {/if}
        </dd>
      </dl>
    {/each}
  </div>
</section>
