<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { defineAsyncComponent } from "vue";
import { RouterView } from "vue-router";

const AsyncNavbar = defineAsyncComponent(() =>
	import("@/components/Navbar.vue")
);
</script>

<template>
	<Suspense>
		<template #fallback>
			<div
				class="flex items-center justify-center h-screen"
			>
				<PulseLoader />
			</div>
		</template>
		<template #default>
			<div>
				<AsyncNavbar />
				<RouterView />
			</div>
		</template>
	</Suspense>
</template>
