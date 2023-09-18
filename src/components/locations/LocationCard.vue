<script setup>
import LikeBtn from '@/components/LikeBtn.vue';

const props = defineProps({
	location: {
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
		<VRow class="ma-0">
			<VCol>
				<VCardTitle class="text-wrap">
					Location name:
					<RouterLink
						:to="{ path: 'location', query: { id: location.id } }"
						class="link text-wrap"
					>
						{{ location.name }}
					</RouterLink>
				</VCardTitle>
				<VCardText class="pb-2 pt-0 text-wrap">Type: {{ location.type }}</VCardText>
				<VCardText class="pb-2 pt-0 text-wrap">Dimension: {{ location.dimension }}</VCardText>
				<VCardText class="pb-2 pt-0 text-wrap">
					Created:
					{{ new Date(Date.parse(location.created)).toLocaleDateString() }}
				</VCardText>
			</VCol>
		</VRow>
		<LikeBtn
			:btn-active="location.isLiked"
			:item-id="location.id"
			:on-click="onClick"
		/>
	</VCard>
</template>
<style scoped></style>
