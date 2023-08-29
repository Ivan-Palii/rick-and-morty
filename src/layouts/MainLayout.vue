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
	<VLayout class="overflow-y-auto flex-column">
		<VAppBar
			color="primary"
			prominent
		>
			<VAppBarNavIcon
				variant="text"
				@click.stop="drawer = !drawer"
			/>
			<VToolbarTitle>Rick and Morty</VToolbarTitle>
			<VSpacer/>
			<RouterLink :to="{path:'/auth/login'}">
				<VBtn
					variant="text"
					icon="mdi-login"
				/>
			</RouterLink>
		</VAppBar>
		<VNavigationDrawer
			v-model="drawer"
		>
			<VList
				nav
				dense
			>
				<VListItem
					v-for="(item, i) in items"
					:to="item.to"
					:key="i"
					link
				>
					{{ item.title }}
				</VListItem>
			</VList>
		</VNavigationDrawer>
		<VMain class="flex-1-1">
			<RouterView/>
		</VMain>
		<TheFooter/>
	</VLayout>
</template>
<style scoped>
</style>
