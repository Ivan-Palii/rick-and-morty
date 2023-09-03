<script setup>
import LikeBtn from '@/components/LikeBtn.vue';

const props = defineProps({
	episode: {
		type: Object,
		required: true
	},
	onClick: {
		type: Function,
		required: true
	}
});
</script>
<template>
	<VCard class="flex-1-1">
		<VRow>
			<VCol>
				<VCardTitle>
					<RouterLink :to="{ path: 'episode', query: { id: episode.id } }">
						{{ episode.name }}
					</RouterLink>
				</VCardTitle>
				<VCardSubtitle>Release date: {{ episode.air_date }}</VCardSubtitle>
				<VCardSubtitle>Episode: {{ episode.episode }}</VCardSubtitle>
			</VCol>
		</VRow>

		<LikeBtn
			:btn-active="episode.isLiked"
			:on-click="onClick"
			:item-id="episode.id"
		/>
	</VCard>
</template>
<style scoped></style>
