<script setup>
import {ref} from "vue";
import {useMainStore} from "@/store/mainStore.js";
import TheFooter from "@/components/TheFooter.vue";

const drawer = ref(false)

const items = [
	{
		title: 'Home',
		value: 'home',
		to: {path: '/'},
	},
	{
		title: 'Characters',
		value: 'characters',
		to: {path: '/characters', query: {page: 1}},
	},
	{
		title: 'Locations',
		value: 'locations',
		to: {path: '/locations', query: {page: 1}},
	},
	{
		title: 'Episodes',
		value: 'episodes',
		to: {path: '/episodes', query: {page: 1}},
	},
]
</script>
<template>
	<v-layout class="overflow-y-auto flex-column">
		<!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
		<v-app-bar
			color="primary"
			prominent
		>
			<v-app-bar-nav-icon
				variant="text"
				@click.stop="drawer = !drawer"
			></v-app-bar-nav-icon>
			<v-toolbar-title>Rick and Morty</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn
				variant="text"
				icon="mdi-magnify"
			></v-btn>
			<v-btn
				variant="text"
				icon="mdi-filter"
			></v-btn>
			<v-btn
				variant="text"
				icon="mdi-dots-vertical"
			></v-btn>
		</v-app-bar>
		<v-navigation-drawer
			v-model="drawer"
		>
			<v-list
				nav
				dense
			>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					link
				>
					{{ item.title }}
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main class="flex-1-1">
			<router-view/>
		</v-main>
		<TheFooter/>
	</v-layout>
</template>
<style scoped>
</style>
