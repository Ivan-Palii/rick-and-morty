import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "@/http-common.js";
import {useMainStore} from "@/store/mainStore.js";

export const useEpisodesStore = defineStore('EpisodesStore', () => {
	const episodes = ref([])
	const pages = ref(0)
	const {countInfo} = useMainStore()

	const getEpisodes = async (params = {}) => {
		const {data} = await axios.get('episode/', {params})
		countInfo.episodesCount = data.info.count
		pages.value = data.info.pages
		episodes.value = data.results
	}
	return {episodes, pages, getEpisodes}
})
