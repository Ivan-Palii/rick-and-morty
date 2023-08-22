<script setup>
const props = defineProps({
	episode: {
		type: Object,
		required: true,
	}
})
</script>
<template>
	<v-card class="flex-1-1">
		<v-row>
			<v-col>
				<v-card-title> {{ episode.name }}</v-card-title>
				<v-card-subtitle>Release date: {{ episode.air_date }}</v-card-subtitle>
				<v-card-subtitle>Episode: {{ episode.episode }}</v-card-subtitle>
			</v-col>
		</v-row>
	</v-card>
</template>
<style scoped>
</style>
