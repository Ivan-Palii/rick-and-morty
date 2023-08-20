import {defineStore} from "pinia";
import {computed, ref} from "vue";
import axios from "@/http-common.js";
import {useMainStore} from "@/store/mainStore.js";

export const useEpisodesStore = defineStore('EpisodesStore', () => {
	const episodes = ref([])
	const {countInfo} = useMainStore()


	const getEpisodes = async () => {
		const {data} = await axios.get('episode')
		countInfo.episodesCount = data.info.count

	}
	return {episodes, getEpisodes}
})
