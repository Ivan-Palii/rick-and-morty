<script setup>
import { useUsersStore } from '@/store/usersStore.js';
import { storeToRefs } from 'pinia';
import EditUserInfo from '@/components/EditUserInfo.vue';
import LikedItemsTable from '@/components/LikedItemsTable.vue';

const { loggedUser } = storeToRefs(useUsersStore());
</script>
<template>
	<VContainer>
		<VCard>
			<VRow class="ma-0">
				<VCol
					cols="12"
					sm="4"
				>
					<VAvatar
						size="auto"
						class="d-block"
						rounded
					>
						<VImg
							v-if="loggedUser.img"
							:src="loggedUser.img"
							aspect-ratio="1/1"
							alt=" "
						/>
						<VImg
							v-else
							src="https://profile-images.xing.com/images/3defc3c1afaf544148aa9929d45fe69a-1/rolf-eppinger.1024x1024.jpg"
							alt="Profile picture"
							aspect-ratio="1/1"
						/>
					</VAvatar>
				</VCol>
				<VCol
					cols="12"
					sm="8"
				>
					<VCardTitle class="text-h4">
						{{ loggedUser.firstName + ' ' + loggedUser.lastName }}
					</VCardTitle>
					<VCardSubtitle class="text-h6 px-4 py-2">Phone number</VCardSubtitle>
					<VCardText class="pt-0">{{ loggedUser.phone }}</VCardText>
					<VCardSubtitle class="text-h6 px-4 py-2">Email</VCardSubtitle>
					<VCardText class="pt-0">{{ loggedUser.email }}</VCardText>
					<VCardSubtitle class="text-h6 px-4 py-2">Birth date</VCardSubtitle>
					<VCardText class="pt-0">
						{{ new Date(loggedUser.dateOfBirth).toLocaleDateString('uk') }}
					</VCardText>
				</VCol>
			</VRow>
			<EditUserInfo />
		</VCard>
		<LikedItemsTable />
	</VContainer>
</template>
<style scoped>
.v-card-subtitle {
	opacity: 1;
}
</style>
