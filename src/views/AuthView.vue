<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Eye, EyeOff, ShieldAlert, Cpu, ArrowLeft, ArrowRight } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/authStore';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

const router = useRouter();
const authStore = useAuthStore();

// View toggle: 'login' | 'register'
const mode = ref<'login' | 'register'>('login');

// Login form fields
const loginEmail = ref('');
const loginPass = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);

// Register multi-step state
const step = ref(1);
const totalSteps = 6;

// Registration form fields
const regName = ref('');
const regEmail = ref('');
const regPass = ref('');
const regAcademic = ref('');
const regSkills = ref<string[]>([]);
const regInterests = ref<string[]>([]);

const availableSkills = ['TypeScript', 'Vue 3', 'Python', 'AI/ML', 'Framer', 'UI/UX Design', 'Strategy', 'Venture Capital', 'Writing', 'Hardware'];
const availableInterests = ['Hackathons', 'Networking Mixers', 'Founder Cohorts', 'Ecosystem Grants', 'Workshops', 'Research Labs'];

// Verification / Loading sequence states
const showScanAnimation = ref(false);
const scanStage = ref(''); // "Identity Verification" | "Scanning Credentials" | "Access Granted" | "Initializing Workspace"
const authError = ref('');

function toggleSkill(skill: string) {
  const index = regSkills.value.indexOf(skill);
  if (index === -1) {
    regSkills.value.push(skill);
  } else {
    regSkills.value.splice(index, 1);
  }
}

function toggleInterest(interest: string) {
  const index = regInterests.value.indexOf(interest);
  if (index === -1) {
    regInterests.value.push(interest);
  } else {
    regInterests.value.splice(index, 1);
  }
}

// Verification animation timeline
function runScanSequence(onSuccess: () => void) {
  showScanAnimation.value = true;
  authError.value = '';
  
  scanStage.value = 'Identity Verification';
  
  setTimeout(() => {
    scanStage.value = 'Scanning Credentials';
    
    setTimeout(() => {
      onSuccess();
    }, 1500); // verify simulation time
  }, 1000);
}

async function handleLogin() {
  if (!loginEmail.value || !loginPass.value) {
    authError.value = 'Please provide both email and password credentials.';
    return;
  }

  runScanSequence(
    async () => {
      try {
        await authStore.login(loginEmail.value, loginPass.value, rememberMe.value);
        scanStage.value = 'Access Granted';
        
        setTimeout(() => {
          scanStage.value = 'Initializing Workspace';
          setTimeout(() => {
            showScanAnimation.value = false;
            router.push('/dashboard');
          }, 800);
        }, 600);
      } catch (err: any) {
        showScanAnimation.value = false;
        authError.value = err || 'Identity mismatch logged.';
      }
    }
  );
}

async function handleRegister() {
  runScanSequence(
    async () => {
      try {
        await authStore.register({
          name: regName.value,
          email: regEmail.value,
          pass: regPass.value,
          academicUnit: regAcademic.value,
          skills: regSkills.value,
          interests: regInterests.value
        });
        scanStage.value = 'Access Granted';
        
        setTimeout(() => {
          scanStage.value = 'Initializing Workspace';
          setTimeout(() => {
            showScanAnimation.value = false;
            router.push('/dashboard');
          }, 800);
        }, 600);
      } catch (err: any) {
        showScanAnimation.value = false;
        authError.value = err || 'Registration failed.';
      }
    }
  );
}

async function handleGoogleLogin() {
  showScanAnimation.value = true;
  scanStage.value = 'Identity Verification';
  setTimeout(async () => {
    await authStore.loginWithGoogle();
    scanStage.value = 'Access Granted';
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  }, 1200);
}

async function handleGithubLogin() {
  showScanAnimation.value = true;
  scanStage.value = 'Identity Verification';
  setTimeout(async () => {
    await authStore.loginWithGithub();
    scanStage.value = 'Access Granted';
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  }, 1200);
}

function handleNextStep() {
  if (step.value === 1 && (!regName.value || !regEmail.value || !regPass.value)) {
    authError.value = 'All step 1 fields are required.';
    return;
  }
  if (step.value === 2 && !regAcademic.value) {
    authError.value = 'Academic credentials are required.';
    return;
  }
  authError.value = '';
  if (step.value < totalSteps) {
    step.value++;
  }
}

function handlePrevStep() {
  authError.value = '';
  if (step.value > 1) {
    step.value--;
  }
}
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center p-6 bg-space-black select-none">
    
    <!-- Background sparkles overlay -->
    <div class="absolute inset-0 opacity-15 pointer-events-none">
      <Sparkles
        particle-color="#D9B27A"
        :min-size="1"
        :max-size="3"
        :speed="2"
        :particle-density="45"
      />
    </div>

    <!-- Cosmic Glow -->
    <div class="absolute w-[600px] h-[600px] rounded-full bg-wine-red/5 blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

    <!-- Access Terminal outer monitor frame -->
    <div class="relative w-full max-w-xl">
      <!-- Glow background -->
      <div class="absolute -inset-3 bg-gradient-to-tr from-wine-red/10 to-gold-primary/10 rounded-[3rem] blur-2xl opacity-85 pointer-events-none" />

      <!-- Terminal console screen -->
      <div class="relative glass-panel rounded-[2.5rem] border border-white/8 bg-space-black/85 p-8 md:p-12 overflow-hidden shadow-2xl z-10">
        
        <!-- CRT scan overlay effect -->
        <div class="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        
        <!-- Return Home link -->
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-text-muted hover:text-gold-primary font-sans text-[10px] tracking-widest uppercase font-semibold mb-8 transition-colors"
        >
          <ArrowLeft class="w-3.5 h-3.5" />
          Abort Sequence
        </router-link>

        <!-- SCANNING ANIMATION STATE OVERLAY -->
        <div 
          v-if="showScanAnimation" 
          class="absolute inset-0 bg-space-black/95 z-50 flex flex-col items-center justify-center p-8 animate-[scanOverlay_0.3s_ease-out]"
        >
          <!-- Glowing HUD verify bar -->
          <div class="relative w-44 h-44 rounded-full border border-gold-primary/20 flex items-center justify-center mb-8">
            <svg class="absolute inset-0 w-full h-full animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(217,178,122,0.3)" stroke-width="1.5" stroke-dasharray="15 35" />
            </svg>
            <Cpu class="w-12 h-12 text-gold-primary animate-pulse" />

            <!-- Scanning laser bar moving up and down -->
            <div class="absolute left-4 right-4 h-[2px] bg-gold-primary/50 shadow-[0_0_10px_#D9B27A] animate-[laser_1.6s_ease-in-out_infinite]" />
          </div>

          <span class="font-sans text-[10px] tracking-[0.35em] text-wine-red font-bold uppercase mb-2">ACCESS AUDIT</span>
          <h4 class="font-serif text-2xl font-bold tracking-wide text-text-primary text-center">
            {{ scanStage }}
          </h4>
        </div>

        <!-- MODE: LOGIN SCREEN -->
        <div v-if="mode === 'login'" class="space-y-6">
          <div class="text-left">
            <span class="block font-sans text-[9px] tracking-[0.3em] text-gold-primary uppercase font-bold mb-2">Protocol Access</span>
            <h2 class="font-serif text-3xl font-bold text-text-primary tracking-wide">Access Terminal</h2>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="text-left">
              <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Verification Email</label>
              <input
                v-model="loginEmail"
                type="email"
                placeholder="e.g., alex@ync.community"
                class="w-full bg-space-black/50 border border-white/8 rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-muted/30 focus:border-gold-primary/50 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-colors shadow-inner"
              />
            </div>

            <div class="text-left">
              <div class="flex justify-between items-center mb-2">
                <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase">Terminal Pass</label>
                <span class="text-[9px] tracking-wider text-text-muted/50 font-sans cursor-pointer hover:text-gold-primary transition-colors">Forgot Pass?</span>
              </div>
              <div class="relative">
                <input
                  v-model="loginPass"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter access code"
                  class="w-full bg-space-black/50 border border-white/8 rounded-xl pl-4 pr-12 py-3.5 text-sm text-text-primary placeholder-text-muted/30 focus:border-gold-primary/50 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-colors shadow-inner"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors focus:outline-none"
                >
                  <EyeOff v-if="showPassword" class="w-4 h-4" />
                  <Eye v-else class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Remember me & Error panel -->
            <div class="flex items-center justify-between text-left font-sans text-xs text-text-muted select-none">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" v-model="rememberMe" class="rounded border-white/10 bg-space-black text-gold-primary focus:ring-0" />
                <span>Keep Verified</span>
              </label>
            </div>

            <p v-if="authError" class="text-xs text-wine-red tracking-wide font-sans text-left flex items-center gap-2">
              <ShieldAlert class="w-4 h-4 shrink-0" />
              {{ authError }}
            </p>

            <button
              type="submit"
              class="w-full py-4 rounded-xl bg-gradient-to-r from-gold-bronze to-gold-primary text-space-black font-semibold tracking-widest text-xs shadow-[0_4px_15px_rgba(217,178,122,0.2)] hover:shadow-[0_4px_25px_rgba(217,178,122,0.45)] transition-all duration-300 focus:outline-none cursor-pointer"
            >
              INITIALIZE PORTAL AUTHENTICATION
            </button>
          </form>

          <!-- Divider -->
          <div class="flex items-center gap-4 py-2">
            <div class="flex-1 h-[1px] bg-white/5" />
            <span class="font-sans text-[8px] tracking-widest text-text-muted/50 uppercase">OAuth Telemetry</span>
            <div class="flex-1 h-[1px] bg-white/5" />
          </div>

          <!-- OAuth Buttons -->
          <div class="grid grid-cols-2 gap-4">
            <button
              @click="handleGoogleLogin"
              class="py-3 rounded-xl border border-white/5 bg-white/2 hover:border-white/10 text-xs font-sans font-semibold tracking-wider text-text-muted hover:text-text-primary transition-all duration-300 cursor-pointer focus:outline-none"
            >
              Google Auth
            </button>
            <button
              @click="handleGithubLogin"
              class="py-3 rounded-xl border border-white/5 bg-white/2 hover:border-white/10 text-xs font-sans font-semibold tracking-wider text-text-muted hover:text-text-primary transition-all duration-300 cursor-pointer focus:outline-none"
            >
              GitHub Auth
            </button>
          </div>

          <div class="pt-4 border-t border-white/5 text-center font-sans text-xs text-text-muted">
            New Cadet?
            <span 
              @click="mode = 'register'; step = 1; authError = '';"
              class="text-gold-primary cursor-pointer font-bold hover:underline ml-1"
            >
              Initiate Boarding Sequence
            </span>
          </div>
        </div>

        <!-- MODE: MULTI-STEP REGISTER SEQUENCE -->
        <div v-else class="space-y-6">
          <div class="text-left flex justify-between items-end border-b border-white/5 pb-4">
            <div>
              <span class="block font-sans text-[9px] tracking-[0.3em] text-gold-primary uppercase font-bold mb-1">Boarding Module</span>
              <h2 class="font-serif text-2xl md:text-3xl font-bold text-text-primary tracking-wide">Register Signature</h2>
            </div>
            <span class="font-sans text-[10px] tracking-widest text-text-muted/50 font-semibold">
              STEP {{ step }} OF {{ totalSteps }}
            </span>
          </div>

          <!-- Step Progress bar -->
          <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              class="h-full bg-gold-primary transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              :style="{ width: `${(step / totalSteps) * 100}%` }"
            />
          </div>

          <!-- STEP 1: Personal Credentials -->
          <div v-if="step === 1" class="space-y-6 animate-[fadeIn_0.4s_ease-out]">
            <div class="text-left">
              <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Display Name</label>
              <input
                v-model="regName"
                type="text"
                placeholder="e.g., Aurelia Vance"
                class="w-full bg-space-black/50 border border-white/8 rounded-xl px-4 py-3.5 text-sm text-text-primary focus:border-gold-primary/50 focus:outline-none"
              />
            </div>
            <div class="text-left">
              <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Email Address</label>
              <input
                v-model="regEmail"
                type="email"
                placeholder="e.g., aurelia@ync.community"
                class="w-full bg-space-black/50 border border-white/8 rounded-xl px-4 py-3.5 text-sm text-text-primary focus:border-gold-primary/50 focus:outline-none"
              />
            </div>
            <div class="text-left">
              <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Portal Access Code</label>
              <input
                v-model="regPass"
                type="password"
                placeholder="Select secure password"
                class="w-full bg-space-black/50 border border-white/8 rounded-xl px-4 py-3.5 text-sm text-text-primary focus:border-gold-primary/50 focus:outline-none"
              />
            </div>
          </div>

          <!-- STEP 2: Academic Details -->
          <div v-if="step === 2" class="space-y-6 animate-[fadeIn_0.4s_ease-out]">
            <div class="text-left">
              <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-2">Academic Unit / School</label>
              <input
                v-model="regAcademic"
                type="text"
                placeholder="e.g., Stanford University (AI Research)"
                class="w-full bg-space-black/50 border border-white/8 rounded-xl px-4 py-3.5 text-sm text-text-primary focus:border-gold-primary/50 focus:outline-none"
              />
            </div>
          </div>

          <!-- STEP 3: Skills selection -->
          <div v-if="step === 3" class="space-y-6 animate-[fadeIn_0.4s_ease-out]">
            <div class="text-left">
              <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-3">Primary Tech/Design Skills</label>
              <div class="flex flex-wrap gap-2.5">
                <button
                  v-for="skill in availableSkills"
                  :key="skill"
                  type="button"
                  @click="toggleSkill(skill)"
                  class="px-4 py-2.5 rounded-xl border text-xs font-sans transition-all duration-300 focus:outline-none cursor-pointer"
                  :class="regSkills.includes(skill)
                    ? 'border-gold-primary bg-gold-primary/10 text-gold-primary shadow-[0_0_10px_rgba(217,178,122,0.15)]'
                    : 'border-white/5 bg-white/2 text-text-muted hover:border-white/10 hover:text-text-primary'"
                >
                  {{ skill }}
                </button>
              </div>
            </div>
          </div>

          <!-- STEP 4: Interests selection -->
          <div v-if="step === 4" class="space-y-6 animate-[fadeIn_0.4s_ease-out]">
            <div class="text-left">
              <label class="block font-sans text-[10px] tracking-widest text-text-muted uppercase mb-3">Core Chapter Interests</label>
              <div class="flex flex-wrap gap-2.5">
                <button
                  v-for="interest in availableInterests"
                  :key="interest"
                  type="button"
                  @click="toggleInterest(interest)"
                  class="px-4 py-2.5 rounded-xl border text-xs font-sans transition-all duration-300 focus:outline-none cursor-pointer"
                  :class="regInterests.includes(interest)
                    ? 'border-gold-primary bg-gold-primary/10 text-gold-primary shadow-[0_0_10px_rgba(217,178,122,0.15)]'
                    : 'border-white/5 bg-white/2 text-text-muted hover:border-white/10 hover:text-text-primary'"
                >
                  {{ interest }}
                </button>
              </div>
            </div>
          </div>

          <!-- STEP 5: Profile Initial Selector -->
          <div v-if="step === 5" class="space-y-6 text-center animate-[fadeIn_0.4s_ease-out]">
            <span class="block font-sans text-[10px] tracking-widest text-text-muted uppercase">Initial Signature Capsule</span>
            <div class="flex items-center justify-center my-6">
              <div class="w-24 h-24 rounded-full border border-gold-primary/30 bg-sec-bg shadow-[0_0_20px_rgba(217,178,122,0.2)] flex items-center justify-center">
                <span class="font-serif text-3xl font-bold text-gold-primary">
                  {{ regName ? regName.split(' ').map(n=>n[0]).join('').toUpperCase() : 'YNC' }}
                </span>
              </div>
            </div>
            <p class="font-sans text-xs text-text-muted max-w-xs mx-auto">
              Your profile initial signature capsule is initialized automatically from your display name credentials.
            </p>
          </div>

          <!-- STEP 6: Review Summary -->
          <div v-if="step === 6" class="space-y-6 text-left animate-[fadeIn_0.4s_ease-out]">
            <div class="p-5 rounded-2xl bg-white/2 border border-white/5 space-y-4 font-sans text-xs text-text-muted">
              <div>
                <span class="block text-[9px] tracking-widest text-text-muted/50 uppercase">Display Name</span>
                <span class="block text-sm font-semibold text-text-primary mt-0.5">{{ regName }}</span>
              </div>
              <div>
                <span class="block text-[9px] tracking-widest text-text-muted/50 uppercase">Email</span>
                <span class="block text-sm font-semibold text-text-primary mt-0.5">{{ regEmail }}</span>
              </div>
              <div>
                <span class="block text-[9px] tracking-widest text-text-muted/50 uppercase">Academic Unit</span>
                <span class="block text-sm font-semibold text-text-primary mt-0.5">{{ regAcademic }}</span>
              </div>
              <div>
                <span class="block text-[9px] tracking-widest text-text-muted/50 uppercase">Skills Selected</span>
                <span class="block text-sm font-semibold text-text-primary mt-0.5">{{ regSkills.join(', ') || 'None' }}</span>
              </div>
              <div>
                <span class="block text-[9px] tracking-widest text-text-muted/50 uppercase">Interests Mapped</span>
                <span class="block text-sm font-semibold text-text-primary mt-0.5">{{ regInterests.join(', ') || 'None' }}</span>
              </div>
            </div>
          </div>

          <!-- Error panel -->
          <p v-if="authError" class="text-xs text-wine-red tracking-wide font-sans text-left flex items-center gap-2">
            <ShieldAlert class="w-4 h-4 shrink-0" />
            {{ authError }}
          </p>

          <!-- Multi-step controls -->
          <div class="flex gap-4 pt-4 border-t border-white/5">
            <button
              v-if="step > 1"
              type="button"
              @click="handlePrevStep"
              class="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/5 bg-white/2 text-xs font-sans font-semibold tracking-wider text-text-muted hover:text-text-primary cursor-pointer transition-colors focus:outline-none"
            >
              <ArrowLeft class="w-3.5 h-3.5" />
              Back
            </button>
            
            <button
              v-if="step < totalSteps"
              type="button"
              @click="handleNextStep"
              class="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/5 border border-white/8 hover:border-gold-primary/30 text-xs font-sans font-semibold tracking-wider text-gold-primary hover:text-text-primary cursor-pointer transition-all duration-300 focus:outline-none"
            >
              Continue
              <ArrowRight class="w-3.5 h-3.5" />
            </button>

            <button
              v-else
              type="button"
              @click="handleRegister"
              class="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-gold-bronze to-gold-primary text-space-black font-semibold tracking-widest text-xs shadow-[0_4px_15px_rgba(217,178,122,0.2)] hover:shadow-[0_4px_25px_rgba(217,178,122,0.45)] transition-all duration-300 cursor-pointer focus:outline-none"
            >
              CONFIRM IDENTITY SIGNATURE
            </button>
          </div>

          <div class="pt-4 text-center font-sans text-xs text-text-muted">
            Already verified?
            <span 
              @click="mode = 'login'; authError = '';"
              class="text-gold-primary cursor-pointer font-bold hover:underline ml-1"
            >
              Access Terminal
            </span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scanOverlay {
  from { opacity: 0; filter: blur(5px); }
  to { opacity: 1; filter: blur(0); }
}

@keyframes laser {
  0% { top: 10%; opacity: 0.8; }
  50% { top: 90%; opacity: 0.8; }
  100% { top: 10%; opacity: 0.8; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
