<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from 'vue-router';
import {storeToRefs} from "pinia"
import {useEpisodesStore} from "@/store/episodesStore.js";
import EpisodeCard from "@/components/episodes/EpisodeCard.vue";
import TheLoader from "@/components/TheLoader.vue"
import {useMainStore} from "@/store/mainStore.js";

const {delay} = useMainStore()
const {getEpisodes} = useEpisodesStore()
const {episodes, pages} = storeToRefs(useEpisodesStore())
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
	await getEpisodes()
	params.page = isQueryValid.value ? +route.query?.page : 1
})

watch(params, async () => {
	loader.value = true
	await delay(250).then(getEpisodes({page: params.page}))
	router.push({query: {page: params.page}})
	loader.value = false
})
watch(router.currentRoute, async (value, oldValue) => {
	if (oldValue.query.page === params.page.toString() && oldValue.path === value.path)
		params.page = +value.query.page
})
</script>
<template>
	<h1>Episodes</h1>
	<v-container class='wrap lighten-5 pa-4'>
		<v-row class="mr-lg-n16">
			<template v-if='loader'>
				<v-col
					cols='12'
					md='6'
					sm='12'
					v-for='n in 20'
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
					v-for='episode in episodes'
					:key='episode.id'
					class='d-flex character-item'
				>
					<EpisodeCard :episode="episode"/>
				</v-col>
			</template>
		</v-row>
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
	</v-container>
</template>
<style scoped>
</style>
