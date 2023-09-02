<script setup>
import { reactive, ref, computed, watch, defineEmits } from 'vue';
import { useUsersStore } from '@/store/usersStore.js';
import { useSnackbarStore } from '@/store/snackbarStore.js';
import router from '@/router/index.js';

const { addNewUser, checkEmail } = useUsersStore();
const { setSnackbarParams } = useSnackbarStore();
const newUser = ref({
	firstName: '',
	lastName: '',
	password: '',
	email: '',
	phone: '',
	dateOfBirth: null
});
const showState = reactive({ password: false, rPassword: false });
const isMenuOpen = ref(false);
const isValid = ref(false);
const rPassword = ref('');

const emit = defineEmits('update:modelValue');

const formattedDate = computed(() => {
	return newUser.value.dateOfBirth ? newUser.value.dateOfBirth.toLocaleDateString('uk') : '';
});

watch(newUser.value.dateOfBirth, newDate => {
	newUser.value.dateOfBirth = newDate;
});

watch(newUser.value.dateOfBirth, newDate => {
	emit('update:modelValue', newDate);
});

async function submitNewUser() {
	if (isValid.value && !checkEmail(newUser.value)) {
		addNewUser(newUser.value);
		await router.push({ name: 'LoginPage' });
		setSnackbarParams({ isOpen: true, message: 'Registration successful', color: 'green' });
	} else if (isValid.value && checkEmail(newUser.value)) {
		setSnackbarParams({ isOpen: true, message: 'This email already used', color: 'red' });
	}
}

const emptyCheck = v => !!v || 'Field is required';

const rule = reactive({
	notEmpty: [emptyCheck],
	email: [emptyCheck, v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email is not correct'],
	password: [
		emptyCheck,
		v =>
			/^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*_])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{8,}$/.test(v) ||
			'The password must contain at least 8 characters, 1 number, 1 upper, 1 lowercase and at least one special character (!@#$%^&*_)'
	],
	repeatPassword: [
		emptyCheck,
		v => v === newUser.value.password || 'Password and password repeat must match'
	]
});
</script>
<template>
	<div class="mx-4">
		<VCard
			elevation="2"
			class="mx-auto overflow-visible"
			width="100%"
			max-width="1000"
		>
			<VCardTitle class="text-h3 text-center py-8">Registration</VCardTitle>
			<VForm
				v-model="isValid"
				ref="registration"
				lazy-validation
				@submit.prevent="submitNewUser"
			>
				<VContainer>
					<VRow>
						<VCol
							cols="12"
							md="6"
						>
							<VCardTitle class="pa-0 mb-3">First name</VCardTitle>
							<VTextField
								v-model="newUser.firstName"
								:rules="rule.notEmpty"
								label="First name"
								required
							/>
						</VCol>
						<VCol
							cols="12"
							ml="9"
							md="6"
						>
							<VCardTitle class="pa-0 mb-3">Last name</VCardTitle>
							<VTextField
								v-model="newUser.lastName"
								:rules="rule.notEmpty"
								label="Last name"
								required
							/>
						</VCol>
					</VRow>
					<VRow>
						<VCol
							cols="12"
							md="6"
						>
							<VMenu
								v-model="isMenuOpen"
								:close-on-content-click="false"
							>
								<template #activator="{ props }">
									<VCardTitle class="pa-0 mb-3">Birth date</VCardTitle>
									<VTextField
										:model-value="formattedDate"
										:rules="rule.notEmpty"
										v-bind="props"
										:append-icon="'mdi-calendar'"
										label="Birth date"
										readonly
										hide-details
									/>
								</template>
								<VDatePicker
									v-model="newUser.dateOfBirth"
									hide-actions
									title=""
								>
									<template #header></template>
								</VDatePicker>
							</VMenu>
						</VCol>
						<VCol
							cols="12"
							md="6"
						>
							<VCardTitle class="pa-0 mb-3">Phone</VCardTitle>
							<VTextField
								v-mask="'+38#-##-##-##-###'"
								v-model="newUser.phone"
								:rules="rule.notEmpty"
								placeholder="+380-##-##-##-###"
								label="Phone"
								required
							/>
						</VCol>
					</VRow>
					<VRow>
						<VCol
							cols="12"
							md="12"
						>
							<VCardTitle class="pa-0 mb-3">Email</VCardTitle>
							<VTextField
								v-model="newUser.email"
								:rules="rule.email"
								type="email"
								label="Email"
								required
							/>
						</VCol>
					</VRow>
					<VRow>
						<VCol
							cols="12"
							md="6"
						>
							<VCardTitle class="pa-0 mb-3">Password</VCardTitle>
							<VTextField
								v-model="newUser.password"
								:rules="rule.password"
								:append-icon="showState.password ? 'mdi-eye-off' : 'mdi-eye'"
								:type="showState.password ? 'text' : 'password'"
								label="Password"
								required
								@click:append="showState.password = !showState.password"
							/>
						</VCol>
						<VCol
							cols="12"
							md="6"
						>
							<VCardTitle class="pa-0 mb-3">Repeat password</VCardTitle>
							<VTextField
								v-model="rPassword"
								:rules="rule.repeatPassword"
								:append-icon="showState.rPassword ? 'mdi-eye-off' : 'mdi-eye'"
								:type="showState.rPassword ? 'text' : 'password'"
								label="Repeat password"
								required
								@click:append="showState.rPassword = !showState.rPassword"
							/>
						</VCol>
					</VRow>
					<VRow
						justify="space-between"
						class="ma-0"
					>
						<VBtn
							:to="{ name: 'LoginPage' }"
							variant="text"
							plain
						>
							Have account?
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
<style scoped lang="scss"></style>
