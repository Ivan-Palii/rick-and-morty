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

	const checkEmail = user => {
		return !!users.value.filter(u => u.email === user.email).length;
	};

	return { users, addNewUser, checkEmail };
});
