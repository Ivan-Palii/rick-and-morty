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
		Charachers:{{ countInfo.charactersCount }} Locations:{{ countInfo.locationsCount }}
		Episodes:{{ countInfo.episodesCount }}
	</v-footer>
</template>
<style scoped>
</style>
