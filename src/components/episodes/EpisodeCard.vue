<script setup>
const props = defineProps({
	episode: {
		type: Object,
		required: true,
	}
})
</script>
<template>
	<VCard class="flex-1-1">
		<VRow>
			<VCol>
				<VCardTitle>
					<RouterLink :to="{path:'episode', query:{id:episode.id}}">
						{{ episode.name }}
					</RouterLink>
				</VCardTitle>
				<VCardSubtitle>Release date: {{ episode.air_date }}</VCardSubtitle>
				<VCardSubtitle>Episode: {{ episode.episode }}</VCardSubtitle>
			</VCol>
		</VRow>
	</VCard>
</template>
<style scoped>
</style>
