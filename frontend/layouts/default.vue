<template>
    <div>
        <header class="border-b">
            <div class="container-xl py-6 flex justify-between items-center">
                <NuxtLink to="/" class="font-bold">Indaco Law</NuxtLink>

                <nav>
                    <NuxtLink to="/">Documents</NuxtLink>
                    <NuxtLink to="/admin" class="ml-4">Admin</NuxtLink>
                </nav>
            </div>
        </header>

        <NuxtPage />

        <footer class="mt-16 py-8 border-t">
            <div class="container text-sm text-gray-600 flex justify-center">© 2025 Indaco Systems, SRL. All rights
                reserved.</div>
        </footer>
    </div>
</template>
<style scoped>
    header a {
        @apply text-gray-900 font-bold;
    }

    nav a {
        @apply text-sm font-medium;
    }
</style>