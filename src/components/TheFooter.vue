<script setup>
import {useCharactersStore} from "@/store/charactersStore.js";
import {useEpisodesStore} from "@/store/episodesStore.js";
import {useLocationsStore} from "@/store/locationsStore.js";
import {onMounted} from "vue";
import {useMainStore} from "@/store/mainStore.js";

const {getCharacters} = useCharactersStore()
const {getEpisodes} = useEpisodesStore()
const {getLocations} = useLocationsStore()
const {countInfo} = useMainStore()

onMounted(async () => {
	await Promise.all([getCharacters(), getLocations(), getEpisodes()])
})
</script>
<template>
	<v-footer class="flex-0-1">
		<v-row class="ma-0 justify-center">
			<v-col
				class="text-center text-h6"
				cols='12'
				md='6'
				sm='12'
			>
				Charachers:{{ countInfo.charactersCount }}
			</v-col>
			<v-col
				class="text-center text-h6"
				cols='12'
				md='6'
				sm='12'
			>
				Locations:{{ countInfo.locationsCount }}
			</v-col>
			<v-col
				class="text-center text-h6"
				cols='12'
				md='6'
				sm='12'
			>
				Episodes:{{ countInfo.episodesCount }}
			</v-col>
		</v-row>
	</v-footer>
</template>
<style scoped>
</style>
