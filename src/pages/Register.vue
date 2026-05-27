<template>
  <div class="min-h-screen pt-[68px] bg-gradient-to-br from-gray-50 to-primary/5 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-strong p-8 animate-fade-up">
      <div class="text-center mb-8">
        <div class="w-14 h-14 bg-accent rounded-xl grid place-items-center font-display font-black text-2xl mx-auto mb-4">E</div>
        <h1 class="font-display font-extrabold text-2xl text-gray-900">Create account</h1>
        <p class="text-gray-500 text-sm mt-1">Start shopping today</p>
      </div>
      <form class="flex flex-col gap-4" @submit.prevent>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
            <input type="text" placeholder="John" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
            <input type="text" placeholder="Doe" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
          <input type="email" placeholder="john@email.com" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
          <input type="password" placeholder="••••••••" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" />
        </div>
        <button type="submit" class="w-full py-3.5 bg-primary text-white font-display font-bold rounded-xl hover:bg-primary-dark transition-all duration-200 hover:-translate-y-0.5 hover:shadow-primary mt-2">
          Create Account
        </button>
      </form>
      <p class="text-center text-sm text-gray-500 mt-6">
        Already have an account?
        <RouterLink to="/login" class="text-primary font-semibold hover:underline">Sign in</RouterLink>
      </p>
    </div>
  </div>
</template>
