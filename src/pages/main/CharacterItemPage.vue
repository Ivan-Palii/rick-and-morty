<script setup>
import {useCharactersStore} from "@/store/charactersStore.js";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia"
import {useMainStore} from "@/store/mainStore.js";
import ItemLoader from "@/components/ItemLoader.vue";
import EpisodeCard from "@/components/episodes/EpisodeCard.vue";
import {useRoute} from 'vue-router';

const {delay} = useMainStore()
const {getCharacter} = useCharactersStore()
const {characters, pages} = storeToRefs(useCharactersStore())
const loader = ref(false)
const route = useRoute()

onMounted(async () => {
	loader.value = true
	console.log(route.query.id)
	await delay(500)
	await getCharacter(route.query.id)
	loader.value = false
})
</script>
<template>
	<v-container class='wrap lighten-5 pa-4'>

		<template v-if='loader'>
			<ItemLoader/>
		</template>
		<template v-else>
			{{ characters }}
		</template>
	</v-container>
</template>
<style scoped>
</style>
