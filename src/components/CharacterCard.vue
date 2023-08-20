<script setup>
import {ref} from "vue";

const props = defineProps({
	character: {
		type: Object,
		required: true
	}
})

const color = ref(undefined)
// console.log(props.character.status)
switch (props.character.status) {
	case 'Alive': {
		color.value = "green"
		break
	}
	case 'Dead': {
		color.value = "red"
		break
	}
	default: {
		color.value = "orange"
	}
}
</script>
<template>
	<v-card class="pa-4 flex-1-1">
		<v-row class="ma-0 character_row">
			<div class="character_avatar-wrapper">
				<v-avatar
					color="surface-variant"
					size="164"
					class="character_avatar"
				>
					<v-img
						aspect-ratio="1/1"
						cover
						:src="character.image"
					></v-img>
				</v-avatar>
			</div>
			<div class="d-flex flex-column">
				<v-card-title class="text-wrap">{{ character.name }}</v-card-title>
				<div class="d-flex justify-center align-center pl-4">
					<v-avatar
						size="13"
						:color='color'
					></v-avatar>
					<v-card-text class="pa-1 pl-2 text-wrap">{{ character.status }} - {{ character.species }}
					</v-card-text>
				</div>
				<v-card-text class="pa-1 pl-4 text-wrap">Gender: {{ character.gender }}</v-card-text>
				<v-card-text class="pa-1 pl-4 text-wrap">Last location: {{ character.location.name }}</v-card-text>
			</div>
		</v-row>
		<!--		{{ character }}-->
	</v-card>
</template>
<style
	scoped
	lang="scss"
>
.character {
	&_row {
		flex-wrap: nowrap;
		@media (max-width: 1280px) {
			flex-wrap: wrap;
		}
	}
	&_avatar-wrapper{
		@media (max-width: 1280px) {
			flex: 1 1 auto;
			display: flex;
			justify-content: center;
		}
		@media (max-width: 960px) {
			flex: 0 0 auto;
			display: flex;
			align-items: unset;
		}
		@media (max-width: 670px) {
			flex: 0 0 100%;
			display: flex;
			align-items: unset;
		}
	}
}
</style>
