<template>
  <div class="min-h-screen pt-[100px] pb-16 bg-gray-50">
    <div class="container max-w-2xl mx-auto">
      <div class="bg-white rounded-2xl shadow-strong p-10 animate-fade-up">
        <div class="text-center mb-10">
          <p class="text-xs font-bold font-display tracking-widest text-primary uppercase mb-3">Contact</p>
          <h1 class="font-display font-extrabold text-4xl text-gray-900">Get in Touch</h1>
        </div>
        <div class="flex flex-col gap-5">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
              <input type="text" placeholder="Your name" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input type="email" placeholder="your@email.com" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
            <textarea rows="5" placeholder="How can we help?" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors resize-none" />
          </div>
          <button class="btn-primary justify-center py-3.5 text-base rounded-xl">Send Message →</button>
        </div>
      </div>
    </div>
  </div>
</template>
