<script setup>
import { ref } from 'vue';
import LikeBtn from '@/components/LikeBtn.vue';

const props = defineProps({
	character: {
		type: Object,
		required: true
	},
	onClick: {
		type: Function,
		required: true
	}
});

const color = ref(undefined);
switch (props.character.status) {
	case 'Alive': {
		color.value = 'green';
		break;
	}
	case 'Dead': {
		color.value = 'red';
		break;
	}
	default: {
		color.value = 'orange';
	}
}
</script>
<template>
	<VCard class="pa-4 flex-1-1">
		<VRow class="ma-0 character_row">
			<VCol
				cols="12"
				xxl="2"
				xl="3"
				md="5"
				sm="4"
			>
				<div class="character_avatar-wrapper">
					<VAvatar
						color="surface-variant"
						size="164"
						class="character_avatar"
					>
						<VImg
							:src="character.image"
							aspect-ratio="1/1"
							cover
						/>
					</VAvatar>
				</div>
			</VCol>
			<VCol class="d-flex flex-column">
				<VCardTitle class="text-wrap flex-0-1">
					<RouterLink
						:to="{ path: 'character', query: { id: character.id } }"
						class="link"
					>
						{{ character.name }}
					</RouterLink>
				</VCardTitle>
				<div class="d-flex flex-0-1 justify-center align-center pl-4">
					<VAvatar
						:color="color"
						size="13"
					/>
					<VCardText class="pa-1 pl-2 text-wrap">
						{{ character.status }} - {{ character.species }}
					</VCardText>
				</div>
				<VCardText class="pa-1 pl-4 text-wrap flex-0-1">
					Gender: {{ character.gender }}
				</VCardText>
				<VCardText class="pa-1 pl-4 text-wrap flex-0-1">
					Last location:
					<RouterLink
						:to="{
							path: 'location',
							query: { id: character.location.url.split('/').pop() }
						}"
						class="link"
					>
						{{ character.location.name }}
					</RouterLink>
				</VCardText>
			</VCol>
		</VRow>
		<LikeBtn
			:btn-active="character.isLiked"
			:on-click="onClick"
			:item-id="character.id"
		/>
	</VCard>
</template>
<style scoped lang="scss"></style>