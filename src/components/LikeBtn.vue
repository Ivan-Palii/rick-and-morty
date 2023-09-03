<script setup>
const props = defineProps({
	btnActive: {
		required: true,
		type: Boolean
	},
	onClick: {
		required: true,
		type: Function
	},
	characterId: {
		required: true,
		type: Number
	}
});
</script>
<template>
	<VBtn
		:color="btnActive ? 'pink' : 'gray'"
		icon="mdi-heart"
		variant="text"
		class="like-btn"
		@click="onClick(characterId)"
	/>
</template>
<style scoped>
.like-btn {
	position: absolute;
	top: 5px;
	right: 5px;
}
</style>
