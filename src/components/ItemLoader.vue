<script setup>
import TheLoader from "@/components/TheLoader.vue";
</script>
<template>
	<v-skeleton-loader
		type="avatar, subtitle, text, text, text, text"
		class="pa-6"
	>
		<v-row class="mr-lg-n16">
			<v-col
				cols='12'
				md='12'
				sm='12'
				class='pr-16 pl-16'
			>
				<v-skeleton-loader
					type="avatar, subtitle, text, text, text, text"
				></v-skeleton-loader>
			</v-col>
		</v-row>
		<v-row class="mr-lg-n16">
			<v-col
				cols='12'
				md='6'
				sm='12'
				v-for='n in 10'
				class='pr-16 pl-16'
			>
				<TheLoader/>
			</v-col>
		</v-row>
	</v-skeleton-loader>
</template>
<style scoped>
</style>
