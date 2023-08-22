<script setup>
import {useCharactersStore} from "@/store/charactersStore.js";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia"
import CharactersList from "@/components/characters/CharactersList.vue";
import {useMainStore} from "@/store/mainStore.js";

const loader = ref(false)
const {delay} = useMainStore()
const {getRandomCharacters, getCharacters} = useCharactersStore()
const {characters} = storeToRefs(useCharactersStore())
// const charactersStore = useCharactersStore()

onMounted(async () => {
	loader.value = true
	// await getCharacters()
	await delay(500)
	await getRandomCharacters()
	loader.value = false
})
</script>
<template>
	<CharactersList
		:characters="characters"
		:loader="loader"
	/>
</template>
