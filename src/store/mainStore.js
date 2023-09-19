import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import { useTheme } from 'vuetify';

export const useMainStore = defineStore('mainStore', () => {
	const countInfo = reactive({
		charactersCount: 0,
		locationsCount: 0,
		episodesCount: 0
	});
	const theme = useTheme();
	const activeTheme = localStorage.getItem('theme');
	if (activeTheme) {
		theme.global.name.value = activeTheme;
	}
	watch(
		() => theme.global.name.value,
		state => {
			localStorage.setItem('theme', state);
		}
	);

	const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
	return { delay, countInfo };
});
