<script setup>
import {useCharactersStore} from "@/store/charactersStore.js";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from 'vue-router';
import {storeToRefs} from "pinia"
import CharactersList from "@/components/characters/CharactersList.vue";
import {useMainStore} from "@/store/mainStore.js";

const {delay} = useMainStore()
const {getCharacters} = useCharactersStore()
const {characters, pages} = storeToRefs(useCharactersStore())
const loader = ref(false)
const router = useRouter()
const route = useRoute()

const isQueryValid = computed(() => {
	return (route.query.page > 0 && route.query.page < pages.value)
})

const params = reactive({
	page: undefined
})

onMounted(async () => {
	await getCharacters()
	params.page = isQueryValid.value ? +route.query?.page : 1
})

watch(params, async () => {
	loader.value = true
	await delay(250).then(getCharacters({page: params.page}))
	router.push({query: {page: params.page}})
	loader.value = false
})
watch(router.currentRoute, async (value, oldValue) => {
	if (oldValue.query.page === params.page.toString() && oldValue.path === value.path)
		params.page = +value.query.page
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
				v-model="params.page"
			></v-pagination>
		</v-col>
	</v-row>
</template>
<style scoped>
</style>
