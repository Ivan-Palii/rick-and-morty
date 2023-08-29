// Composables
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
	{
		path: '/',
		component: () => import('@/layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'HomePage',
				component: () => import('@/pages/main/HomePage.vue'),
			},
			{
				path: '/characters',
				name: 'CharactersPage',
				component: () => import('@/pages/main/CharactersPage.vue'),
			},
			{
				path: '/character',
				name: 'CharacterPage',
				component: () => import('@/pages/main/CharacterItemPage.vue')
			},
			{
				path: '/locations',
				name: 'LocationsPage',
				component: () => import('@/pages/main/LocationPage.vue'),
			},
			{
				path: '/location',
				name: 'LocationPage',
				component: () => import('@/pages/main/LocationItemPage.vue')
			},
			{
				path: '/episodes',
				name: 'EpisodesPage',
				component: () => import('@/pages/main/EpisodesPage.vue'),
			},
		],
	},
	{
		path: '/auth/',
		component: () => import('@/layouts/AuthLayout.vue'),
		children: [
			{
				path: 'login',
				name: 'LoginPage',
				component: () => import('@/pages/auth/LogInPage.vue')
			},
			{
				path: 'registration',
				name: 'RegistrationPage',
				component: () => import('@/pages/auth/RegistrationPage.vue')
			},
		],
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
