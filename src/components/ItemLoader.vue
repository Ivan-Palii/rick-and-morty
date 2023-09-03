<script setup>
import TheLoader from "@/components/TheLoader.vue";
</script>
<template>
	<VSkeletonLoader
		type="avatar, subtitle, text, text, text, text"
		class="pa-6"
	>
		<VRow class="mr-lg-n16">
			<VCol
				cols='12'
				md='12'
				sm='12'
				class='pr-16 pl-16'
			>
				<VSkeletonLoader
					type="avatar, subtitle, text, text, text, text"
				/>
			</VCol>
		</VRow>
		<VRow class="mr-lg-n16">
			<VCol
				v-for='n in 10'
				cols='12'
				md='6'
				sm='12'
				class='pr-16 pl-16'
			>
				<TheLoader/>
			</VCol>
		</VRow>
	</VSkeletonLoader>
</template>
<style scoped>
</style>
