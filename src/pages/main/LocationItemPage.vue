<script setup>
import {useCharactersStore} from "@/store/charactersStore.js";
import {useLocationsStore} from "@/store/locationsStore.js"
import {onMounted, ref, watchEffect} from "vue";
import {storeToRefs} from "pinia"
import {useMainStore} from "@/store/mainStore.js";
import ItemLoader from "@/components/ItemLoader.vue";
import CharacterCard from "@/components/characters/CharacterCard.vue";
import {useRoute} from 'vue-router';

const {delay} = useMainStore()
const {getCharactersById} = useCharactersStore()
const {getLocationsById} = useLocationsStore()
const {characters} = storeToRefs(useCharactersStore())
const {locations} = storeToRefs(useLocationsStore())
const loader = ref(false)
const route = useRoute()
const residentsShow = ref(false)

watchEffect(async () => {
	loader.value = true
	await delay(500)
	await getLocationsById(route.query.id)
	const charIds = locations.value.residents.map(l => l.split('/').pop())
	if (charIds.length) {
		await getCharactersById(charIds)
		residentsShow.value = true
	}
	console.log(locations.value.residents.map(l => l.split('/').pop()))
	loader.value = false
})
</script>
<template>
	<v-container class='wrap lighten-5 pa-4'>
		<template v-if='loader'>
			<ItemLoader/>
		</template>
		<template v-else>
			<v-card>
				<v-row class="ma-0">
					<v-col>
						<v-card-title>Name: {{ locations.name }}</v-card-title>
						<v-card-text class="pa-1 pl-4 text-wrap flex-0-0">Type: {{ locations.type }}</v-card-text>
						<v-card-text class="pa-1 pl-4 text-wrap flex-0-0">Dimension: {{ locations.dimension }}
						</v-card-text>
						<v-card-text class="pa-1 pl-4 text-wrap flex-0-0">Created:
							{{ (new Date(Date.parse(locations.created)).toLocaleDateString()) }}
						</v-card-text>
					</v-col>
				</v-row>
				<v-row class="ma-0">
					<v-col class="d-flex justify-center flex-1-0-100">
						<h3>Residents</h3>
					</v-col>
					<v-col v-if="!residentsShow"></v-col>
					<v-col
						cols='12'
						md='6'
						sm='12'
						class='d-flex'
						v-for='character in characters'
						:key='character.id'
						v-else-if="characters?.length>1"
					>
						<CharacterCard :character="character"/>
					</v-col>
					<v-col
						cols='12'
						md='6'
						sm='12'
						class='d-flex'
						v-else
					>
						<CharacterCard :character="characters"/>
					</v-col>
				</v-row>
			</v-card>
		</template>
	</v-container>
</template>
<style scoped>
</style>
