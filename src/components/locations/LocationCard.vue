<script setup>
const props = defineProps({
	location: {
		type: Object,
		required: true
	}
})
</script>
<template>
	{{ location }}
</template>
<style scoped>
</style>
