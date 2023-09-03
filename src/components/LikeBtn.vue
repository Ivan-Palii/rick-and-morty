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
	itemId: {
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
		@click="onClick(itemId)"
	/>
</template>
<style scoped>
.like-btn {
	position: absolute;
	top: 5px;
	right: 5px;
}
</style>
