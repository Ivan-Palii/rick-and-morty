<script setup>
import CharacterCard from '@/components/characters/CharacterCard.vue';
import TheLoader from '@/components/TheLoader.vue';
import { useCharactersStore } from '@/store/charactersStore.js';

const { onCharacterClick } = useCharactersStore();
const props = defineProps({
	characters: {
		type: Object,
		required: true
	},
	loader: {
		type: Boolean,
		required: true
	}
});
</script>
<template>
	<VContainer class="wrap lighten-5 pa-4">
		<VRow>
			<template v-if="loader">
				<VCol
					v-for="n in 10"
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
					v-for="character in characters"
					:key="character.id"
					cols="12"
					md="6"
					sm="12"
					class="d-flex character-item"
				>
					<CharacterCard
						:character="character"
						:on-click="onCharacterClick"
					/>
				</VCol>
			</template>
		</VRow>
	</VContainer>
</template>
