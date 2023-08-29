<script setup>
import {useCharactersStore} from "@/store/charactersStore.js";
import {useLocationsStore} from "@/store/locationsStore.js"
import { ref, watchEffect} from "vue";
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
	<VContainer class='wrap lighten-5 pa-4'>
		<template v-if='loader'>
			<ItemLoader/>
		</template>
		<template v-else>
			<VCard>
				<VRow class="ma-0">
					<VCol>
						<VCardTitle>Name: {{ locations.name }}</VCardTitle>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">Type: {{ locations.type }}</VCardText>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">Dimension: {{ locations.dimension }}
						</VCardText>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">Created:
							{{ (new Date(Date.parse(locations.created)).toLocaleDateString()) }}
						</VCardText>
					</VCol>
				</VRow>
				<VRow class="ma-0">
					<VCol class="d-flex justify-center flex-1-0-100">
						<h3>Residents</h3>
					</VCol>
					<VCol v-if="!residentsShow" class="d-flex justify-center flex-1-0-100">
						<h4>There are no residents here</h4>
					</VCol>
					<VCol
						v-for='character in characters'
						v-else-if="characters?.length>1"
						:key='character.id'
						cols='12'
						md='6'
						sm='12'
						class='d-flex'
					>
						<CharacterCard :character="character"/>
					</VCol>
					<VCol
						v-else
						cols='12'
						md='6'
						sm='12'
						class='d-flex'
					>
						<CharacterCard :character="characters"/>
					</VCol>
				</VRow>
			</VCard>
		</template>
	</VContainer>
</template>
<style scoped>
</style>
