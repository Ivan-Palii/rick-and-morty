<script setup>
import { useCharactersStore } from '@/store/charactersStore.js';
import { useEpisodesStore } from '@/store/episodesStore.js';
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/mainStore.js';
import ItemLoader from '@/components/ItemLoader.vue';
import EpisodeCard from '@/components/episodes/EpisodeCard.vue';
import { useRoute } from 'vue-router';
import LikeBtn from '@/components/LikeBtn.vue';

const { delay } = useMainStore();
const { getCharactersById, onCharacterClick } = useCharactersStore();
const { characters } = storeToRefs(useCharactersStore());
const { getEpisodesById, onEpisodeClick } = useEpisodesStore();
const { episodes } = storeToRefs(useEpisodesStore());

const loader = ref(false);
const route = useRoute();
const character = ref()


watchEffect(async () => {
	loader.value = true;
	await delay(500);
	await getCharactersById(route.query.id);
	character.value = characters.value[0]
	await getEpisodesById(character.value.episode.map(e => e.split('/').pop()));
	setColor();
	loader.value = false;
});

const color = ref(undefined);

function setColor() {
	switch (character.value.status) {
		case 'Alive': {
			color.value = 'green';
			break;
		}
		case 'Dead': {
			color.value = 'red';
			break;
		}
		default: {
			color.value = 'orange';
		}
	}
}
</script>
<template>
	<VContainer class="wrap lighten-5 pa-4">
		<template v-if="loader">
			<ItemLoader />
		</template>
		<template v-else>
			<VCard>
				<VRow class="ma-0">
					<div class="pa-4">
						<VAvatar
							color="surface-variant"
							size="164"
						>
							<VImg
								:src="character.image"
								aspect-ratio="1/1"
								cover
							/>
						</VAvatar>
					</div>
					<div class="d-flex flex-column">
						<VCardTitle class="text-wrap pa-4">
							{{ character.name }}
						</VCardTitle>
						<div class="d-flex justify-center align-center pl-4">
							<VAvatar
								:color="color"
								size="13"
							/>
							<VCardText class="pa-1 pl-2 text-wrap">
								{{ character.status }} - {{ character.species }}
							</VCardText>
						</div>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">
							Gender: {{ character.gender }}
						</VCardText>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">
							Origin:
							<RouterLink
								v-if="character.origin.url"
								:to="{
									path: 'location',
									query: { id: character.origin.url.split('/').pop() }
								}"
								class="link"
							>
								{{ character.origin?.name }}
							</RouterLink>
							<span v-else>
								{{ character.origin?.name }}
							</span>
						</VCardText>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">
							Last known location:
							<RouterLink
								:to="{
									path: 'location',
									query: { id: character.location.url.split('/').pop() }
								}"
								class="link"
							>
								{{ character.location?.name }}
							</RouterLink>
						</VCardText>
						<VCardText class="pa-1 pl-4 text-wrap flex-0-0">
							First seen in:
							<RouterLink
								:to="{
									path: 'episode',
									query: {
										id: episodes?.length > 1 ? episodes[0].id : episodes.id
									}
								}"
								class="link"
							>
								{{ episodes?.length > 1 ? episodes[0].name : episodes.name }}
							</RouterLink>
						</VCardText>
					</div>
				</VRow>
				<VRow class="ma-0">
					<VCol class="d-flex justify-center flex-1-0-100">
						<h3>Episodes</h3>
					</VCol>
					<VRow class="ma-0">
						<VCol
							v-for="episode in episodes"
							v-if="episodes?.length > 1"
							:key="episode.id"
							cols="12"
							md="6"
							sm="12"
							class="d-flex"
						>
							<EpisodeCard
								:episode="episode"
								:on-click="onEpisodeClick"
							/>
						</VCol>
						<VCol
							v-else
							cols="12"
							md="6"
							sm="12"
							class="d-flex"
						>
							<EpisodeCard
								:episode="episodes"
								:on-click="onEpisodeClick"
							/>
						</VCol>
					</VRow>
				</VRow>
				<LikeBtn
					:item-id="character.id"
					:btn-active="character.isLiked"
					:on-click="onCharacterClick"
				/>
			</VCard>
		</template>
	</VContainer>
</template>
<style scoped></style>
