<script setup>
import LocationCard from "@/components/locations/LocationCard.vue";
import {ref, watchEffect} from "vue";
import {useMainStore} from "@/store/mainStore.js";
import {useLocationsStore} from "@/store/locationsStore.js";
import {storeToRefs} from "pinia";
import TheLoader from "@/components/TheLoader.vue";

const {delay} = useMainStore()
const {getLocations} = useLocationsStore()
const {locations, pages} = storeToRefs(useLocationsStore())
const page = ref(1)
const loader = ref(false)

watchEffect(async () => {
	loader.value = true
	await delay(250).then(getLocations({page}))
	loader.value = false
})
</script>
<template>
	<h1>Locations</h1>
	{{ pages }}
	<v-container class='wrap lighten-5 pa-4'>
		<v-row class="mr-lg-n16">
			<template v-if='loader'>
				<v-col
					cols='12'
					md='6'
					sm='12'
					v-for='n in 20'
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
					v-for='location in locations'
					:key='location.id'
					class='d-flex character-item'
				>
					<LocationCard :location="location"/>
				</v-col>
			</template>
		</v-row>
		<v-row class="d-flex justify-center">
			<v-col
				cols="6"
				md="6"
				sm="8"
			>
				{{ pages }}
				<v-pagination
					:length="pages"
					v-model="page"
				></v-pagination>
			</v-col>
		</v-row>
	</v-container>
</template>
<style scoped>
</style>
