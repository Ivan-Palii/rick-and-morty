<script setup>
import { useCharactersStore } from '@/store/charactersStore.js';
import { useEpisodesStore } from '@/store/episodesStore.js';
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/mainStore.js';
import ItemLoader from '@/components/ItemLoader.vue';
import CharacterCard from '@/components/characters/CharacterCard.vue';
import { useRoute } from 'vue-router';
import LikeBtn from '@/components/LikeBtn.vue';

const { delay } = useMainStore();
const { getCharactersById, onCharacterClick } = useCharactersStore();
const { getEpisodesById, onEpisodeClick } = useEpisodesStore();
const { characters } = storeToRefs(useCharactersStore());
const { episodes } = storeToRefs(useEpisodesStore());

const loader = ref(false);
const route = useRoute();
const episode = ref()

watchEffect(async () => {
	loader.value = true;
	await delay(500);
	await getEpisodesById(route.query.id);
	episode.value = episodes.value[0]
	await getCharactersById(episode.value.characters.map(c => +c.split('/').pop()));
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
						<VCardTitle>{{ episode.name }}</VCardTitle>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">
							Air date: {{ episode.air_date }}
						</VCardText>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">
							Episode: {{ episode.episode }}
						</VCardText>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">
							Created:
							{{ new Date(Date.parse(episode.created)).toLocaleDateString() }}
						</VCardText>
					</VCol>
				</VRow>
				<VRow class="ma-0">
					<VCol class="d-flex justify-center flex-1-0-100">
						<h3>Seen in the episode</h3>
					</VCol>
					<VCol
						v-for="character in characters"
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
				</VRow>
				<LikeBtn
					:btn-active="episode.isLiked"
					:on-click="onEpisodeClick"
					:item-id="episode.id"
				/>
			</VCard>
		</template>
	</VContainer>
</template>
<style scoped></style>
