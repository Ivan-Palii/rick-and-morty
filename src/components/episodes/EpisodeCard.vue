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
		<VRow class="ma-0 ">
			<VCol>
				<VCardTitle>
					<RouterLink
						:to="{ path: 'episode', query: { id: episode.id } }"
						class="link text-wrap"
					>
						{{ episode.name }}
					</RouterLink>
				</VCardTitle>
				<VCardSubtitle class="text-wrap">Release date: {{ episode.air_date }}</VCardSubtitle>
				<VCardSubtitle class="text-wrap">Episode: {{ episode.episode }}</VCardSubtitle>
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
