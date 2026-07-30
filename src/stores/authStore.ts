import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface UserProfile {
  name: string;
  email: string;
  role: 'admin' | 'member';
  memberId: string;
  joinedDate: string;
  level: number;
  xp: number;
  badges: string[];
  profilePic: string;
  academicUnit?: string;
  skills?: string[];
  interests?: string[];
}

export interface Announcement {
  id: number;
  title: string;
  body: string;
  date: string;
}

export interface EventRegistration {
  id: number;
  memberName: string;
  memberEmail: string;
  memberId: string;
  eventName: string;
  eventId: number;
  role: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export const useAuthStore = defineStore('auth', () => {
  // Load users from localStorage, or seed default database
  const defaultUsers: UserProfile[] = [
    {
      name: 'Central Admin Office',
      email: 'admin@ync.community',
      role: 'admin',
      memberId: 'YNC-ORBIT-001',
      joinedDate: '2023-01-05',
      level: 10,
      xp: 4500,
      badges: ['Genesis Circle', 'Constellation Architect', 'Executive Lead'],
      profilePic: 'AV'
    },
    {
      name: 'Aurelia Vance',
      email: 'aurelia@ync.community',
      role: 'member',
      memberId: 'YNC-MEMBER-101',
      joinedDate: '2023-03-10',
      level: 5,
      xp: 2200,
      badges: ['Genesis Circle', 'Summit Curator'],
      profilePic: 'AV',
      academicUnit: 'Stanford University (CS)',
      skills: ['Vue', 'Design Systems', 'Strategy'],
      interests: ['Networking', 'Leadership']
    },
    {
      name: 'Kaelen Sterling',
      email: 'kaelen@ync.community',
      role: 'member',
      memberId: 'YNC-MEMBER-102',
      joinedDate: '2023-08-15',
      level: 4,
      xp: 1600,
      badges: ['Developer Orbit', 'Innovation Award'],
      profilePic: 'KS',
      academicUnit: 'MIT (AI Research)',
      skills: ['Python', 'Rust', 'Cloud Systems'],
      interests: ['Hackathons', 'AI/ML']
    }
  ];

  const defaultAnnouncements: Announcement[] = [
    {
      id: 1,
      title: 'Prom Night Boarding Passes Open',
      body: 'General applications for the Visakhapatnam Prom Night gala are now live. Secure your red-carpet passes early!',
      date: '2026-07-28'
    },
    {
      id: 2,
      title: 'YNC Chapter Guidelines Shared',
      body: 'Official leadership guidelines for managing cohort teams and networking mixers have been uploaded to chapter vaults.',
      date: '2026-07-25'
    }
  ];

  const defaultRegistrations: EventRegistration[] = [
    {
      id: 1,
      memberName: 'Aurelia Vance',
      memberEmail: 'aurelia@ync.community',
      memberId: 'YNC-MEMBER-101',
      eventName: "Vizag's Most Awaited Prom Night",
      eventId: 1,
      role: 'Founder',
      status: 'approved',
      appliedDate: '2026-07-28'
    },
    {
      id: 2,
      memberName: 'Kaelen Sterling',
      memberEmail: 'kaelen@ync.community',
      memberId: 'YNC-MEMBER-102',
      eventName: "Vizag's Most Awaited Prom Night",
      eventId: 1,
      role: 'Builder',
      status: 'pending',
      appliedDate: '2026-07-29'
    }
  ];

  // Initialize State
  const users = ref<UserProfile[]>(JSON.parse(localStorage.getItem('ync_users') || 'null') || defaultUsers);
  const announcements = ref<Announcement[]>(JSON.parse(localStorage.getItem('ync_announcements') || 'null') || defaultAnnouncements);
  const registrations = ref<EventRegistration[]>(JSON.parse(localStorage.getItem('ync_registrations') || 'null') || defaultRegistrations);
  
  const currentUser = ref<UserProfile | null>(JSON.parse(localStorage.getItem('ync_current_user') || 'null'));
  const isAuthed = computed(() => currentUser.value !== null);
  const isAdmin = computed(() => currentUser.value?.role === 'admin');

  // Helper sync
  function syncDB() {
    localStorage.setItem('ync_users', JSON.stringify(users.value));
    localStorage.setItem('ync_announcements', JSON.stringify(announcements.value));
    localStorage.setItem('ync_registrations', JSON.stringify(registrations.value));
    if (currentUser.value) {
      localStorage.setItem('ync_current_user', JSON.stringify(currentUser.value));
    } else {
      localStorage.removeItem('ync_current_user');
    }
  }

  function login(email: string, pass: string, _remember: boolean = false): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple mock authentication check
        const matched = users.value.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (matched) {
          // If preseeded, allow bypass with correct credentials simulated (any password for mock or email-matching pass)
          if (email === 'admin@ync.community' && pass !== 'admin123') {
            reject('Invalid administrator credentials.');
            return;
          }
          currentUser.value = matched;
          syncDB();
          resolve(true);
        } else {
          reject('No credentials matching this address were logged.');
        }
      }, 1000);
    });
  }

  function register(formData: Partial<UserProfile> & { pass: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = users.value.some(u => u.email.toLowerCase() === formData.email?.toLowerCase());
        if (exists) {
          reject('This email address is already logged.');
          return;
        }

        const newId = `YNC-MEMBER-${100 + users.value.length + 1}`;
        const newMember: UserProfile = {
          name: formData.name || 'Member',
          email: formData.email || '',
          role: 'member',
          memberId: newId,
          joinedDate: new Date().toISOString().split('T')[0],
          level: 1,
          xp: 150, // Starter XP
          badges: ['Cosmic Cadet'],
          profilePic: formData.name ? formData.name.split(' ').map(n=>n[0]).join('').toUpperCase() : 'YNC',
          academicUnit: formData.academicUnit || 'TBD',
          skills: formData.skills || [],
          interests: formData.interests || []
        };

        users.value.push(newMember);
        currentUser.value = newMember;
        syncDB();
        resolve(true);
      }, 1200);
    });
  }

  function loginWithGoogle(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const googleUser: UserProfile = {
          name: 'Stardust Explorer',
          email: 'explorer@gmail.com',
          role: 'member',
          memberId: `YNC-MEMBER-${100 + users.value.length + 1}`,
          joinedDate: new Date().toISOString().split('T')[0],
          level: 1,
          xp: 200,
          badges: ['Google Boarding', 'Cosmic Cadet'],
          profilePic: 'SE',
          academicUnit: 'International Chapter',
          skills: ['Growth', 'Public Speaking'],
          interests: ['Networking']
        };
        users.value.push(googleUser);
        currentUser.value = googleUser;
        syncDB();
        resolve(true);
      }, 1000);
    });
  }

  function loginWithGithub(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const githubUser: UserProfile = {
          name: 'Git Octocat',
          email: 'octo@github.com',
          role: 'member',
          memberId: `YNC-MEMBER-${100 + users.value.length + 1}`,
          joinedDate: new Date().toISOString().split('T')[0],
          level: 2,
          xp: 400,
          badges: ['GitHub Boarding', 'Builder Circle'],
          profilePic: 'GO',
          academicUnit: 'Open Source Chapter',
          skills: ['TypeScript', 'Git', 'Vite'],
          interests: ['Hackathons', 'Innovation']
        };
        users.value.push(githubUser);
        currentUser.value = githubUser;
        syncDB();
        resolve(true);
      }, 1000);
    });
  }

  function logout() {
    currentUser.value = null;
    localStorage.removeItem('ync_current_user');
  }

  function awardXP(amount: number, reason: string): string {
    if (!currentUser.value) return '';
    console.log(`[XP TELEMETRY] Granted ${amount} XP. Directive: ${reason}`);
    currentUser.value.xp += amount;
    
    // Check level thresholds (e.g. 500 XP per level)
    const newLevel = Math.floor(currentUser.value.xp / 500) + 1;
    let leveledUpMessage = '';
    
    if (newLevel > currentUser.value.level) {
      currentUser.value.level = newLevel;
      leveledUpMessage = `Level Up! You reached level ${newLevel}!`;
      // Award leveling badge
      const levelBadge = `Level ${newLevel} Core`;
      if (!currentUser.value.badges.includes(levelBadge)) {
        currentUser.value.badges.push(levelBadge);
      }
    }

    // Sync state into users database
    const idx = users.value.findIndex(u => u.memberId === currentUser.value?.memberId);
    if (idx !== -1) {
      users.value[idx] = currentUser.value;
    }
    syncDB();
    
    return leveledUpMessage;
  }

  function applyForEventPass(eventId: number, eventName: string, role: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!currentUser.value) return resolve(false);

        // Check if already registered
        const exists = registrations.value.some(
          r => r.eventId === eventId && r.memberId === currentUser.value?.memberId
        );
        if (exists) return resolve(true);

        const newReg: EventRegistration = {
          id: registrations.value.length + 1,
          memberName: currentUser.value.name,
          memberEmail: currentUser.value.email,
          memberId: currentUser.value.memberId,
          eventName,
          eventId,
          role,
          status: 'pending',
          appliedDate: new Date().toISOString().split('T')[0]
        };

        registrations.value.push(newReg);
        syncDB();
        
        // Award XP for participating
        awardXP(100, `Applied for ${eventName}`);
        resolve(true);
      }, 1000);
    });
  }

  // Admin Actions
  function approvePass(regId: number) {
    const idx = registrations.value.findIndex(r => r.id === regId);
    if (idx !== -1) {
      registrations.value[idx].status = 'approved';
      
      // Award XP to that user
      const member = users.value.find(u => u.memberId === registrations.value[idx].memberId);
      if (member) {
        member.xp += 150; // Approving passes awards extra XP
        const newLevel = Math.floor(member.xp / 500) + 1;
        if (newLevel > member.level) {
          member.level = newLevel;
          member.badges.push(`Level ${newLevel} Core`);
        }
      }
      syncDB();
    }
  }

  function rejectPass(regId: number) {
    const idx = registrations.value.findIndex(r => r.id === regId);
    if (idx !== -1) {
      registrations.value[idx].status = 'rejected';
      syncDB();
    }
  }

  function createAnnouncement(title: string, body: string) {
    const newAnn: Announcement = {
      id: announcements.value.length + 1,
      title,
      body,
      date: new Date().toISOString().split('T')[0]
    };
    announcements.value.unshift(newAnn);
    syncDB();
  }

  return {
    users,
    announcements,
    registrations,
    currentUser,
    isAuthed,
    isAdmin,
    login,
    register,
    loginWithGoogle,
    loginWithGithub,
    logout,
    awardXP,
    applyForEventPass,
    approvePass,
    rejectPass,
    createAnnouncement
  };
});
