import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import axios from '@/http-common.js';
import { useMainStore } from '@/store/mainStore.js';
import { useUsersStore } from '@/store/usersStore.js';
import { useSnackbarStore } from '@/store/snackbarStore.js';

export const useCharactersStore = defineStore('charactersStore', () => {
	const characters = ref([]);
	const pages = ref(0);
	const { countInfo } = useMainStore();
	const { loggedUser } = storeToRefs(useUsersStore());
	const { setSnackbarParams } = useSnackbarStore();

	function setLikedCharacters() {
		return characters.value.map(el => {
			el.isLiked =
				loggedUser.value.likedCharacters !== undefined &&
				loggedUser.value.likedCharacters.indexOf(el.id) !== -1;
			return el;
		});
	}

	function onCharacterClick(charId) {
		if (Object.keys(loggedUser?.value).length) {
			const index = loggedUser.value.likedCharacters.indexOf(charId);
			if (index === -1) {
				loggedUser.value.likedCharacters.push(charId);
			} else {
				loggedUser.value.likedCharacters.splice(index, 1);
			}
			console.log(!characters.value.length, characters.value.length);
			if (characters.value.length) setLikedCharacters();
			else characters.value.isLiked = !characters.value.isLiked;
		} else {
			setSnackbarParams({ isOpen: true, message: "You're not loggedin.", color: 'red' });
		}
	}

	const getCharacters = async (params = {}) => {
		try {
			const { data } = await axios.get('character/', { params });
			countInfo.charactersCount = data.info.count;
			characters.value = data.results;
			characters.value = setLikedCharacters();
			pages.value = data.info.pages;
		} catch (e) {
			console.log('Error');
		}
	};

	const getCharactersById = async idArr => {
		try {
			const { data } = await axios.get(`character/${idArr}`);
			characters.value = data;
			characters.value.isLiked =
				loggedUser.value.likedCharacters !== undefined &&
				loggedUser.value.likedCharacters.indexOf(characters.value.id) !== -1;
		} catch (e) {}
	};

	const getRandomCharacters = async () => {
		try {
			const { data } = await axios.get(`character/${generateRandomIds(10)}`);
			characters.value = data;
			characters.value = setLikedCharacters();
		} catch (e) {}
	};

	const generateRandomIds = count => {
		const randomIdsArr = new Set();
		// loop for generating unique id`s
		while (randomIdsArr.size < count) {
			const charId = Math.floor(Math.random() * (countInfo.charactersCount + 1));
			randomIdsArr.add(charId);
		}
		return Array.from(randomIdsArr).toString();
	};
	return {
		characters,
		pages,
		getCharacters,
		getCharactersById,
		getRandomCharacters,
		onCharacterClick
	};
});
