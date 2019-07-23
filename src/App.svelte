<script>
	// imports
	import Hero from './Hero.svelte';
	import Header from './Header.svelte';

	// props
	// export let name;

	// data
	const dummyData = ['Mittens', 'Murle'];
	const players = [
		{
			id: 4916,
			fullName: 'Toby Alderweireld',
		},
		{
			id: 4148,
			fullName: 'Yaya Touré',
		},
		{
			id: 2064,
			fullName: 'Wayne Rooney',
		},
		{
			id: 4246,
			fullName: 'Per Mertesacker',
		},
		{
			id: 8983,
			fullName: 'Riyad Mahrez',
		}
	];

	function getPlayerNameById(id) {
		const playerFound = players.find((player) => player.id === id);

		return (playerFound === undefined) ? '' : playerFound.fullName;
	}

	// vars
	let activePlayerId = 0;

</script>

<style type='text/scss'>
  @import 'variables';

  .wrapper {
		padding: $spacing / 2;
	}

	h1 {
		color: black;
	}
</style>

<!-- markup -->
<div class="wrapper">
	<article class="page">
		<div class="nav">
			<select bind:value={ activePlayerId }>
				<option value={ 0 } selected disabled>Select player...</option>
				{#each players as player (player.id)}
					<option value={player.id}>{player.fullName}</option>
				{/each}
			</select>
		</div>
		<h1>Selected player: { getPlayerNameById(activePlayerId) }</h1>
		<Hero catName={dummyData[0]} />
		<Header catName={dummyData[1]} />
	</article>
</div>
