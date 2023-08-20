import {defineStore} from "pinia";
import {computed, ref} from "vue";
import axios from "@/http-common.js";
import {useMainStore} from "@/store/mainStore.js";

export const useLocationsStore = defineStore('locationsStore', () => {
	const locations = ref([])
	const {countInfo} = useMainStore()
	const getLocations = async () => {
		const {data} = await axios.get('location')
		countInfo.locationsCount = data.info.count

	}
	return {locations, getLocations}
})
