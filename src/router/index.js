// Composables
import { createRouter, createWebHistory } from 'vue-router';
import { useUsersStore } from '@/store/usersStore.js';
import { useSnackbarStore } from '@/store/snackbarStore.js';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const routes = [
	{
		path: '/',
		component: () => import('@/layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'HomePage',
				component: () => import('@/pages/main/HomePage.vue')
			},
			{
				path: '/characters',
				name: 'CharactersPage',
				component: () => import('@/pages/main/CharactersPage.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: '/character',
				name: 'CharacterPage',
				component: () => import('@/pages/main/CharacterItemPage.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: '/locations',
				name: 'LocationsPage',
				component: () => import('@/pages/main/LocationsPage.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: '/location',
				name: 'LocationPage',
				component: () => import('@/pages/main/LocationItemPage.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: '/episodes',
				name: 'EpisodesPage',
				component: () => import('@/pages/main/EpisodesPage.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: '/episode',
				name: 'EpisodePage',
				component: () => import('@/pages/main/EpisodeItemPage.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: '/personal-page',
				name: 'PersonalPage',
				component: () => import('@/pages/main/PersonalPage.vue'),
				meta: { requiresAuth: true }
			}
		]
	},
	{
		path: '/auth/',
		component: () => import('@/layouts/AuthLayout.vue'),
		children: [
			{
				path: 'login',
				name: 'LoginPage',
				component: () => import('@/pages/auth/LogInPage.vue'),
				meta: { hideLogged: true }
			},
			{
				path: 'registration',
				name: 'RegistrationPage',
				component: () => import('@/pages/auth/RegistrationPage.vue'),
				meta: { hideLogged: true }
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach((to, from, next) => {
	const { loggedUser } = storeToRefs(useUsersStore());
	const { setSnackbarParams } = useSnackbarStore();
	const isLogged = ref(!!Object.keys(loggedUser?.value).length);

	const authReq = to.matched.some(route => route.meta.requiresAuth);
	const hideLog = to.matched.some(route => route.meta.hideLogged);
	//hideLog && isLogged.value

	if (hideLog && isLogged.value) {
		setSnackbarParams({ isOpen: true, message: "You're already loggedin.", color: 'red' });
		next({ name: 'HomePage' });
		return;
	}
	if (!authReq) {
		next();
		return;
	}
	if (authReq && isLogged.value) next();
	else {
		setSnackbarParams({ isOpen: true, message: "You're not loggedin.", color: 'red' });
		next({ name: 'HomePage' });
	}
});

export default router;
