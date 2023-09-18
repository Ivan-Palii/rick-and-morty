<script setup>
import { ref, watch, watchEffect } from 'vue';
import { useUsersStore } from '@/store/usersStore.js';
import { useCharactersStore } from '@/store/charactersStore.js';
import { useLocationsStore } from '@/store/locationsStore.js';
import { useEpisodesStore } from '@/store/episodesStore.js';
import { useMainStore } from '@/store/mainStore.js';
import { storeToRefs } from 'pinia';
import RemoveLikedItem from '@/components/RemoveLikedItem.vue';

const tab = ref();
const categories = ref(['Characters', 'Episodes', 'Locations']);
const { loggedUser } = storeToRefs(useUsersStore());
const { characters } = storeToRefs(useCharactersStore());
const { locations } = storeToRefs(useLocationsStore());
const { episodes } = storeToRefs(useEpisodesStore());

const { delay } = useMainStore();
const { getCharactersById } = useCharactersStore();
const { getLocationsById } = useLocationsStore();
const { getEpisodesById } = useEpisodesStore();

const characterHeaders = ref([
	{ title: '', sortable: false, key: 'image' },
	{ title: 'Name', sortable: false, align: 'start', key: 'name' },
	{ title: 'Gender', key: 'gender' },
	{ title: 'Status', key: 'status' },
	{ title: 'Origin', key: 'origin.name' },
	{ title: 'Last known location', key: 'location.name' },
	{ title: 'Created', key: 'created' }
]);

const locationsHeaders = ref([
	{ title: 'Name', sortable: false, align: 'start', key: 'name' },
	{ title: 'Type', key: 'type' },
	{ title: 'Dimension', key: 'dimension' },
	{ title: 'Created', key: 'created' }
]);

const episodesHeaders = ref([
	{ title: 'Name', sortable: false, align: 'start', key: 'name' },
	{ title: 'Episode', key: 'episode' },
	{ title: 'Air date', key: 'air_date' },
	{ title: 'Created', key: 'created' }
]);

const headers = ref();
const items = ref();
const destination = ref();
const loading = ref(false);
const search = ref('');

watch(
	loggedUser,
	async () => {
		loading.value = true;
		await delay(200);
		await getCharactersById(loggedUser.value.likedCharacters);
		await getLocationsById(loggedUser.value.likedLocations);
		await getEpisodesById(loggedUser.value.likedEpisodes);
		loading.value = false;
	},
	{ immediate: true, deep: true }
);

watchEffect(() => {
	switch (tab.value) {
		case 0: {
			headers.value = characterHeaders.value;
			items.value = characters.value;
			destination.value = 'character';
			break;
		}
		case 1: {
			headers.value = episodesHeaders.value;
			items.value = episodes.value;
			destination.value = 'episode';
			break;
		}
		case 2: {
			headers.value = locationsHeaders.value;
			items.value = locations.value;
			destination.value = 'location';
			break;
		}
	}
});
</script>
<template>
	<VCard class="mt-4 pa-4">
		<VTabs
			v-model="tab"
			align-tabs="end"
		>
			<VTab
				v-for="item in categories"
				:key="item"
			>
				{{ item }}
			</VTab>
		</VTabs>

		<VCardText>
			<VWindow v-model="tab">
				<VWindowItem
					v-for="n in 3"
					:key="n"
				>
					<VCardTitle class="d-flex align-center">
						{{ categories[n - 1] }}
						<VSpacer />
						<VTextField
							v-model="search"
							label="Search"
							variant="outlined"
							class="flex-0-1-5"
							append-inner-icon="mdi-magnify"
							single-line
							hide-details
						/>
					</VCardTitle>
					<VDataTable
						v-if="!loading"
						:headers="headers"
						:items="items"
						:search="search"
						class="elevation-1"
						density="compact"
						item-key="name"
						show-select
						select-strategy="single"
					>
						<template #item.data-table-select="{ item }">
							<RemoveLikedItem
								:item="item"
								:tab="tab"
							/>
						</template>
						<template #item.image="{ item }">
							<VAvatar>
								<VImg :src="item.selectable.image" />
							</VAvatar>
						</template>
						<template #item.name="{ item }">
							<RouterLink
								:to="{ path: destination, query: { id: item.selectable.id } }"
								class="link"
							>
								{{ item.selectable.name }}
							</RouterLink>
						</template>
						<template #item.origin.name="{ item }">
							<RouterLink
								v-if="item.selectable.origin.url"
								:to="{
									path: 'location',
									query: { id: +item.selectable.origin.url.split('/').pop() }
								}"
								class="link"
							>
								{{ item.selectable.origin.name }}
							</RouterLink>
							<template v-else>
								{{ item.selectable.origin.name }}
							</template>
						</template>
						<template #item.location.name="{ item }">
							<RouterLink
								v-if="item.selectable.location.url"
								:to="{
									path: 'location',
									query: { id: +item.selectable.location.url.split('/').pop() }
								}"
								class="link"
							>
								{{ item.selectable.location.name }}
							</RouterLink>
							<template v-else>
								{{ item.selectable.location.name }}
							</template>
						</template>
						<template #item.created="{ item }">
							{{
								new Date(Date.parse(item.selectable.created)).toLocaleDateString(
									'gb'
								)
							}}
						</template>
					</VDataTable>
				</VWindowItem>
			</VWindow>
		</VCardText>
	</VCard>
</template>
<style scoped></style>
