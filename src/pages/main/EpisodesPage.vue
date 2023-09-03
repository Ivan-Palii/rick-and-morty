<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useEpisodesStore } from '@/store/episodesStore.js';
import EpisodeCard from '@/components/episodes/EpisodeCard.vue';
import TheLoader from '@/components/TheLoader.vue';
import { useMainStore } from '@/store/mainStore.js';

const { delay } = useMainStore();
const { getEpisodes, onEpisodeClick } = useEpisodesStore();
const { episodes, pages } = storeToRefs(useEpisodesStore());

const loader = ref(false);
const router = useRouter();
const route = useRoute();

const isQueryValid = computed(() => {
	return route.query.page > 0 && route.query.page < pages.value;
});

const params = reactive({
	page: undefined
});

onMounted(async () => {
	await getEpisodes();
	params.page = isQueryValid.value ? +route.query?.page : 1;
});

watch(params, async () => {
	loader.value = true;
	await delay(250).then(getEpisodes({ page: params.page }));
	router.push({ query: { page: params.page } });
	loader.value = false;
});
watch(router.currentRoute, async (value, oldValue) => {
	console.log(oldValue);
	if (oldValue.query.page === params.page.toString() && oldValue.path === value.path)
		params.page = +value.query.page;
});
</script>
<template>
	<h1>Episodes</h1>
	<VContainer class="wrap lighten-5 pa-4">
		<VRow>
			<template v-if="loader">
				<VCol
					v-for="n in 20"
					cols="12"
					md="6"
					sm="12"
					class="pr-16 pl-16"
				>
					<TheLoader />
				</VCol>
			</template>
			<template v-else>
				<VCol
					v-for="episode in episodes"
					:key="episode.id"
					cols="12"
					md="6"
					sm="12"
					class="d-flex character-item"
				>
					<EpisodeCard
						:episode="episode"
						:on-click="onEpisodeClick"
					/>
				</VCol>
			</template>
		</VRow>
		<VRow class="d-flex justify-center">
			<VCol
				cols="6"
				md="6"
				sm="8"
			>
				<VPagination
					v-model="params.page"
					:length="pages"
				/>
			</VCol>
		</VRow>
	</VContainer>
</template>
<style scoped></style>
