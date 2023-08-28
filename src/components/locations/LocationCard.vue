<script setup>
const props = defineProps({
	location: {
		type: Object,
		required: true
	}
})
</script>
<template>
	<v-card class="flex-1-1">
		<v-row>
			<v-col>
				<v-card-title>Location name: {{ location.name }}</v-card-title>
				<v-card-text class="pb-2 pt-0">Type: {{ location.type }}</v-card-text>
				<v-card-text class="pb-2 pt-0">Dimension: {{ location.dimension }}</v-card-text>
				<v-card-text class="pb-2 pt-0">Created: {{(new Date(Date.parse(location.created)).toLocaleDateString())}}</v-card-text>

			</v-col>
		</v-row>
	</v-card>
</template>
<style scoped>
</style>
