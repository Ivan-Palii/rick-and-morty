<script setup>
import {useCharactersStore} from "@/store/charactersStore.js";
import {useMainStore} from "@/store/mainStore.js";
import {onMounted, ref} from "vue";
import TheLoader from "@/components/TheLoader.vue";
import CharacterCard from "@/components/CharacterCard.vue";

const loader = ref(false)
const {characters, getRandomCharacters, getCharacters} = useCharactersStore()

onMounted(async () => {
	loader.value = true
	await getCharacters()
	await getRandomCharacters()
	console.log("(In HomePage) Characters:", characters)
	loader.value = false
})
</script>
<template>
	<v-container class='wrap lighten-5 pa-4'>
		<v-row class="mr-lg-n16">
			<template v-if='loader'>
				<v-col
					cols='12'
					md='6'
					sm='12'
					v-for='n in 10'
					class='pr-16 pl-16'
				>
					<TheLoader/>
				</v-col>
			</template>
			<template v-else>
				<v-col
					cols='12'
					md='6'
					sm='12'
					v-for='character in characters'
					:key='character.id'
					class='pr-16 pl-16'
				>
					<CharacterCard :character="character"/>
				</v-col>
			</template>
		</v-row>
	</v-container>
	{{ loader }}
</template>
<style scoped>
</style>
