<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ShieldCheck, Users, Calendar, Volume2, Check, X } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/authStore';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

const router = useRouter();
const authStore = useAuthStore();

// Redirect to home/dashboard if not admin
if (!authStore.isAdmin) {
  router.push('/dashboard');
}

// Active subview panel: 'applications' | 'registry' | 'announcements'
const activeSubView = ref<'applications' | 'registry' | 'announcements'>('applications');

// Announcement Form Fields
const annTitle = ref('');
const annBody = ref('');
const annSuccess = ref(false);

function handlePostAnnouncement() {
  if (!annTitle.value.trim() || !annBody.value.trim()) return;
  authStore.createAnnouncement(annTitle.value, annBody.value);
  annTitle.value = '';
  annBody.value = '';
  annSuccess.value = true;
  setTimeout(() => {
    annSuccess.value = false;
  }, 2000);
}

// Analytic Metrics Computations
const totalMembersCount = computed(() => authStore.users.length);
const totalPassesCount = computed(() => authStore.registrations.length);
const approvedPassesCount = computed(() => authStore.registrations.filter(r => r.status === 'approved').length);
const totalXpGranted = computed(() => authStore.users.reduce((acc, curr) => acc + curr.xp, 0));
</script>

<template>
  <div 
    v-if="authStore.isAdmin"
    class="relative min-h-screen pt-24 pb-20 px-6 md:px-12 bg-space-black select-none"
  >
    <!-- Background sparkles overlay -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <Sparkles
        particle-color="#D9B27A"
        :min-size="1"
        :max-size="3"
        :speed="1.2"
        :particle-density="40"
      />
    </div>

    <!-- Cosmic Glow -->
    <div class="absolute top-[20%] left-[-15%] w-[600px] h-[600px] bg-wine-red/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
    <div class="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />

    <div class="max-w-7xl mx-auto relative z-10">
      
      <!-- Top header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8 mb-12">
        <div class="text-left">
          <span class="font-sans text-[9px] tracking-[0.3em] text-wine-red font-bold uppercase block mb-1">
            Executive Oversight
          </span>
          <h2 class="font-serif text-3xl md:text-4xl font-bold text-text-primary tracking-wide flex items-center gap-3">
            <ShieldCheck class="w-8 h-8 text-wine-red filter drop-shadow-[0_0_5px_#7A2435]" />
            Admin Hangar
          </h2>
        </div>
        
        <!-- Redirect hooks -->
        <div class="flex gap-4">
          <router-link
            to="/dashboard"
            class="px-5 py-3 rounded-full border border-white/8 bg-white/2 hover:border-gold-primary/30 text-[10px] tracking-widest font-sans font-bold uppercase transition-all duration-300 text-gold-primary hover:text-text-primary cursor-pointer focus:outline-none"
          >
            Mission Control
          </router-link>
        </div>
      </div>

      <!-- Analytics Board widgets row -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div class="p-6 rounded-3xl border border-white/5 bg-space-black/35 text-left">
          <span class="block font-sans text-[8px] tracking-widest text-text-muted/50 uppercase font-bold mb-2">Total Registry</span>
          <span class="block font-serif text-3xl font-bold text-gold-primary">{{ totalMembersCount }} Members</span>
        </div>
        <div class="p-6 rounded-3xl border border-white/5 bg-space-black/35 text-left">
          <span class="block font-sans text-[8px] tracking-widest text-text-muted/50 uppercase font-bold mb-2">Applications logged</span>
          <span class="block font-serif text-3xl font-bold text-gold-primary">{{ totalPassesCount }} Passes</span>
        </div>
        <div class="p-6 rounded-3xl border border-white/5 bg-space-black/35 text-left">
          <span class="block font-sans text-[8px] tracking-widest text-text-muted/50 uppercase font-bold mb-2">Approved ratio</span>
          <span class="block font-serif text-3xl font-bold text-gold-primary">{{ approvedPassesCount }} Approved</span>
        </div>
        <div class="p-6 rounded-3xl border border-white/5 bg-space-black/35 text-left">
          <span class="block font-sans text-[8px] tracking-widest text-text-muted/50 uppercase font-bold mb-2">XP Distributed</span>
          <span class="block font-serif text-3xl font-bold text-gold-primary">{{ totalXpGranted }} Stardust</span>
        </div>
      </div>

      <!-- Main Admin panel workspace -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- Left: Subsection Selector Tabs (Size 3 cols) -->
        <div class="lg:col-span-3 flex flex-col gap-3 justify-start">
          <span class="font-sans text-[9px] tracking-widest text-gold-soft/50 font-bold uppercase mb-2 ml-4 text-left">Management Panels</span>
          
          <button
            @click="activeSubView = 'applications'"
            class="flex items-center gap-4 px-6 py-4 rounded-2xl border text-left font-sans text-xs tracking-wider font-semibold uppercase transition-all duration-300 focus:outline-none cursor-pointer"
            :class="activeSubView === 'applications'
              ? 'border-gold-primary/40 bg-gold-primary/10 text-gold-primary shadow-[0_0_15px_rgba(217,178,122,0.15)]'
              : 'border-white/5 bg-white/2 text-text-muted hover:border-white/10 hover:text-text-primary'"
          >
            <Calendar class="w-4 h-4" />
            <span>Applications</span>
          </button>
          
          <button
            @click="activeSubView = 'registry'"
            class="flex items-center gap-4 px-6 py-4 rounded-2xl border text-left font-sans text-xs tracking-wider font-semibold uppercase transition-all duration-300 focus:outline-none cursor-pointer"
            :class="activeSubView === 'registry'
              ? 'border-gold-primary/40 bg-gold-primary/10 text-gold-primary shadow-[0_0_15px_rgba(217,178,122,0.15)]'
              : 'border-white/5 bg-white/2 text-text-muted hover:border-white/10 hover:text-text-primary'"
          >
            <Users class="w-4 h-4" />
            <span>Registry Index</span>
          </button>

          <button
            @click="activeSubView = 'announcements'"
            class="flex items-center gap-4 px-6 py-4 rounded-2xl border text-left font-sans text-xs tracking-wider font-semibold uppercase transition-all duration-300 focus:outline-none cursor-pointer"
            :class="activeSubView === 'announcements'
              ? 'border-gold-primary/40 bg-gold-primary/10 text-gold-primary shadow-[0_0_15px_rgba(217,178,122,0.15)]'
              : 'border-white/5 bg-white/2 text-text-muted hover:border-white/10 hover:text-text-primary'"
          >
            <Volume2 class="w-4 h-4" />
            <span>Broadcasts</span>
          </button>
        </div>

        <!-- Right: Panel Console screen (Size 9 cols) -->
        <div class="lg:col-span-9 relative">
          <div class="glass-card rounded-[2.5rem] border border-white/5 bg-space-black/35 p-8 min-h-[450px]">
            
            <!-- PANEL: APPLICATIONS TABLE -->
            <div v-if="activeSubView === 'applications'" class="space-y-6 text-left">
              <h3 class="font-serif text-2xl font-bold text-text-primary mb-6">Boarding Pass Applications</h3>
              
              <div v-if="authStore.registrations.length > 0" class="overflow-x-auto">
                <table class="w-full font-sans text-xs text-text-muted border-collapse">
                  <thead>
                    <tr class="border-b border-white/10 text-[9px] tracking-widest uppercase font-bold text-gold-soft/50">
                      <th class="py-4 px-3 text-left">Cadet Name</th>
                      <th class="py-4 px-3 text-left">Event Target</th>
                      <th class="py-4 px-3 text-left">Selected Role</th>
                      <th class="py-4 px-3 text-center">Status</th>
                      <th class="py-4 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="reg in authStore.registrations" 
                      :key="reg.id"
                      class="border-b border-white/5 hover:bg-white/1 transition-colors"
                    >
                      <td class="py-4 px-3">
                        <span class="block font-semibold text-text-primary">{{ reg.memberName }}</span>
                        <span class="block text-[10px] text-text-muted/65">{{ reg.memberId }}</span>
                      </td>
                      <td class="py-4 px-3 text-text-primary font-semibold">{{ reg.eventName }}</td>
                      <td class="py-4 px-3">{{ reg.role }}</td>
                      <td class="py-4 px-3 text-center">
                        <span 
                          class="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase"
                          :class="[
                            reg.status === 'approved' ? 'bg-gold-primary/10 text-gold-primary border border-gold-primary/20' :
                            reg.status === 'rejected' ? 'bg-wine-red/10 text-wine-red border border-wine-red/20' :
                            'bg-white/5 text-text-muted border border-white/10'
                          ]"
                        >
                          {{ reg.status }}
                        </span>
                      </td>
                      <td class="py-4 px-3 text-right">
                        <div v-if="reg.status === 'pending'" class="flex gap-2 justify-end">
                          <button
                            @click="authStore.approvePass(reg.id)"
                            class="p-2 rounded-full border border-gold-primary/20 bg-gold-primary/5 text-gold-primary hover:bg-gold-primary/10 cursor-pointer focus:outline-none transition-colors"
                            aria-label="Approve Pass"
                          >
                            <Check class="w-3.5 h-3.5" />
                          </button>
                          <button
                            @click="authStore.rejectPass(reg.id)"
                            class="p-2 rounded-full border border-wine-red/20 bg-wine-red/5 text-wine-red hover:bg-wine-red/10 cursor-pointer focus:outline-none transition-colors"
                            aria-label="Reject Pass"
                          >
                            <X class="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span v-else class="text-[10px] text-text-muted/40 font-semibold uppercase">COMPLETED</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="text-center py-12 text-text-muted">
                No active boarding applications logged inside database pools.
              </div>
            </div>

            <!-- PANEL: MEMBER REGISTRY INDEX -->
            <div v-if="activeSubView === 'registry'" class="space-y-6 text-left">
              <h3 class="font-serif text-2xl font-bold text-text-primary mb-6">Cadet Registry Index</h3>
              
              <div class="overflow-x-auto">
                <table class="w-full font-sans text-xs text-text-muted border-collapse">
                  <thead>
                    <tr class="border-b border-white/10 text-[9px] tracking-widest uppercase font-bold text-gold-soft/50">
                      <th class="py-4 px-3 text-left">Cadet Credentials</th>
                      <th class="py-4 px-3 text-left">Academic Unit</th>
                      <th class="py-4 px-3 text-center">Core Level</th>
                      <th class="py-4 px-3 text-right">Stardust XP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="user in authStore.users" 
                      :key="user.memberId"
                      class="border-b border-white/5 hover:bg-white/1 transition-colors"
                    >
                      <td class="py-4 px-3">
                        <span class="block font-semibold text-text-primary">{{ user.name }}</span>
                        <span class="block text-[10px] text-text-muted/65">{{ user.email }} &bull; {{ user.memberId }}</span>
                      </td>
                      <td class="py-4 px-3">{{ user.academicUnit || 'External Chapter' }}</td>
                      <td class="py-4 px-3 text-center font-bold text-gold-primary">Lvl {{ user.level }}</td>
                      <td class="py-4 px-3 text-right font-semibold text-text-primary">{{ user.xp }} XP</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- PANEL: DISPATCH ANNOUNCEMENTS FORM -->
            <div v-if="activeSubView === 'announcements'" class="space-y-6 text-left">
              <h3 class="font-serif text-2xl font-bold text-text-primary mb-6">Command Broadcasts Dispatcher</h3>
              
              <form @submit.prevent="handlePostAnnouncement" class="space-y-6 max-w-xl">
                <div>
                  <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Broadcast Headline</label>
                  <input
                    v-model="annTitle"
                    type="text"
                    placeholder="e.g., Summit coordinates unlocked"
                    class="w-full bg-space-black/50 border border-white/8 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted/30 focus:border-gold-primary/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Transmission Payload (Body)</label>
                  <textarea
                    v-model="annBody"
                    rows="5"
                    placeholder="Enter dispatch details..."
                    class="w-full bg-space-black/50 border border-white/8 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted/30 focus:border-gold-primary/50 focus:outline-none resize-none"
                  />
                </div>

                <p v-if="annSuccess" class="text-xs text-gold-primary font-sans tracking-wide">
                  Transmission successfully broadcasted to active cadet screens.
                </p>

                <button
                  type="submit"
                  class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-bronze to-gold-primary text-space-black font-semibold tracking-widest text-xs shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none cursor-pointer"
                >
                  DISPATCH GLOBAL BROADCAST
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8);
}
</style>
