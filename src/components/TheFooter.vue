<script setup>
import { useCharactersStore } from '@/store/charactersStore.js';
import { useEpisodesStore } from '@/store/episodesStore.js';
import { useLocationsStore } from '@/store/locationsStore.js';
import { onMounted } from 'vue';
import { useMainStore } from '@/store/mainStore.js';

const { getCharacters } = useCharactersStore();
const { getEpisodes } = useEpisodesStore();
const { getLocations } = useLocationsStore();
const { countInfo } = useMainStore();

onMounted(async () => {
	await Promise.all([getCharacters(), getLocations(), getEpisodes()]);
});
</script>
<template>
	<VFooter class="flex-0-1">
		<VRow class="ma-0 justify-center">
			<VCol
				class="text-center text-h6"
				cols="12"
				md="6"
				sm="12"
			>
				Charachers:{{ countInfo.charactersCount }}
			</VCol>
			<VCol
				class="text-center text-h6"
				cols="12"
				md="6"
				sm="12"
			>
				Locations:{{ countInfo.locationsCount }}
			</VCol>
			<VCol
				class="text-center text-h6"
				cols="12"
				md="6"
				sm="12"
			>
				Episodes:{{ countInfo.episodesCount }}
			</VCol>
		</VRow>
	</VFooter>
</template>
<style scoped></style>
