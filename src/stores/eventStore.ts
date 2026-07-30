import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface EventItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  date: string; // ISO string or parsable date
  venue: string;
  time: string;
  image: string;
  type: 'Summit' | 'Hackathon' | 'Mixer' | 'Gala';
}

export interface Registration {
  name: string;
  email: string;
  eventId: number;
  role: string;
}

export const useEventStore = defineStore('eventStore', () => {
  const events = ref<EventItem[]>([
    {
      id: 1,
      title: "Vizag's Most Awaited Prom Night",
      subtitle: 'Dance • Dress • Celebrate',
      description: 'The most awaited evening curated by Youth Networking Community. Steal the night on the red carpet with elegant dress codes, dance dynamics, and celebratory interactions at Vizag\'s premium destination.',
      date: '2026-07-31T17:00:00',
      venue: 'Gram Coffee and Kitchen, Sagar Nagar, Yendada, Visakhapatnam, 530045',
      time: '05:00 PM onwards',
      image: '/images/prom_poster.jpg',
      type: 'Gala'
    }
  ]);

  const registrations = ref<Registration[]>([]);
  const isSubmitting = ref(false);
  const successMessage = ref('');

  function registerForEvent(name: string, email: string, eventId: number, role: string) {
    isSubmitting.value = true;
    successMessage.value = '';

    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        registrations.value.push({ name, email, eventId, role });
        isSubmitting.value = false;
        successMessage.value = 'Registration successful! Your celestial boarding pass has been sent to ' + email;
        resolve(true);
      }, 1200);
    });
  }

  return {
    events,
    registrations,
    isSubmitting,
    successMessage,
    registerForEvent
  };
});
