import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { auth, db } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  updateDoc,
  addDoc,
  query,
  orderBy,
  getDocs
} from 'firebase/firestore';

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
  // Default values to seed if Firestore is empty
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
  const users = ref<UserProfile[]>([]);
  const announcements = ref<Announcement[]>([]);
  const registrations = ref<EventRegistration[]>([]);
  const currentUser = ref<UserProfile | null>(null);

  const isAuthed = computed(() => currentUser.value !== null);
  const isAdmin = computed(() => currentUser.value?.role === 'admin');

  let unsubscribeAnnouncements: (() => void) | null = null;
  let unsubscribeRegistrations: (() => void) | null = null;
  let unsubscribeUsers: (() => void) | null = null;

  // Real-time listeners setup
  function setupListeners() {
    // Clear any existing listeners first
    if (unsubscribeAnnouncements) unsubscribeAnnouncements();
    if (unsubscribeRegistrations) unsubscribeRegistrations();
    if (unsubscribeUsers) unsubscribeUsers();

    // Listen to announcements
    const announcementsRef = collection(db, 'announcements');
    const announcementsQuery = query(announcementsRef, orderBy('date', 'desc'));
    unsubscribeAnnouncements = onSnapshot(announcementsQuery, (snapshot) => {
      const list: Announcement[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: data.id || parseInt(docSnap.id) || Math.random(),
          title: data.title,
          body: data.body,
          date: data.date
        });
      });
      announcements.value = list;

      // Seed default announcements if empty
      if (list.length === 0 && currentUser.value?.role === 'admin') {
        seedDefaultAnnouncements();
      }
    });

    // Listen to registrations
    const regsRef = collection(db, 'registrations');
    unsubscribeRegistrations = onSnapshot(regsRef, (snapshot) => {
      const list: EventRegistration[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: data.id,
          memberName: data.memberName,
          memberEmail: data.memberEmail,
          memberId: data.memberId,
          eventName: data.eventName,
          eventId: data.eventId,
          role: data.role,
          status: data.status,
          appliedDate: data.appliedDate,
          dbId: docSnap.id // Custom field to track document ID
        } as any);
      });
      registrations.value = list;

      // Seed default registrations if empty
      if (list.length === 0 && currentUser.value?.role === 'admin') {
        seedDefaultRegistrations();
      }
    });

    // Setup cadet user lists for admin dashboard
    if (currentUser.value?.role === 'admin') {
      const usersRef = collection(db, 'users');
      unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
        const list: UserProfile[] = [];
        snapshot.forEach((docSnap) => {
          list.push(docSnap.data() as UserProfile);
        });
        users.value = list;
      });
    }
  }

  // Firebase Auth Observer
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        currentUser.value = userSnap.data() as UserProfile;
      } else {
        const name = firebaseUser.displayName || 'Stardust Explorer';
        const role = firebaseUser.email === 'admin@ync.community' ? 'admin' : 'member';
        const profilePic = name.split(' ').map(n => n[0]).join('').toUpperCase() || 'Y';
        
        const newProfile: UserProfile = {
          name,
          email: firebaseUser.email || '',
          role,
          memberId: `YNC-MEMBER-${Math.floor(Math.random() * 10000)}`,
          joinedDate: new Date().toISOString().split('T')[0],
          level: 1,
          xp: 150,
          badges: ['Cosmic Cadet'],
          profilePic,
          academicUnit: 'International Chapter',
          skills: [],
          interests: []
        };
        await setDoc(userRef, newProfile);
        currentUser.value = newProfile;
      }
      setupListeners();
    } else {
      currentUser.value = null;
      announcements.value = [];
      registrations.value = [];
      users.value = [];
      if (unsubscribeAnnouncements) unsubscribeAnnouncements();
      if (unsubscribeRegistrations) unsubscribeRegistrations();
      if (unsubscribeUsers) unsubscribeUsers();
    }
  });

  async function seedDefaultAnnouncements() {
    const announcementsRef = collection(db, 'announcements');
    for (const ann of defaultAnnouncements) {
      await addDoc(announcementsRef, ann);
    }
  }

  async function seedDefaultRegistrations() {
    const registrationsRef = collection(db, 'registrations');
    for (const reg of defaultRegistrations) {
      await addDoc(registrationsRef, reg);
    }
  }

  async function login(email: string, pass: string, _remember: boolean = false): Promise<boolean> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        currentUser.value = snap.data() as UserProfile;
      }
      return true;
    } catch (error: any) {
      // Auto-provision admin credentials inside Firebase if they do not exist
      if (email.toLowerCase() === 'admin@ync.community' && pass === 'admin123') {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
          const user = userCredential.user;
          const adminProfile: UserProfile = {
            name: 'Central Admin Office',
            email: 'admin@ync.community',
            role: 'admin',
            memberId: 'YNC-ORBIT-001',
            joinedDate: new Date().toISOString().split('T')[0],
            level: 10,
            xp: 4500,
            badges: ['Genesis Circle', 'Constellation Architect', 'Executive Lead'],
            profilePic: 'AV'
          };
          await setDoc(doc(db, 'users', user.uid), adminProfile);
          currentUser.value = adminProfile;
          return true;
        } catch (err: any) {
          throw err.message || err;
        }
      }
      throw error.message || 'Invalid credentials.';
    }
  }

  async function register(formData: Partial<UserProfile> & { pass: string }): Promise<boolean> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email!, formData.pass);
      const user = userCredential.user;

      const newId = `YNC-MEMBER-${Math.floor(Math.random() * 900) + 100}`;
      const newMember: UserProfile = {
        name: formData.name || 'Member',
        email: formData.email || '',
        role: 'member',
        memberId: newId,
        joinedDate: new Date().toISOString().split('T')[0],
        level: 1,
        xp: 150,
        badges: ['Cosmic Cadet'],
        profilePic: formData.name ? formData.name.split(' ').map(n=>n[0]).join('').toUpperCase() : 'YNC',
        academicUnit: formData.academicUnit || 'TBD',
        skills: formData.skills || [],
        interests: formData.interests || []
      };

      await setDoc(doc(db, 'users', user.uid), newMember);
      currentUser.value = newMember;
      return true;
    } catch (error: any) {
      throw error.message || 'Registration failed.';
    }
  }

  async function loginWithGoogle(): Promise<boolean> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        const name = user.displayName || 'Stardust Explorer';
        const profilePic = name.split(' ').map(n=>n[0]).join('').toUpperCase() || 'SE';
        
        const newMember: UserProfile = {
          name,
          email: user.email || '',
          role: 'member',
          memberId: `YNC-MEMBER-${Math.floor(Math.random() * 900) + 100}`,
          joinedDate: new Date().toISOString().split('T')[0],
          level: 1,
          xp: 200,
          badges: ['Google Boarding', 'Cosmic Cadet'],
          profilePic,
          academicUnit: 'International Chapter',
          skills: ['Growth', 'Public Speaking'],
          interests: ['Networking']
        };
        await setDoc(userRef, newMember);
        currentUser.value = newMember;
      } else {
        currentUser.value = snap.data() as UserProfile;
      }
      return true;
    } catch (error: any) {
      throw error.message || 'Google Auth failed.';
    }
  }

  async function loginWithGithub(): Promise<boolean> {
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        const name = user.displayName || 'Git Octocat';
        const profilePic = name.split(' ').map(n=>n[0]).join('').toUpperCase() || 'GO';
        
        const newMember: UserProfile = {
          name,
          email: user.email || '',
          role: 'member',
          memberId: `YNC-MEMBER-${Math.floor(Math.random() * 900) + 100}`,
          joinedDate: new Date().toISOString().split('T')[0],
          level: 2,
          xp: 400,
          badges: ['GitHub Boarding', 'Builder Circle'],
          profilePic,
          academicUnit: 'Open Source Chapter',
          skills: ['TypeScript', 'Git', 'Vite'],
          interests: ['Hackathons', 'Innovation']
        };
        await setDoc(userRef, newMember);
        currentUser.value = newMember;
      } else {
        currentUser.value = snap.data() as UserProfile;
      }
      return true;
    } catch (error: any) {
      throw error.message || 'GitHub Auth failed.';
    }
  }

  async function logout() {
    await signOut(auth);
    currentUser.value = null;
  }

  async function awardXP(amount: number, reason: string): Promise<string> {
    if (!currentUser.value || !auth.currentUser) return '';
    console.log(`[XP TELEMETRY] Granting ${amount} XP. Reason: ${reason}`);
    
    currentUser.value.xp += amount;
    const newLevel = Math.floor(currentUser.value.xp / 500) + 1;
    let leveledUpMessage = '';
    
    if (newLevel > currentUser.value.level) {
      currentUser.value.level = newLevel;
      leveledUpMessage = `Level Up! You reached level ${newLevel}!`;
      const levelBadge = `Level ${newLevel} Core`;
      if (!currentUser.value.badges.includes(levelBadge)) {
        currentUser.value.badges.push(levelBadge);
      }
    }

    const userRef = doc(db, 'users', auth.currentUser.uid);
    await setDoc(userRef, currentUser.value);
    
    return leveledUpMessage;
  }

  async function applyForEventPass(eventId: number, eventName: string, role: string): Promise<boolean> {
    if (!currentUser.value || !auth.currentUser) return false;

    const exists = registrations.value.some(
      r => r.eventId === eventId && r.memberId === currentUser.value?.memberId
    );
    if (exists) return true;

    const regId = Math.floor(Math.random() * 100000);
    const newReg: EventRegistration = {
      id: regId,
      memberName: currentUser.value.name,
      memberEmail: currentUser.value.email,
      memberId: currentUser.value.memberId,
      eventName,
      eventId,
      role,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    await addDoc(collection(db, 'registrations'), newReg);
    await awardXP(100, `Applied for ${eventName}`);
    return true;
  }

  async function approvePass(regId: number) {
    const regItem = registrations.value.find(r => r.id === regId);
    if (!regItem) return;

    const regDocId = (regItem as any).dbId;
    if (regDocId) {
      const regRef = doc(db, 'registrations', regDocId);
      await updateDoc(regRef, { status: 'approved' });
    }

    // Find and update user's XP in Firestore
    const usersRef = collection(db, 'users');
    const q = query(usersRef);
    const snap = await getDocs(q);
    let userUidToUpdate: string | null = null;
    let targetUser: UserProfile | null = null;

    snap.forEach((docSnap) => {
      const u = docSnap.data() as UserProfile;
      if (u.memberId === regItem.memberId) {
        userUidToUpdate = docSnap.id;
        targetUser = u;
      }
    });

    if (userUidToUpdate && targetUser) {
      const userToUpdate = targetUser as UserProfile;
      userToUpdate.xp += 150;
      const newLevel = Math.floor(userToUpdate.xp / 500) + 1;
      if (newLevel > userToUpdate.level) {
        userToUpdate.level = newLevel;
        userToUpdate.badges.push(`Level ${newLevel} Core`);
      }
      await setDoc(doc(db, 'users', userUidToUpdate), userToUpdate);
    }
  }

  async function rejectPass(regId: number) {
    const regItem = registrations.value.find(r => r.id === regId);
    if (!regItem) return;

    const regDocId = (regItem as any).dbId;
    if (regDocId) {
      const regRef = doc(db, 'registrations', regDocId);
      await updateDoc(regRef, { status: 'rejected' });
    }
  }

  async function createAnnouncement(title: string, body: string) {
    const newAnn = {
      id: Math.floor(Math.random() * 100000),
      title,
      body,
      date: new Date().toISOString().split('T')[0]
    };
    await addDoc(collection(db, 'announcements'), newAnn);
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
