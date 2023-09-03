import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useUsersStore = defineStore('usersStore', () => {
	const users = ref([]);
	const loggedUser = ref({});
	const usersInLocalStorage = localStorage.getItem('users');
	if (usersInLocalStorage) {
		users.value = JSON.parse(usersInLocalStorage)._value;
	}
	const loggedUserInLocalStorage = localStorage.getItem('loggedUser');
	if (loggedUserInLocalStorage) {
		loggedUser.value = JSON.parse(loggedUserInLocalStorage)._value;
	}
	// watch for users changes
	watch(
		() => users,
		state => {
			localStorage.setItem('users', JSON.stringify(state));
		},
		{ deep: true }
	);

	// watch for logged user changes
	watch(
		() => loggedUser,
		state => {
			localStorage.setItem('loggedUser', JSON.stringify(state));
			users.value = users.value.map(el => {
				if (el.email === loggedUser.value.email) el = loggedUser.value;
				return el;
			});
		},
		{ deep: true }
	);

	const addNewUser = user => {
		users.value.push(user);
	};

	const loginUser = user => {
		const currentUser = users.value.filter(
			u => u.email === user.email && u.password === user.password
		);
		if (currentUser.length) {
			loggedUser.value = currentUser[0];
			return true;
		}
		return false;
	};
	const logoutUser = () => {
		console.log('called');
		loggedUser.value = {};
	};

	const checkEmail = user => {
		return !!users.value.filter(u => u.email === user.email).length;
	};

	return { users, loggedUser, addNewUser, checkEmail, loginUser, logoutUser };
});
