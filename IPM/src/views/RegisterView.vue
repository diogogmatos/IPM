<template>
  <div class="bg-primary-500 w-screen h-screen">
    <div class="flex justify-center items-center h-full">
      <div
        class="flex flex-col justify-between bg-white p-8 rounded-2xl border shadow-md w-1/4 h-[35rem]"
      >
        <img src="/src/assets/logo.svg" alt="logo" class="w-36 h-36 mx-auto" />
        <form class="flex flex-col justify-center h-fit space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium ml-2">Número</label>
            <input
              placeholder="Número"
              id="number"
              name="number"
              class="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium ml-2">E-Mail</label>
            <input
              placeholder="E-Mail"
              id="email"
              name="email"
              class="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium ml-2">Password</label>
            <input
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              class="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
          </div>
          <div class="pt-2">
            <button
              type="submit"
              class="w-full bg-primary-500 text-white p-2 rounded-md hover:bg-opacity-80 transition-all"
            >
              Registar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
