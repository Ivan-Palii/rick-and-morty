<script setup>
import { ref } from 'vue';
import { useCharactersStore } from '@/store/charactersStore.js';
import { useLocationsStore } from '@/store/locationsStore.js';
import { useEpisodesStore } from '@/store/episodesStore.js';
import { useSnackbarStore } from '@/store/snackbarStore.js';

const { setSnackbarParams } = useSnackbarStore();
const { onCharacterClick } = useCharactersStore();
const { onLocationClick } = useLocationsStore();
const { onEpisodeClick } = useEpisodesStore();
const dialogOpen = ref();
const props = defineProps({
	item: {
		type: Object,
		required: true
	},
	tab: {
		type: Number,
		required: true
	}
});

function onClick(itemId) {
	switch (props.tab) {
		case 0: {
			onCharacterClick(itemId);
			break;
		}
		case 1: {
			onEpisodeClick(itemId);
			break;
		}
		case 2: {
			onLocationClick(itemId);
			break;
		}
	}
	setSnackbarParams({
		isOpen: true,
		message: `${props.item.selectable.name} has been successfully removed from your like list`,
		color: 'green'
	});
	dialogOpen.value = false;
}
</script>
<template>
	<VDialog
		v-model="dialogOpen"
		persistent
		max-width="500"
	>
		<template #activator="{ props }">
			<VBtn
				:color="item.selectable.isLiked ? 'pink' : 'gray'"
				icon="mdi-heart"
				variant="text"
				class="like-btn"
				v-bind="props"
			/>
		</template>
		<VCard class="ma-0 h-100">
			<VCardTitle class="text-center">
				<span class="text-h5 text-wrap">Confirm remove from like list</span>
			</VCardTitle>
			<VCardText>
				Are you sure you want to remove
				<span class="text-decoration-underline">{{ item.selectable.name }}</span>
				from your like list?
				<VCol class="d-flex justify-space-between pa-0 pt-4">
					<VBtn
						color="red"
						plain
						@click="dialogOpen = false"
					>
						No
					</VBtn>
					<VBtn
						width="150"
						color="primary"
						type="submit"
						@click="onClick(item.selectable.id)"
					>
						Yes
					</VBtn>
				</VCol>
			</VCardText>
		</VCard>
	</VDialog>
</template>
<style scoped></style>
