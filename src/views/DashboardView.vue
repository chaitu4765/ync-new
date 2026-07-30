<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { LogOut, Award, Zap, Download, Calendar } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/authStore';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

const router = useRouter();
const authStore = useAuthStore();

// Redirect if unauthenticated
if (!authStore.isAuthed) {
  router.push('/auth');
}

const currentLevelXp = computed(() => {
  if (!authStore.currentUser) return 0;
  return authStore.currentUser.xp % 500;
});

const xpPercentage = computed(() => {
  return (currentLevelXp.value / 500) * 100;
});

function handleLogout() {
  authStore.logout();
  router.push('/');
}

// Simulated active task check-in to gain XP
const checkedIn = ref(false);
const xpAlert = ref('');

async function claimDailyCheckin() {
  if (checkedIn.value) return;
  checkedIn.value = true;
  const msg = await authStore.awardXP(100, 'Daily Terminal Check-in');
  xpAlert.value = msg || 'Gained +100 XP!';
  setTimeout(() => {
    xpAlert.value = '';
  }, 3000);
}

// Filter registrations for this specific user
const myPasses = computed(() => {
  if (!authStore.currentUser) return [];
  return authStore.registrations.filter(r => r.memberId === authStore.currentUser?.memberId);
});

// Canvas-based Digital Membership Card Downloader (Zero dependency)
function downloadWalletCard() {
  const user = authStore.currentUser;
  if (!user) return;

  const canvas = document.createElement('canvas');
  canvas.width = 450;
  canvas.height = 280;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background Gradient (Dark Burgundy-Black)
  const grad = ctx.createLinearGradient(0, 0, 450, 280);
  grad.addColorStop(0, '#1A0D0F');
  grad.addColorStop(1, '#050505');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 450, 280);

  // Draw Gold Border
  ctx.strokeStyle = '#D9B27A';
  ctx.lineWidth = 3;
  ctx.strokeRect(6, 6, 438, 268);

  // Draw Subtle Grid/Radar design lines
  ctx.strokeStyle = 'rgba(217, 178, 122, 0.05)';
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 450; i += 30) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 280);
    ctx.stroke();
  }

  // Draw YNC Emblem sun
  ctx.beginPath();
  ctx.arc(380, 70, 40, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(217,178,122,0.06)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(217,178,122,0.2)';
  ctx.stroke();

  // Header Title
  ctx.fillStyle = '#D9B27A';
  ctx.font = 'bold 20px Georgia';
  ctx.fillText('YNC ORBITAL CARD', 30, 45);

  ctx.fillStyle = 'rgba(255, 248, 240, 0.4)';
  ctx.font = '9px monospace';
  ctx.fillText('YOUTH NETWORKING COMMUNITY', 30, 62);

  // User Name
  ctx.fillStyle = '#FFF8F0';
  ctx.font = 'bold 18px Georgia';
  ctx.fillText(user.name, 30, 115);

  // Member ID
  ctx.fillStyle = '#D9B27A';
  ctx.font = '11px monospace';
  ctx.fillText(`ID: ${user.memberId}`, 30, 135);

  // Details: Role & Joined date
  ctx.fillStyle = 'rgba(255, 248, 240, 0.6)';
  ctx.font = '10px sans-serif';
  ctx.fillText(`ROLE: ${user.role.toUpperCase()}`, 30, 185);
  ctx.fillText(`LEVEL: ${user.level} CORE`, 30, 202);
  ctx.fillText(`JOINED: ${user.joinedDate}`, 30, 219);

  // Draw Simulated Mock QR Code
  ctx.fillStyle = '#D9B27A';
  // Border box of QR
  ctx.strokeRect(340, 160, 70, 70);
  // Custom mock pattern inside
  ctx.fillRect(348, 168, 12, 12);
  ctx.fillRect(388, 168, 12, 12);
  ctx.fillRect(348, 208, 12, 12);
  ctx.fillRect(368, 188, 15, 15);
  ctx.fillRect(388, 208, 8, 8);

  // Trigger Download
  const link = document.createElement('a');
  link.download = `ync-wallet-${user.memberId}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
</script>

<template>
  <div 
    v-if="authStore.currentUser"
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
      
      <!-- Dashboard Top Header HUD -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8 mb-12">
        <div class="text-left">
          <span class="font-sans text-[9px] tracking-[0.3em] text-wine-red font-bold uppercase block mb-1">
            Command Center
          </span>
          <h2 class="font-serif text-3xl md:text-4xl font-bold text-text-primary tracking-wide">
            Mission Control
          </h2>
        </div>
        
        <!-- Controls -->
        <div class="flex gap-4">
          <button
            @click="claimDailyCheckin"
            :disabled="checkedIn"
            class="px-5 py-3 rounded-full border text-[10px] tracking-widest font-sans font-bold uppercase transition-all duration-300 focus:outline-none cursor-pointer"
            :class="checkedIn
              ? 'border-white/5 bg-white/1 text-text-muted opacity-40 cursor-not-allowed'
              : 'border-gold-primary/30 bg-gold-primary/5 text-gold-primary hover:bg-gold-primary/10'"
          >
            {{ checkedIn ? 'CHECKED IN' : 'DAILY TERMINAL CHECK-IN' }}
          </button>
          
          <button
            @click="handleLogout"
            class="p-3.5 rounded-full border border-wine-red/20 bg-wine-red/5 text-wine-red hover:bg-wine-red/10 cursor-pointer transition-colors focus:outline-none"
            aria-label="Logout Terminal"
          >
            <LogOut class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- XP Leveled Up alert -->
      <div 
        v-if="xpAlert" 
        class="mb-6 p-4 rounded-xl border border-gold-primary/30 bg-gold-primary/10 text-gold-primary font-sans text-xs tracking-wider text-center animate-pulse"
      >
        {{ xpAlert }}
      </div>

      <!-- Main Dashboard HUD Panels grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- LEFT: User Info & Digital Membership Card (Size 5 cols) -->
        <div class="lg:col-span-5 flex flex-col gap-8">
          
          <!-- Apple Wallet style Digital Membership Card -->
          <div class="relative group">
            <!-- Glow background -->
            <div class="absolute -inset-2 bg-gradient-to-tr from-wine-red/15 to-gold-primary/15 rounded-3xl blur-xl opacity-80" />
            
            <!-- The Card Panel -->
            <div class="relative rounded-3xl border border-gold-primary/35 bg-gradient-to-tr from-[#1A0D0F] to-[#050505] p-6 text-left shadow-2xl flex flex-col justify-between min-h-[260px] overflow-hidden">
              <!-- Grid overlay line design -->
              <div class="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-serif text-lg font-bold text-gold-primary tracking-wide">YNC ORBITAL CARD</h3>
                  <span class="block font-sans text-[7px] tracking-[0.2em] text-text-muted/60 uppercase">Youth Networking Community</span>
                </div>
                <!-- Holographic initial node -->
                <div class="w-10 h-10 rounded-full border border-gold-primary/30 bg-space-black flex items-center justify-center text-[10px] font-sans font-bold text-gold-primary select-none group-hover:border-gold-primary/60 transition-colors">
                  {{ authStore.currentUser.profilePic }}
                </div>
              </div>

              <!-- Mid Area: Name and ID -->
              <div class="my-6">
                <span class="block font-serif text-xl font-bold text-text-primary tracking-wide">{{ authStore.currentUser.name }}</span>
                <span class="block font-sans text-[9px] tracking-widest text-gold-primary/70 mt-1 uppercase font-semibold">ID: {{ authStore.currentUser.memberId }}</span>
              </div>

              <!-- Bottom Row: Role details, levels, QR -->
              <div class="flex justify-between items-end">
                <div class="font-sans text-[9px] tracking-wider text-text-muted/70 space-y-1">
                  <div>ROLE: <span class="text-text-primary font-bold">{{ authStore.currentUser.role.toUpperCase() }}</span></div>
                  <div>LEVEL: <span class="text-gold-primary font-bold">{{ authStore.currentUser.level }} CORE</span></div>
                  <div>JOINED: <span class="text-text-primary font-semibold">{{ authStore.currentUser.joinedDate }}</span></div>
                </div>

                <!-- Simulated Mini Vector QR Code -->
                <div @click="downloadWalletCard" class="w-14 h-14 border border-gold-primary/30 p-1 bg-space-black rounded-lg cursor-pointer flex flex-wrap gap-1 hover:border-gold-primary transition-colors">
                  <div class="w-3.5 h-3.5 bg-gold-primary rounded-sm" />
                  <div class="w-3.5 h-3.5 bg-transparent" />
                  <div class="w-3.5 h-3.5 bg-gold-primary rounded-sm" />
                  <div class="w-3.5 h-3.5 bg-gold-primary rounded-sm" />
                  <div class="w-3.5 h-3.5 bg-gold-primary rounded-sm" />
                  <div class="w-3.5 h-3.5 bg-transparent" />
                  <div class="w-3.5 h-3.5 bg-transparent" />
                  <div class="w-3.5 h-3.5 bg-gold-primary rounded-sm" />
                  <div class="w-3.5 h-3.5 bg-gold-primary rounded-sm" />
                </div>
              </div>
            </div>
          </div>

          <!-- Download Action Button -->
          <button
            @click="downloadWalletCard"
            class="w-full py-4 rounded-2xl border border-white/5 bg-white/2 hover:border-gold-primary/30 text-gold-primary hover:text-text-primary transition-all duration-300 font-sans text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
          >
            <Download class="w-4 h-4" />
            Download Digital pass (.PNG)
          </button>
        </div>

        <!-- RIGHT: Gamification, Passes & Settings (Size 7 cols) -->
        <div class="lg:col-span-7 flex flex-col gap-8 text-left">
          
          <!-- Gamification Module -->
          <div class="glass-card rounded-[2.5rem] border border-white/5 bg-space-black/35 p-8 flex flex-col justify-between min-h-[220px]">
            <div>
              <div class="flex items-center gap-3 mb-6">
                <Zap class="w-5 h-5 text-gold-primary animate-pulse" />
                <h3 class="font-serif text-lg font-bold text-text-primary tracking-wide">Cadet Telemetry (XP & Level)</h3>
              </div>

              <!-- XP Status read-out -->
              <div class="flex justify-between items-end mb-3 font-sans">
                <div>
                  <span class="block text-2xl font-serif font-bold text-gold-primary">{{ authStore.currentUser.xp }} XP</span>
                  <span class="block text-[8px] tracking-widest text-text-muted/60 uppercase font-semibold">CUMULATIVE STARDUST</span>
                </div>
                <div class="text-right text-[10px] tracking-wider text-text-muted font-semibold">
                  LEVEL {{ authStore.currentUser.level }} &mdash; {{ currentLevelXp }}/500 XP
                </div>
              </div>

              <!-- XP Progress Bar -->
              <div class="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  class="h-full bg-gold-primary transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_10px_#D9B27A]"
                  :style="{ width: `${xpPercentage}%` }"
                />
              </div>
            </div>

            <!-- Unlocked Badges list -->
            <div class="mt-6 border-t border-white/5 pt-4">
              <span class="block font-sans text-[8px] tracking-widest text-text-muted/60 uppercase font-bold mb-3">Credentials & Badges</span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="badge in authStore.currentUser.badges"
                  :key="badge"
                  class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/20 text-[9px] tracking-wider text-gold-primary font-sans font-semibold uppercase"
                >
                  <Award class="w-3 h-3" />
                  {{ badge }}
                </span>
              </div>
            </div>
          </div>

          <!-- Active Boarding Passes Widget -->
          <div class="glass-card rounded-[2.5rem] border border-white/5 bg-space-black/35 p-8">
            <div class="flex items-center gap-3 mb-6">
              <Calendar class="w-5 h-5 text-gold-primary" />
              <h3 class="font-serif text-lg font-bold text-text-primary tracking-wide">Active Boarding Passes</h3>
            </div>

            <div v-if="myPasses.length > 0" class="space-y-4">
              <div
                v-for="pass in myPasses"
                :key="pass.id"
                class="p-4 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-between gap-4 font-sans text-xs"
              >
                <div>
                  <span class="block font-serif font-bold text-text-primary text-sm">{{ pass.eventName }}</span>
                  <span class="block text-[9px] text-text-muted/70 mt-0.5">Applied as: {{ pass.role }} &bull; {{ pass.appliedDate }}</span>
                </div>
                
                <span
                  class="px-3 py-1 rounded-full text-[9px] tracking-widest uppercase font-bold"
                  :class="[
                    pass.status === 'approved' ? 'bg-gold-primary/10 border border-gold-primary/20 text-gold-primary' :
                    pass.status === 'rejected' ? 'bg-wine-red/10 border border-wine-red/20 text-wine-red' :
                    'bg-white/5 border border-white/8 text-text-muted'
                  ]"
                >
                  {{ pass.status }}
                </span>
              </div>
            </div>

            <div v-else class="text-center py-6 font-sans text-xs text-text-muted">
              No registered boarding passes located. Navigate to flagship keynotes to secure passes!
            </div>
          </div>

          <!-- Network Leaderboard and Announcements -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Leaderboard -->
            <div class="glass-card rounded-[2rem] border border-white/5 bg-space-black/35 p-6 text-left">
              <span class="block font-sans text-[8px] tracking-widest text-gold-primary uppercase font-bold mb-4">Cadet Leaderboard</span>
              <div class="space-y-4">
                <div
                  v-for="(member, idx) in authStore.users.slice(0, 3)"
                  :key="member.memberId"
                  class="flex justify-between items-center text-xs font-sans"
                >
                  <div class="flex items-center gap-3">
                    <span class="font-serif font-bold text-gold-primary">#0{{ idx + 1 }}</span>
                    <div>
                      <span class="block font-semibold text-text-primary">{{ member.name }}</span>
                      <span class="block text-[8px] text-text-muted/60 uppercase">LEVEL {{ member.level }}</span>
                    </div>
                  </div>
                  <span class="font-semibold text-gold-primary">{{ member.xp }} XP</span>
                </div>
              </div>
            </div>

            <!-- Announcements -->
            <div class="glass-card rounded-[2rem] border border-white/5 bg-space-black/35 p-6 text-left">
              <span class="block font-sans text-[8px] tracking-widest text-wine-red uppercase font-bold mb-4">Command Broadcasts</span>
              <div class="space-y-4">
                <div
                  v-for="ann in authStore.announcements.slice(0, 2)"
                  :key="ann.id"
                  class="space-y-1 text-xs font-sans"
                >
                  <span class="block font-serif font-bold text-text-primary leading-tight">{{ ann.title }}</span>
                  <p class="block text-[10px] text-text-muted leading-relaxed truncate">{{ ann.body }}</p>
                  <span class="block text-[8px] text-text-muted/40">{{ ann.date }}</span>
                </div>
              </div>
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
