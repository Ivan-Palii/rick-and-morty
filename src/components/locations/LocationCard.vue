<script setup>
const props = defineProps({
	location: {
		type: Object,
		required: true
	}
})
</script>
<template>
	<VCard class="flex-1-1">
		<VRow>
			<VCol>
				<VCardTitle>Location name:
					<RouterLink :to="{path:'location',query: {id:location.id}}">{{ location.name }}</RouterLink>
				</VCardTitle>
				<VCardText class="pb-2 pt-0">Type: {{ location.type }}</VCardText>
				<VCardText class="pb-2 pt-0">Dimension: {{ location.dimension }}</VCardText>
				<VCardText class="pb-2 pt-0">Created:
					{{ (new Date(Date.parse(location.created)).toLocaleDateString()) }}
				</VCardText>
			</VCol>
		</VRow>
	</VCard>
</template>
<style scoped>
</style>
