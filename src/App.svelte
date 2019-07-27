<script>
	// imports
	import Hero from './Hero.svelte';
	import Header from './Header.svelte';
	import Nav from './Nav.svelte';

	// props
	export let players;

	// data
	const dummyData = ['Mittens', 'Murle'];

	// vars
	let activePlayerId = 0;

	function getPlayerNameById(id) {
		const playerFound = players.find((player) => player.id === id);

		return (playerFound === undefined) ? '' : playerFound.fullName;
	}

	function updateSelectedPlayer({ detail }) {
		activePlayerId = detail;
	};

</script>

<style type='text/scss'>
	@import './styles/variables';
	@import './styles/global';

	.page {
		margin: auto;
		width: 100%;
		border: 1px solid $gray;
		max-width: 380px;
	}

</style>

<!-- markup -->
<article class="page">
	<Nav players={ players } on:playerchange="{ updateSelectedPlayer }" />
	<h1>
		<div>Selected player id: { activePlayerId }</div>
		<div>Selected player name: { getPlayerNameById(activePlayerId) }</div>
	</h1>
	<Hero catName={dummyData[0]} />
	<Header catName={dummyData[1]} />
</article>
