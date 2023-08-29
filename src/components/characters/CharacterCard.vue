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
			<v-col
				cols='10'
				lg='4'
				md='6'
				sm='12'
			>
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
			</v-col>
			<div class="d-flex flex-column">
				<v-card-title class="text-wrap flex-0-1">
					<router-link :to="{path:'character',query:{id:character.id}}">
						{{ character.name }}
					</router-link>
				</v-card-title>
				<div class="d-flex flex-0-1 justify-center align-center pl-4">
					<v-avatar
						size="13"
						:color='color'
					></v-avatar>
					<v-card-text class="pa-1 pl-2 text-wrap ">
						{{ character.status }} - {{ character.species }}
					</v-card-text>
				</div>
				<v-card-text class="pa-1 pl-4 text-wrap flex-0-1">Gender: {{ character.gender }}</v-card-text>
				<v-card-text class="pa-1 pl-4 text-wrap flex-0-1">
					Last location:
					<router-link :to="{path:'location',query: {id:character.location.url.split('/').pop()}}">
						{{ character.location.name }}
					</router-link>
				</v-card-text>
			</div>
		</v-row>
		<!--		{{ character }}-->
	</v-card>
</template>
<style
	scoped
	lang="scss"
>
</style>
