<script setup>
import {useCharactersStore} from "@/store/charactersStore.js";
import {useMainStore} from "@/store/mainStore.js";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia"
import TheLoader from "@/components/TheLoader.vue";
import CharacterCard from "@/components/CharacterCard.vue";

const loader = ref(false)
const {getRandomCharacters, getCharacters} = useCharactersStore()
const {characters} = storeToRefs(useCharactersStore())
// const charactersStore = useCharactersStore()

onMounted(async () => {
	loader.value = true
	await getCharacters()
	await getRandomCharacters()
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
					class='d-flex character-item'
				>
					<CharacterCard :character="character"/>
				</v-col>
			</template>
		</v-row>
	</v-container>
	{{ loader }}
</template>
<style
	scoped
	lang="scss"
>
.character-item {
//	 pr-16 pl-16

	padding: 12px 64px;
	@media (max-width: 960px) {
		padding: 8px 32px;
	}
}
</style>
