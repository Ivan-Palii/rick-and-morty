<script setup></script>
<template>
	<VLayout class="overflow-y-auto flex-column">
		<VAppBar
			:elevation="0"
			color="primary"
		>
			<VBtn
				:to="{ path: '/' }"
				icon="mdi-keyboard-return"
			/>
		</VAppBar>
		<VMain class="mt-16">
			<RouterView />
		</VMain>
	</VLayout>
</template>
<style scoped></style>
