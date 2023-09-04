<script setup>
import { ref } from 'vue';
import { useMainStore } from '@/store/mainStore.js';
import { useUsersStore } from '@/store/usersStore.js';
import TheFooter from '@/components/TheFooter.vue';
import { storeToRefs } from 'pinia';
import router from '@/router/index.js';

const { loggedUser } = storeToRefs(useUsersStore());
const { logoutUser } = useUsersStore();
const initials = ref('');
const fullName = ref('');
const drawer = ref(false);
const isLogged = ref(!!Object.keys(loggedUser?.value).length);
if (isLogged.value) {
	initials.value = loggedUser.value.firstName[0] + loggedUser.value.lastName[0];
	fullName.value = loggedUser.value.firstName + ' ' + loggedUser.value.lastName;
}
const items = [
	{
		title: 'Home',
		value: 'home',
		to: { path: '/' }
	},
	{
		title: 'Characters',
		value: 'characters',
		to: { path: '/characters', query: { page: 1 } }
	},
	{
		title: 'Locations',
		value: 'locations',
		to: { path: '/locations', query: { page: 1 } }
	},
	{
		title: 'Episodes',
		value: 'episodes',
		to: { path: '/episodes', query: { page: 1 } }
	}
];
const logout = () => {
	logoutUser();
	router.go();
};
</script>
<template>
	<VLayout class="overflow-y-auto flex-column">
		<VAppBar
			color="primary"
			class="px-6"
			prominent
		>
			<VAppBarNavIcon
				v-if="isLogged"
				variant="text"
				@click.stop="drawer = !drawer"
			/>
			<VToolbarTitle>Rick and Morty</VToolbarTitle>
			<VSpacer />
			<VBtn
				v-if="!isLogged"
				:to="{ path: '/auth/login' }"
				variant="text"
				icon="mdi-login"
			/>
			<VMenu
				v-else
				bottom
				min-width="200"
				rounded
				offset-y
			>
				<template #activator="{ props }">
					<VBtn
						icon
						x-medium
						v-bind="props"
					>
						<VAvatar
							color="pink"
							size="36"
						>
							<VImg
								v-if="loggedUser.img"
								:src="loggedUser.img"
								alt=" "
							/>
							<span
								v-else
								class="white--text"
							>
								{{ initials }}
							</span>
						</VAvatar>
					</VBtn>
				</template>
				<VCard class="pa-2">
					<VList class="justify-center">
						<div class="mx-auto text-center">
							<VAvatar color="pink">
								<VImg
									v-if="loggedUser.img"
									:src="loggedUser.img"
									alt=" "
								/>
								<span
									v-else
									class="white--text text-h6"
								>
									{{ initials }}
								</span>
							</VAvatar>
							<h4 class="my-1">{{ fullName }}</h4>
							<p class="text-caption">
								{{ loggedUser.email }}
							</p>
							<VDivider class="my-2" />
							<VBtn
								:to="{ name: 'PersonalPage' }"
								variant="text"
								depressed
								rounded
								text
							>
								Go To Personal Page
							</VBtn>
							<VDivider class="my-2" />
							<VBtn
								variant="text"
								depressed
								rounded
								text
								@click="logout"
							>
								Logout
							</VBtn>
						</div>
					</VList>
				</VCard>
			</VMenu>
		</VAppBar>
		<VNavigationDrawer v-model="drawer">
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
			<RouterView />
		</VMain>
		<TheFooter />
	</VLayout>
</template>
<style scoped></style>
