import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '@/http-common.js';
import { useMainStore } from '@/store/mainStore.js';
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/store/usersStore.js';
import { useSnackbarStore } from '@/store/snackbarStore.js';

export const useEpisodesStore = defineStore('EpisodesStore', () => {
	const episodes = ref([]);
	const pages = ref(0);
	const { countInfo } = useMainStore();
	const { loggedUser } = storeToRefs(useUsersStore());
	const { setSnackbarParams } = useSnackbarStore();

	function setLikedEpisodes() {
		return episodes.value.map(el => {
			el.isLiked =
				loggedUser.value.likedEpisodes !== undefined &&
				loggedUser.value.likedEpisodes.indexOf(el.id) !== -1;
			return el;
		});
	}

	function onEpisodeClick(episodeId) {
		if (Object.keys(loggedUser?.value).length) {
			const index = loggedUser.value.likedEpisodes.indexOf(episodeId);
			if (index === -1) {
				loggedUser.value.likedEpisodes.push(episodeId);
			} else {
				loggedUser.value.likedEpisodes.splice(index, 1);
			}
			if (episodes.value.length) setLikedEpisodes();
			else episodes.value.isLiked = !episodes.value.isLiked;
		} else {
			setSnackbarParams({ isOpen: true, message: "You're not loggedin.", color: 'red' });
		}
	}

	const getEpisodes = async (params = {}) => {
		const { data } = await axios.get('episode/', { params });
		countInfo.episodesCount = data.info.count;
		pages.value = data.info.pages;
		episodes.value = data.results;
		setLikedEpisodes();
	};

	const getEpisodesById = async idArr => {
		if (idArr.length === 0) {
			episodes.value = [];
			return;
		}

		try {
			if (typeof idArr === 'string') idArr = idArr.split(',').map(Number);

			const { data } = await axios.get(`episode/${idArr}`);
			episodes.value = idArr.length > 1 ? data : [data];

			if (episodes.value.length) setLikedEpisodes();
			else
				episodes.value.isLiked =
					loggedUser.value.likedEpisodes.indexOf(episodes.value.id) !== -1;
		} catch (e) {}
	};
	return { episodes, pages, getEpisodes, getEpisodesById, onEpisodeClick };
});
