<script setup>
import { computed, defineEmits, onMounted, reactive, ref, watch } from 'vue';
import { useSnackbarStore } from '@/store/snackbarStore.js';
import { useUsersStore } from '@/store/usersStore.js';
import { storeToRefs } from 'pinia';

const { checkEmail } = useUsersStore();
const { loggedUser } = storeToRefs(useUsersStore());
const { setSnackbarParams } = useSnackbarStore();
const isMenuOpen = ref(false);
const dialog = ref(false);
const isValid = ref(false);
const changedData = ref({});
const rPassword = ref('');
const showState = reactive({ password: false, rPassword: false });
const emit = defineEmits('update:modelValue');
const img = ref('');

const formattedDate = computed(() => {
	return changedData.value.dateOfBirth
		? changedData.value.dateOfBirth.toLocaleDateString('uk')
		: '';
});

watch(changedData.value.dateOfBirth, newDate => {
	changedData.value.dateOfBirth = newDate;
});

watch(changedData.value.dateOfBirth, newDate => {
	emit('update:modelValue', newDate);
});

watch(img, newImg => {
	if (newImg[0]) updateProfilePicture(newImg[0]);
});

function updateProfilePicture(img) {
	const reader = new FileReader();
	reader.addEventListener('load', () => {
		changedData.value.img = reader.result;
	});
	reader.readAsDataURL(img);
}

onMounted(() => {
	resetChangedData();
});

function resetChangedData() {
	changedData.value = JSON.parse(JSON.stringify(loggedUser.value));
	changedData.value.dateOfBirth = new Date(changedData.value.dateOfBirth);
}

function submitNewUserData() {
	if (isValid.value && !checkEmail(changedData.value)) {
		loggedUser.value = JSON.parse(JSON.stringify(changedData.value));
		closeDialog();
		setSnackbarParams({ isOpen: true, message: 'Data changed successfully', color: 'green' });
	} else if (isValid.value && checkEmail(changedData.value)) {
		setSnackbarParams({ isOpen: true, message: 'This email already used', color: 'red' });
	}
}

function closeDialog() {
	rPassword.value = '';
	img.value = '';
	dialog.value = false;
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
		v => v === changedData.value.password || 'Password and password repeat must match'
	]
});
</script>
<template>
	<VRow justify="center">
		<VDialog
			v-model="dialog"
			persistent
			width="1024"
		>
			<template #activator="{ props }">
				<VBtn
					color="primary"
					variant="text"
					icon="mdi-pencil"
					class="edit-user-btn"
					v-bind="props"
					@click="resetChangedData"
				/>
			</template>
			<VCard>
				<VCardTitle>
					<span class="text-h5">User profile data</span>
				</VCardTitle>
				<VCardText>
					<VForm
						v-model="isValid"
						ref="registration"
						lazy-validation
						@submit.prevent="submitNewUserData"
					>
						<VContainer>
							<!--Profile picture / First name / Last name-->
							<VRow>
								<VCol
									cols="12"
									ml="9"
									md="6"
									class="d-flex justify-center"
								>
									<VAvatar
										size="350"
										class="d-block"
										rounded
									>
										<VImg
											v-if="changedData.img"
											:src="changedData.img"
											aspect-ratio="1/1"
											alt=" "
										/>
										<VImg
											v-else
											src="https://profile-images.xing.com/images/3defc3c1afaf544148aa9929d45fe69a-1/rolf-eppinger.1024x1024.jpg"
											alt="Profile picture"
											aspect-ratio="1/1"
										/>
										<div class="update-user-img">
											<VFileInput
												v-model="img"
												class="file-input"
												accept="image/*"
												prepend-icon="mdi-camera"
											/>
										</div>
									</VAvatar>
								</VCol>
								<VCol
									cols="12"
									md="6"
								>
									<VCardTitle class="pa-0 mb-3">First name</VCardTitle>
									<VTextField
										v-model="changedData.firstName"
										:rules="rule.notEmpty"
										label="First name"
										required
									/>
									<VCardTitle class="pa-0 mb-3">Last name</VCardTitle>
									<VTextField
										v-model="changedData.lastName"
										:rules="rule.notEmpty"
										label="Last name"
										required
									/>
								</VCol>
							</VRow>
							<!--Date of birth / Phone-->
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
												:append-inner-icon="'mdi-calendar'"
												label="Birth date"
												readonly
												hide-details
											/>
										</template>
										<VDatePicker
											v-model="changedData.dateOfBirth"
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
										v-model="changedData.phone"
										:rules="rule.notEmpty"
										placeholder="+380-##-##-##-###"
										label="Phone"
										required
									/>
								</VCol>
							</VRow>
							<!--Email-->
							<VRow>
								<VCol
									cols="12"
									md="12"
								>
									<VCardTitle class="pa-0 mb-3">Email</VCardTitle>
									<VTextField
										v-model="changedData.email"
										:rules="rule.email"
										type="email"
										label="Email"
										required
									/>
								</VCol>
							</VRow>
							<!--Password / Repeat password-->
							<VRow>
								<VCol
									cols="12"
									md="6"
								>
									<VCardTitle class="pa-0 mb-3">Password</VCardTitle>
									<VTextField
										v-model="changedData.password"
										:rules="rule.password"
										:append-icon="
											showState.password ? 'mdi-eye-off' : 'mdi-eye'
										"
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
										:append-icon="
											showState.rPassword ? 'mdi-eye-off' : 'mdi-eye'
										"
										:type="showState.rPassword ? 'text' : 'password'"
										label="Repeat password"
										required
										@click:append="showState.rPassword = !showState.rPassword"
									/>
								</VCol>
							</VRow>
							<!--Btn`s-->
							<VRow
								justify="space-between"
								class="ma-0"
							>
								<VBtn
									color="red"
									plain
									@click="closeDialog"
								>
									Cancel
								</VBtn>
								<VBtn
									width="150"
									color="primary"
									type="submit"
								>
									Submit new data
								</VBtn>
							</VRow>
						</VContainer>
					</VForm>
				</VCardText>
			</VCard>
		</VDialog>
	</VRow>
</template>
<style scoped lang="scss">
.edit-user-btn {
	position: absolute;
	top: 5px;
	right: 5px;
}
.update-user-img {
	position: absolute;
	top: 5px;
	right: 5px;
}

.file-input {
	&::v-deep {
		.v-input__prepend {
			margin-inline-end: 0;
			height: 32px;
			width: 32px;
		}
		.v-input__control,
		.v-input__details {
			display: none;
		}
	}
}
</style>
