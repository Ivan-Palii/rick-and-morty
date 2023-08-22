<script setup>
import {useCharactersStore} from "@/store/charactersStore.js";
import {ref, watchEffect} from "vue";
import {storeToRefs} from "pinia"
import CharactersList from "@/components/characters/CharactersList.vue";
import {useMainStore} from "@/store/mainStore.js";

const {delay} = useMainStore()
const {getCharacters} = useCharactersStore()
const {characters, pages} = storeToRefs(useCharactersStore())
const page = ref(1)
const loader = ref(false)

watchEffect(async () => {
	loader.value = true
	await delay(250).then(getCharacters({page: page.value}))
	loader.value = false

})
</script>
<template>
	<h1>Characters</h1>
	<CharactersList
		:loader="loader"
		:characters="characters"
	/>
	<v-row class="d-flex justify-center">
		<v-col
			cols="6"
			md="6"
			sm="8"
		>
			<v-pagination
				:length="pages"
				v-model="page"
			></v-pagination>
		</v-col>
	</v-row>
</template>
<style scoped>
</style>
