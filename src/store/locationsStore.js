import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '@/http-common.js';
import { useMainStore } from '@/store/mainStore.js';
import { useUsersStore } from '@/store/usersStore.js';
import { useSnackbarStore } from '@/store/snackbarStore.js';
import { storeToRefs } from 'pinia';

export const useLocationsStore = defineStore('locationsStore', () => {
	const locations = ref([]);
	const pages = ref(0);
	const { countInfo } = useMainStore();
	const { loggedUser } = storeToRefs(useUsersStore());
	const { setSnackbarParams } = useSnackbarStore();

	function setLikedLocations() {
		return locations.value.map(el => {
			el.isLiked =
				loggedUser.value.likedLocations !== undefined &&
				loggedUser.value.likedLocations.indexOf(el.id) !== -1;
			return el;
		});
	}

	function onLocationClick(locationId) {
		if (Object.keys(loggedUser?.value).length) {
			const index = loggedUser.value.likedLocations.indexOf(locationId);
			if (index === -1) {
				loggedUser.value.likedLocations.push(locationId);
			} else {
				loggedUser.value.likedLocations.splice(index, 1);
			}
			if (locations.value.length) setLikedLocations();
			else locations.value.isLiked = !locations.value.isLiked;
		} else {
			setSnackbarParams({ isOpen: true, message: "You're not loggedin.", color: 'red' });
		}
	}

	const getLocations = async (params = {}) => {
		const { data } = await axios.get('location/', { params });
		countInfo.locationsCount = data.info.count;
		pages.value = data.info.pages;
		locations.value = data.results;
		setLikedLocations();
	};

	const getLocationsById = async idArr => {
		if (idArr.length === 0) {
			locations.value = [];
			return;
		}
		try {
			if (typeof idArr === 'string') idArr = idArr.split(',').map(Number);
			const { data } = await axios.get(`location/${idArr}`);

			locations.value = idArr.length > 1 ? data : [data];
			if (locations.value.length) setLikedLocations();
			else
				locations.value.isLiked =
					loggedUser.value.likedLocations.indexOf(locations.value.id) !== -1;
		} catch (e) {}
	};
	return { locations, pages, getLocations, getLocationsById, onLocationClick };
});
