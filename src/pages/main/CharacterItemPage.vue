<script setup>
import {useCharactersStore} from "@/store/charactersStore.js";
import {useEpisodesStore} from "@/store/episodesStore.js"
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia"
import {useMainStore} from "@/store/mainStore.js";
import ItemLoader from "@/components/ItemLoader.vue";
import EpisodeCard from "@/components/episodes/EpisodeCard.vue";
import {useRoute} from 'vue-router';

const {delay} = useMainStore()
const {getCharacter} = useCharactersStore()
const {characters} = storeToRefs(useCharactersStore())
const {getEpisodesById} = useEpisodesStore()
const {episodes} = storeToRefs(useEpisodesStore())

const loader = ref(false)
const route = useRoute()

onMounted(async () => {
	loader.value = true
	console.log(route.query.id)
	await delay(500)
	await getCharacter(route.query.id)
	const idArr = characters.value.episode.map(e => e.split('/').pop())
	console.log(idArr)
	await getEpisodesById(idArr)
	console.log(episodes.value)
	setColor()
	loader.value = false
})

const color = ref(undefined)

function setColor() {
	switch (characters.value.status) {
		case 'Alive': {
			color.value = "green"
			break
		}
		case 'Dead': {
			color.value = "red"
			break
		}
		default: {
			color.value = "orange"
		}
	}
}
</script>
<template>
	<v-container class='wrap lighten-5 pa-4'>
		<template v-if='loader'>
			<ItemLoader/>
		</template>
		<template v-else>
			<v-card>
				<v-row class="ma-0 character_row">
					<div class="pa-4 ">
						<v-avatar
							color="surface-variant"
							size="164"
							class="character_avatar"
						>
							<v-img
								aspect-ratio="1/1"
								cover
								:src="characters.image"
							></v-img>
						</v-avatar>
					</div>
					<div class="d-flex flex-column">
						<v-card-title class="text-wrap pa-4">
							{{ characters.name }}
						</v-card-title>
						<div class="d-flex justify-center align-center pl-4">
							<v-avatar
								size="13"
								:color='color'
							></v-avatar>
							<v-card-text class="pa-1 pl-2 text-wrap">{{ characters.status }} - {{ characters.species }}
							</v-card-text>
						</div>
						<v-card-text class="pa-1 pl-4 text-wrap flex-0-0">Gender: {{ characters.gender }}</v-card-text>
						<v-card-text class="pa-1 pl-4 text-wrap flex-0-0">
							Origin: {{ characters.origin?.name }}
						</v-card-text>
						<v-card-text class="pa-1 pl-4 text-wrap flex-0-0">
							Last known location: {{ characters.location?.name }}
						</v-card-text>
					</div>
				</v-row>
				<v-row class="ma-0">
					<v-col class="d-flex justify-center flex-1-0-100">
						<h3>Episodes</h3>
					</v-col>
					<v-row class="ma-0">
						<v-col
							cols='12'
							md='6'
							sm='12'
							class='d-flex character-item'
							v-for='episode in episodes'
							:key='episode.id'
							v-if="episodes?.length>1"
						>
							<EpisodeCard :episode="episode"/>
						</v-col>
						<v-col
							cols='12'
							md='6'
							sm='12'
							class='d-flex character-item'
							v-else
						>
							<EpisodeCard :episode="episodes"/>
						</v-col>
					</v-row>
				</v-row>
			</v-card>
		</template>
	</v-container>
</template>
<style scoped>
</style>

