<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
  Code,
  Users,
  Compass,
  Zap,
  Calendar,
  Layers,
  Award,
  ShieldAlert
} from 'lucide-vue-next';
import Sparkles from '@/components/ui/sparkles/Sparkles.vue';

interface ConstNode {
  id: number;
  label: string;
  category: string;
  description: string;
  left: string; // Percentage for styling
  top: string;
  icon: any;
  connections: number[]; // Connected Node IDs
}

const containerRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const hoveredNodeId = ref<number | null>(null);

const nodes = ref<ConstNode[]>([
  { id: 1, label: 'Hackathons', category: 'Build', description: '36-hour design sprints and code challenges.', left: '15%', top: '35%', icon: Code, connections: [2, 5] },
  { id: 2, label: 'Mixers', category: 'Networking', description: 'Luxury ballroom networking assemblies.', left: '42%', top: '15%', icon: Users, connections: [1, 3, 6] },
  { id: 3, label: 'Leadership', category: 'Directive', description: 'Run international chapters and steer builds.', left: '72%', top: '25%', icon: Compass, connections: [2, 4, 7] },
  { id: 4, label: 'Grants', category: 'Venture', description: 'Incubator funding packages of $1.5K.', left: '88%', top: '50%', icon: Zap, connections: [3, 8] },
  { id: 5, label: 'Masterclasses', category: 'Cohort', description: 'Deep-dive business design workshops.', left: '22%', top: '75%', icon: Layers, connections: [1, 6] },
  { id: 6, label: 'Competitions', category: 'Build', description: 'Product pitching forums and hackathons.', left: '50%', top: '65%', icon: Award, connections: [2, 5, 7] },
  { id: 7, label: 'Credential Cards', category: 'System', description: 'Custom digital membership wallet cards.', left: '75%', top: '78%', icon: ShieldAlert, connections: [3, 6, 8] },
  { id: 8, label: 'Ecosystem', category: 'Lounge', description: 'Selective digital lounges and project wikis.', left: '90%', top: '80%', icon: Calendar, connections: [4, 7] }
]);

// Redraw connections on canvas
function updateCanvas() {
  const canvas = canvasRef.value;
  const container = containerRef.value;
  if (!canvas || !container) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, rect.width, rect.height);

  // If no node is hovered, draw faint connections globally
  if (hoveredNodeId.value === null) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1.2;
    drawAllConnections(ctx, rect.width, rect.height);
    return;
  }

  // Draw highlight connections for active hovered node
  const activeNode = nodes.value.find(n => n.id === hoveredNodeId.value);
  if (!activeNode) return;

  const activeX = getAbsoluteCoords(activeNode.left, rect.width);
  const activeY = getAbsoluteCoords(activeNode.top, rect.height);

  ctx.strokeStyle = 'rgba(217, 178, 122, 0.35)'; // Gold connection lines
  ctx.shadowColor = '#D9B27A';
  ctx.shadowBlur = 10;
  ctx.lineWidth = 1.8;

  activeNode.connections.forEach((targetId) => {
    const targetNode = nodes.value.find(n => n.id === targetId);
    if (targetNode) {
      const targetX = getAbsoluteCoords(targetNode.left, rect.width);
      const targetY = getAbsoluteCoords(targetNode.top, rect.height);

      ctx.beginPath();
      ctx.moveTo(activeX, activeY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();
    }
  });

  // Reset shadow for other renderings
  ctx.shadowBlur = 0;
}

function drawAllConnections(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const drawn = new Set<string>();
  nodes.value.forEach((node) => {
    const startX = getAbsoluteCoords(node.left, width);
    const startY = getAbsoluteCoords(node.top, height);

    node.connections.forEach((targetId) => {
      const target = nodes.value.find(t => t.id === targetId);
      if (target) {
        const key = [node.id, target.id].sort().join('-');
        if (!drawn.has(key)) {
          drawn.add(key);
          const targetX = getAbsoluteCoords(target.left, width);
          const targetY = getAbsoluteCoords(target.top, height);
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(targetX, targetY);
          ctx.stroke();
        }
      }
    });
  });
}

function getAbsoluteCoords(percentageStr: string, totalSize: number) {
  const val = parseFloat(percentageStr);
  return (val / 100) * totalSize;
}

let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
  updateCanvas();
  resizeObserver = new ResizeObserver(updateCanvas);
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value);
  }
});

onBeforeUnmount(() => {
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value);
  }
});

function handleMouseEnterNode(id: number) {
  hoveredNodeId.value = id;
  updateCanvas();
}

function handleMouseLeaveNode() {
  hoveredNodeId.value = null;
  updateCanvas();
}
</script>

<template>
  <section
    id="features"
    class="relative py-24 md:py-32 px-6 bg-space-black select-none"
  >
    <!-- Background sparkles overlay -->
    <div class="absolute inset-0 opacity-15 pointer-events-none">
      <Sparkles
        particle-color="#D9B27A"
        :min-size="1.2"
        :max-size="3.2"
        :speed="2"
        :particle-density="40"
      />
    </div>

    <!-- Cosmic Glow -->
    <div class="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-burgundy-deep/5 rounded-full blur-[140px] pointer-events-none" />

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="font-sans text-[10px] tracking-[0.3em] text-gold-primary font-semibold uppercase mb-3 block">
          Elite Infrastructure
        </span>
        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Ecosystem Constellation
        </h2>
        <p class="font-sans text-sm md:text-base text-text-muted max-w-xl mx-auto">
          Hover any offering node to trigger stellar alignment vectors and highlight linked program channels.
        </p>
      </div>

      <!-- Constellation Grid Area -->
      <div 
        ref="containerRef"
        class="relative w-full h-[550px] md:h-[650px] rounded-[3rem] border border-white/5 bg-space-black/35 backdrop-blur-xl overflow-hidden"
      >
        <!-- HTML5 Canvas Overlay for Connections -->
        <canvas
          ref="canvasRef"
          class="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        <!-- Constellation Star Nodes -->
        <div
          v-for="node in nodes"
          :key="node.id"
          class="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          :style="{ left: node.left, top: node.top }"
          @mouseenter="handleMouseEnterNode(node.id)"
          @mouseleave="handleMouseLeaveNode"
        >
          <!-- Star Core Glow -->
          <div 
            class="relative w-12 h-12 rounded-full border bg-sec-bg flex items-center justify-center transition-all duration-500"
            :class="hoveredNodeId === node.id 
              ? 'border-gold-primary/80 shadow-[0_0_20px_#D9B27A] scale-110 text-gold-primary' 
              : 'border-white/10 text-text-muted hover:border-white/20'"
          >
            <component :is="node.icon" class="w-4 h-4" />
          </div>

          <!-- Tooltip Node Info (Visible on Hover) -->
          <div
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-3 rounded-2xl bg-space-black/95 border border-gold-primary/20 text-left font-sans shadow-2xl opacity-0 scale-90 pointer-events-none transition-all duration-300 w-56 z-40"
            :class="{ 'opacity-100 scale-100': hoveredNodeId === node.id }"
          >
            <span class="block text-[8px] tracking-widest text-gold-primary uppercase font-bold mb-1">{{ node.category }}</span>
            <span class="block text-sm font-serif font-bold text-text-primary mb-1">{{ node.label }}</span>
            <span class="block text-[10px] text-text-muted leading-relaxed">{{ node.description }}</span>
            <div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-space-black/95" />
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Twinkling helper values */
canvas {
  backface-visibility: hidden;
}
</style>
