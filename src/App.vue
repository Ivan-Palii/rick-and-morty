<script setup>
//
import TheSnackbar from '@/components/TheSnackbar.vue';

</script>
<template>
	<VApp>
		<RouterView />
		<TheSnackbar />
	</VApp>
</template>

<style lang="scss">
.link{
	color: inherit;
	text-decoration: none;
	transition: .3s;
	&:hover{
		color: orangered;
	}
}
</style>
