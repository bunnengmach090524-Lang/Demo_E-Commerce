<template>
  <div class="min-h-screen bg-[#0e0e11] flex items-center justify-center p-4 relative overflow-hidden font-['DM_Sans',sans-serif]">
    
    <div class="absolute rounded-full filter blur-[80px] pointer-events-none w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,200,80,0.12)_0%,transparent_70%)] -top-[120px] -left-[100px] animate-[drift_12s_ease-in-out_infinite_alternate]"></div>
    <div class="absolute rounded-full filter blur-[80px] pointer-events-none w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(80,120,255,0.10)_0%,transparent_70%)] -bottom-[80px] -right-[60px] animate-[drift_16s_ease-in-out_infinite_alternate-reverse]"></div>

    <div class="w-full max-w-[440px] bg-[#18181c] border border-white/5 rounded-[20px] flex overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.6)] animate-[rise_0.5s_cubic-bezier(0.22,1,0.36,1)_both] z-10 mt-[65px]">
      
      <div class="w-1 shrink-0 bg-gradient-to-b from-[#f5c842] to-[#e88c2a]"></div>

      <div class="flex-1 p-9 flex flex-col gap-6">
        
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 bg-gradient-to-br from-[#f5c842] to-[#e88c2a] rounded-xl grid place-items-center font-black text-xl text-[#0e0e11]">
            E
          </div>
          <span class="text-[0.875rem] font-bold text-white/50 tracking-[0.08em] uppercase">Envoy</span>
        </div>

        <div class="flex flex-col gap-1">
          <h1 class="font-extrabold text-2xl text-[#f4f4f5] tracking-tight m-0">
            Create account
          </h1>
          <p class="text-[0.875rem] text-white/35 font-normal m-0">Start shopping today</p>
        </div>

        <form class="flex flex-col gap-4" @submit.prevent>

          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-[0.78rem] font-semibold text-white/45 tracking-[0.06em] uppercase">First Name</label>
              <input
                type="text"
                placeholder="John"
                class="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.09] rounded-xl text-[#f4f4f5] text-[0.925rem] outline-none transition-all placeholder:text-white/20 focus:border-[#f5c842] focus:bg-[#f5c842]/[0.05] focus:shadow-[0_0_0_3px_rgba(245,200,66,0.1)]"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[0.78rem] font-semibold text-white/45 tracking-[0.06em] uppercase">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                class="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.09] rounded-xl text-[#f4f4f5] text-[0.925rem] outline-none transition-all placeholder:text-white/20 focus:border-[#f5c842] focus:bg-[#f5c842]/[0.05] focus:shadow-[0_0_0_3px_rgba(245,200,66,0.1)]"
              />
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[0.78rem] font-semibold text-white/45 tracking-[0.06em] uppercase">Email</label>
            <input
              type="email"
              placeholder="john@email.com"
              class="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.09] rounded-xl text-[#f4f4f5] text-[0.925rem] outline-none transition-all placeholder:text-white/20 focus:border-[#f5c842] focus:bg-[#f5c842]/[0.05] focus:shadow-[0_0_0_3px_rgba(245,200,66,0.1)]"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[0.78rem] font-semibold text-white/45 tracking-[0.06em] uppercase">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.09] rounded-xl text-[#f4f4f5] text-[0.925rem] outline-none transition-all placeholder:text-white/20 focus:border-[#f5c842] focus:bg-[#f5c842]/[0.05] focus:shadow-[0_0_0_3px_rgba(245,200,66,0.1)]"
            />
          </div>

          <button
            type="submit"
            class="group flex items-center justify-center gap-2.5 w-full p-3.5 bg-gradient-to-br from-[#f5c842] to-[#e88c2a] border-none rounded-xl text-[#0e0e11] font-bold text-[0.925rem] tracking-[0.01em] cursor-pointer transition-all duration-200 mt-2 relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(245,200,66,0.35)] active:translate-y-0"
          >
            <span>Create Account</span>
            <svg class="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.5 9h11M10 5l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </form>

        <p class="text-center text-[0.825rem] text-white/30 m-0">
          Already have an account?
          <RouterLink to="/login" class="text-[#f5c842] font-semibold no-underline ml-1 transition-opacity hover:opacity-75">
            Sign in →
          </RouterLink>
        </p>

      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(30px, 20px) scale(1.08); }
}

@keyframes rise {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>