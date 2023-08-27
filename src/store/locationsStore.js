import {defineStore} from "pinia";
import {computed, ref} from "vue";
import axios from "@/http-common.js";
import {useMainStore} from "@/store/mainStore.js";

export const useLocationsStore = defineStore('locationsStore', () => {
	const locations = ref([])
	const pages = ref(0)
	const {countInfo} = useMainStore()

	const getLocations = async (params = {}) => {
		const {data} = await axios.get('location/', {params})
		countInfo.locationsCount = data.info.count
		pages.value = data.info.pages
		locations.value = data.results
	}
	return {locations, pages, getLocations}
})
