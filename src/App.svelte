<script>
	// imports
	import Hero from './Hero.svelte';
	import Header from './Header.svelte';

	// data
	const dummyData = ['Mittens', 'Murle'];

	export let name;
</script>

<style type='text/scss'>
  @import 'variables';

  .wrapper {
		padding: $spacing / 2;
	}

	h1 {
		color: red;
	}
</style>

<!-- layout -->
<div class="wrapper">
	<article class="page">
		<Hero catName={dummyData[0]} />
		<Header catName={dummyData[1]} />

		<h1>Test4 {name}!</h1>
	</article>
</div>
