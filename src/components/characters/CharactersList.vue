<script setup>
import CharacterCard from '@/components/characters/CharacterCard.vue'
import TheLoader from '@/components/TheLoader.vue'

const props = defineProps({
	characters: {
		type: Object,
		required: true
	},
	loader: {
		type: Boolean,
		required: true
	}
})
</script>
<template>
	<v-container class='wrap lighten-5 pa-4'>
		<v-row class="mr-lg-n16">
			<template v-if='loader'>
				<v-col
					cols='12'
					md='6'
					sm='12'
					v-for='n in 10'
					class='pr-16 pl-16'
				>
					<TheLoader/>
				</v-col>
			</template>
			<template v-else>
				<v-col
					cols='12'
					md='6'
					sm='12'
					v-for='character in characters'
					:key='character.id'
					class='d-flex character-item'
				>
					<CharacterCard :character="character"/>
				</v-col>
			</template>
		</v-row>
	</v-container>
</template>

