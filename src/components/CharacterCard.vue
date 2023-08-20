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
	<v-card class="pa-4">
		<v-row class="ma-0" >
			<v-avatar
				color="surface-variant"
				size="164"
			>
				<v-img
					aspect-ratio="1/1"
					cover
					:src="character.image"
				></v-img>
			</v-avatar>
			<div class="d-flex flex-column">
				<v-card-title>{{ character.name }}</v-card-title>
				<div class="d-flex justify-center align-center pl-4">
					<v-avatar
						size="13"
						:color='color'
					></v-avatar>
					<v-card-text class="pa-1 pl-2">{{ character.status }} - {{character.species}}</v-card-text>
				</div>
				<v-card-text class="pa-1 pl-4">Gender: {{ character.gender }}</v-card-text>
				<v-card-text class="pa-1 pl-4">Last location: {{ character.location.name }}</v-card-text>
			</div>
		</v-row>
<!--		{{ character }}-->
	</v-card>
</template>
<style scoped>
</style>
