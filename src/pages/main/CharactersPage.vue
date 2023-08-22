<script setup>
import {useCharactersStore} from "@/store/charactersStore.js";
import {onMounted, ref, watch, watchEffect} from "vue";
import {storeToRefs} from "pinia"
import CharactersList from "@/components/characters/CharactersList.vue";

const loader = ref(false)
const {getCharacters} = useCharactersStore()
const {characters, pages} = storeToRefs(useCharactersStore())
const page = ref(1)

watchEffect(async () => {
	loader.value = true
	await getCharacters({page: page.value})
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
