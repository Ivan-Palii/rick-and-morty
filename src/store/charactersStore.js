import {defineStore} from "pinia";
import {computed, ref, watch} from "vue";
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
		console.log('called')
		try {
			// check if charactersCount != 0
			if (!countInfo.charactersCount) {
				throw 'Error'
			}
			characters.value = []

			// loop for generating unique id`s
			while (characters.value.length < 10) {
				const charId = Math.floor(Math.random() * (countInfo.charactersCount + 1))
				if (characters.value.indexOf(charId) === -1)
					characters.value.push(charId)
			}

			const {data} = await axios.get('character/' + characters.value.toString())

			characters.value = data
			console.log('(In charastersStore) Characters:', characters.value)
			console.log('done')
		} catch (e) {

		}
	};
	return {characters, getCharacters, getRandomCharacters}
})
