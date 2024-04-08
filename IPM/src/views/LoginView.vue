<template>
    <div class="bg-primary w-screen h-screen">
        <div class="flex justify-center items-center h-full">
            <div class="bg-white p-8 rounded-lg shadow-lg w-1/4 h-1/2 flex flex-col ">
                <img src="../assets/logo.svg" alt="logo" class="w-36 h-36 mx-auto">
                <form class="flex flex-col justify-center my-auto min-h-max">
                    <div class="mt-4">
                        <label for="email" class="block text-sm font-medium ml-2">Número</label>
                        <input placeholder="Número" id="email" name="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                    </div>
                    <div class="mt-4">
                        <label for="password" class="block text-sm font-medium ml-2">Password</label>
                        <input placeholder="Password" type="password" id="password" name="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                    </div>
                    <div class="mt-4">
                        <button type="submit" class="w-full bg-primary text-white p-2 rounded-md">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>