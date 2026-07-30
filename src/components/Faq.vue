<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const faqs = ref<FaqItem[]>([
  {
    question: 'What is YNC and who can join?',
    answer: 'YNC (Youth Networking Community) is an elite, international community bringing together ambitious student builders, software engineers, designers, researchers, and early-stage founders. Membership is selective and geared toward those actively shipping products, conducting deep research, or leading initiatives.',
    isOpen: false
  },
  {
    question: 'How do I secure a pass for upcoming summits and galas?',
    answer: 'Passes to our galas (like the Ritz-Carlton Nebula Summit) are highly exclusive. You can submit an application via the "Register for Pass" button in the Events section. Selected applicants will receive a digital boarding pass with QR access and event details.',
    isOpen: false
  },
  {
    question: 'Is there a membership fee to join the community?',
    answer: 'No, general community membership is completely free. We are supported by our corporate sponsors, venture capital partners, and tech sponsors who fund our operations, masterclasses, and project grants.',
    isOpen: false
  },
  {
    question: 'How does the Venture Innovation Incubator work?',
    answer: 'Members working on interesting projects (software, AI agents, hardware, etc.) can apply for incubator space. We provide direct mentorship from industry veterans, peer review workshops, and access to seed grants ranging from $500 to $5,000 to launch prototypes.',
    isOpen: false
  },
  {
    question: 'How can brands or venture funds partner with YNC?',
    answer: 'We collaborate with forward-thinking brands and venture capital firms looking to connect with elite technical talent. Partners can sponsor hackathons, host exclusive mixers, or sponsor workspace grants. Contact us via the contact form below.',
    isOpen: false
  }
]);

function toggleFaq(index: number) {
  faqs.value.forEach((faq, i) => {
    if (i === index) {
      faq.isOpen = !faq.isOpen;
    } else {
      faq.isOpen = false;
    }
  });
}
</script>

<template>
  <section
    id="faq"
    class="relative py-24 md:py-32 px-6 bg-space-black"
  >
    <!-- Background glows -->
    <div class="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-burgundy-deep/5 rounded-full blur-[140px] pointer-events-none" />

    <div class="max-w-4xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-3 block">
          Clarifying the Cosmos
        </span>
        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Frequently Answered
        </h2>
        <p class="font-sans text-sm md:text-base text-text-muted max-w-xl mx-auto">
          Everything you need to know about joining YNC, securing gala passes, and incubator support.
        </p>
      </div>

      <!-- Accordion List -->
      <div class="space-y-4">
        <div
          v-for="(faq, idx) in faqs"
          :key="idx"
          class="glass-card rounded-3xl border border-white/5 overflow-hidden transition-all duration-300"
          :class="{ 'border-gold-primary/20 shadow-[0_4px_25px_rgba(217,178,122,0.05)]': faq.isOpen }"
        >
          <!-- Trigger Header -->
          <button
            @click="toggleFaq(idx)"
            class="w-full flex items-center justify-between p-6 md:p-8 text-left hover:text-gold-primary focus:outline-none transition-colors"
          >
            <div class="flex items-center gap-4">
              <span class="font-serif text-lg md:text-xl font-bold text-gold-primary/40 select-none">
                {{ String(idx + 1).padStart(2, '0') }}
              </span>
              <span class="font-serif text-lg md:text-xl font-semibold text-text-primary tracking-wide">
                {{ faq.question }}
              </span>
            </div>
            <ChevronDown
              class="w-5 h-5 text-gold-soft shrink-0 transition-transform duration-500"
              :class="{ 'rotate-180 text-gold-primary': faq.isOpen }"
            />
          </button>

          <!-- Collapsible Content Wrapper -->
          <div
            class="transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden"
            :style="{ maxHeight: faq.isOpen ? '300px' : '0' }"
          >
            <div class="px-6 pb-8 pl-14 pr-10 text-xs md:text-sm text-text-muted font-sans leading-relaxed border-t border-white/5 pt-4">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
