<script setup>
import { reactive, ref } from 'vue';
import { useUsersStore } from '@/store/usersStore.js';
import { useSnackbarStore } from '@/store/snackbarStore.js';
import router from '@/router/index.js';

const { loginUser } = useUsersStore();
const { setSnackbarParams } = useSnackbarStore();
const isValid = ref(false);
const showPass = ref(false);
const user = reactive({
	email: '',
	password: ''
});

const emptyCheck = v => !!v || 'Field is required';

const rule = reactive({
	email: [emptyCheck, v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email is not correct'],
	password: [
		emptyCheck,
		v =>
			/^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*_])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{8,}$/.test(v) ||
			'The password must contain at least 8 characters, 1 number, 1 upper, 1 lowercase and at least one special character (!@#$%^&*_)'
	]
});
async function submitLogin() {
	if (isValid.value) {
		if (loginUser(user)) {
			await router.push({ path: '/' });
			setSnackbarParams({
				isOpen: true,
				message: 'Successful login',
				color: 'green'
			});
		} else {
			setSnackbarParams({
				isOpen: true,
				message: 'Email or password incorrect',
				color: 'red'
			});
		}
	}
}
</script>
<template>
	<div class="mx-4">
		<VCard
			elevation="2"
			class="mx-auto overflow-visible"
			width="100%"
			max-width="600"
		>
			<VCardTitle class="text-center text-h3 py-8">Login</VCardTitle>
			<VForm
				v-model="isValid"
				ref="login"
				lazy-validation
				@submit.prevent="submitLogin"
			>
				<VContainer>
					<VRow class="ma-0">
						<VCol cols="12">
							<VCardTitle class="pa-0 mb-3">Email</VCardTitle>
							<VTextField
								v-model="user.email"
								:rules="rule.email"
								label="Email"
								required
							/>
						</VCol>
					</VRow>
					<VRow class="ma-0">
						<VCol cols="12">
							<VCardTitle class="pa-0 mb-3">Password</VCardTitle>
							<VTextField
								v-model="user.password"
								:rules="rule.password"
								:append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
								:type="showPass ? 'text' : 'password'"
								label="Password"
								required
								@click:append="showPass = !showPass"
							/>
						</VCol>
					</VRow>
					<VRow
						justify="space-between"
						class="ma-0"
					>
						<VBtn
							:to="{ name: 'RegistrationPage' }"
							variant="text"
							plain
						>
							Don't have an account?
						</VBtn>

						<VBtn
							width="150"
							color="primary"
							type="submit"
						>
							Submit
						</VBtn>
					</VRow>
				</VContainer>
			</VForm>
		</VCard>
	</div>
</template>
<style scoped></style>
