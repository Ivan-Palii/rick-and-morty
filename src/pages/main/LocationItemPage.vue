<script setup>
import { useCharactersStore } from '@/store/charactersStore.js';
import { useLocationsStore } from '@/store/locationsStore.js';
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/mainStore.js';
import ItemLoader from '@/components/ItemLoader.vue';
import CharacterCard from '@/components/characters/CharacterCard.vue';
import { useRoute } from 'vue-router';
import LikeBtn from '@/components/LikeBtn.vue';

const { delay } = useMainStore();
const { getCharactersById, onCharacterClick } = useCharactersStore();
const { getLocationsById, onLocationClick } = useLocationsStore();
const { characters } = storeToRefs(useCharactersStore());
const { locations } = storeToRefs(useLocationsStore());
const loader = ref(false);
const route = useRoute();
const location = ref();

watchEffect(async () => {
	loader.value = true;
	await delay(500);
	await getLocationsById(route.query.id);
	location.value = locations.value[0];
	await getCharactersById(location.value.residents.map(c => +c.split('/').pop()));
	loader.value = false;
});
</script>
<template>
	<VContainer class="wrap lighten-5 pa-4">
		<template v-if="loader">
			<ItemLoader />
		</template>
		<template v-else>
			<VCard>
				<VRow class="ma-0">
					<VCol>
						<VCardTitle>Name: {{ location.name }}</VCardTitle>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">
							Type: {{ location.type }}
						</VCardText>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">
							Dimension: {{ location.dimension }}
						</VCardText>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">
							Created:
							{{ new Date(Date.parse(location.created)).toLocaleDateString() }}
						</VCardText>
					</VCol>
				</VRow>
				<VRow class="ma-0">
					<VCol class="d-flex justify-center flex-1-0-100">
						<h3>Residents</h3>
					</VCol>
					<VCol
						v-for="character in characters"
						v-if="characters.length > 0"
						:key="character.id"
						cols="12"
						md="6"
						sm="12"
						class="d-flex"
					>
						<CharacterCard
							:character="character"
							:on-click="onCharacterClick"
						/>
					</VCol>
					<VCol
						v-else
						cols="12"
						md="12"
						sm="12"
						class="d-flex justify-center"
					>
						There are no residents here
					</VCol>
				</VRow>
				<LikeBtn
					:btn-active="location.isLiked"
					:item-id="location.id"
					:on-click="onLocationClick"
				/>
			</VCard>
		</template>
	</VContainer>
</template>
<style scoped></style>
