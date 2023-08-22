import {defineStore} from "pinia";
import {reactive} from "vue";

export const useMainStore = defineStore('mainStore', () => {
	const countInfo = reactive({
		charactersCount: 0,
		locationsCount: 0,
		episodesCount: 0,
	})
	const delay = (ms) =>  new Promise(resolve => setTimeout(resolve,ms))
	return {delay, countInfo}
})
