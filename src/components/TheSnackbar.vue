<script setup>
import { ref } from 'vue';
import { useSnackbarStore } from '@/store/snackbarStore.js';
import { storeToRefs } from 'pinia';

const { snackbar } = storeToRefs(useSnackbarStore());

const text = ref('My timeout is set to 2000.');
const timeout = ref(3000);
</script>
<template>
	<VSnackbar
		v-model="snackbar.state.isOpen"
		:timeout="timeout"
		:color="snackbar.state.color"
		location="top right"

	>
		{{ snackbar.state.message }}

		<template #actions>
			<VBtn
				color="blue"
				variant="text"
				@click="snackbar.state.isOpen = false"
			>
				Close
			</VBtn>
		</template>
	</VSnackbar>
</template>
<style scoped></style>
