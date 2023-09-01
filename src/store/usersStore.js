import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useUsersStore = defineStore('usersStore', () => {
	const users = ref([]);
	const usersInLocalStorage = localStorage.getItem('users');
	if (usersInLocalStorage) {
		users.value = JSON.parse(usersInLocalStorage)._value;
	}

	watch(
		() => users,
		state => {
			localStorage.setItem('users', JSON.stringify(state));
		},
		{ deep: true }
	);

	const addNewUser = user => {
		users.value.push(user);
	};

	return { users, addNewUser };
});
