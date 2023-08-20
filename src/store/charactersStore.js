import {defineStore} from "pinia";
import {computed, ref} from "vue";
import axios from "@/http-common.js";
import {useMainStore} from "@/store/mainStore.js";


export const useCharactersStore = defineStore('charactersStore', () => {
	const characters = ref([]);
	const {countInfo} = useMainStore();

	const getCharacters = async () => {
		try {
			const {data} = await axios.get('character')
			countInfo.charactersCount = data.info.count
		} catch (e) {
			console.log("Error")
		}
	};
	const getRandomCharacters = async () => {
		try {
			const {data} = await axios.get(`character/${generateRandomIds(10)}`)
			characters.value = data
		} catch (e) {
		}
	};

	const generateRandomIds = (count) => {
		const randomIdsArr = new Set()
		// loop for generating unique id`s
		while (randomIdsArr.size < count) {
			const charId = Math.floor(Math.random() * (countInfo.charactersCount + 1))
			randomIdsArr.add(charId)
		}
		return Array.from(randomIdsArr).toString()
	}
	return {characters, getCharacters, getRandomCharacters}
})
