import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import brokenChair from '@assets/generated_images/broken_classroom_chair.png';
// import libraryStudy from '@assets/generated_images/library_study_area.png';

export type Role = 'student' | 'admin';

export type Status = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Complaint {
  id: string;
  userId: string;
  userEmail: string;
  category: string;
  description: string;
  location?: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  imageUrl?: string;
  aiSummary?: string;
}

interface AppState {
  user: User | null;
  complaints: Complaint[];
  login: (email: string, role: Role) => void;
  logout: () => void;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'status' | 'userId' | 'userEmail'>) => void;
  updateComplaintStatus: (id: string, status: Status) => void;
}

const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'C-1001',
    userId: '1',
    userEmail: 'alex@campus.edu',
    category: 'Facilities',
    description: 'The chair in lecture hall 3B is completely broken. Someone might get hurt if they try to sit on it.',
    location: 'Lecture Hall 3B',
    priority: 'HIGH',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 100000000).toISOString(),
    imageUrl: "",
    aiSummary: 'Safety hazard reported in Lecture Hall 3B involving a broken chair. Immediate repair recommended.'
  },
  {
    id: 'C-1002',
    userId: '1',
    userEmail: 'alex@campus.edu',
    category: 'Environment',
    description: 'The air conditioning in the library study area is making a very loud rattling noise. It is impossible to concentrate.',
    location: 'Main Library, 2nd Floor',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    createdAt: new Date(Date.now() - 200000000).toISOString(),
    imageUrl: "",
    aiSummary: 'Noise complaint regarding HVAC system in Main Library. Impacting student study environment.'
  },
  {
    id: 'C-1003',
    userId: '3',
    userEmail: 'sarah@campus.edu',
    category: 'Plumbing',
    description: 'Water fountain near the gym is leaking water onto the floor. Slipping hazard.',
    location: 'Gymnasium Hallway',
    priority: 'HIGH',
    status: 'RESOLVED',
    createdAt: new Date(Date.now() - 500000000).toISOString(),
    aiSummary: 'Water leak detected near Gymnasium. Potential slip-and-fall risk. Maintenance required.'
  }
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      complaints: MOCK_COMPLAINTS,
      login: (email, role) => {
        set({
          user: {
            id: role === 'student' ? '1' : '2',
            email,
            name: role === 'student' ? 'Alex Student' : 'Admin User',
            role,
          },
        });
      },
      logout: () => set({ user: null }),
      addComplaint: (data) => {
        const { user, complaints } = get();
        if (!user) return;

        const newComplaint: Complaint = {
          id: `C-${1000 + complaints.length + 1}`,
          userId: user.id,
          userEmail: user.email,
          status: 'PENDING',
          createdAt: new Date().toISOString(),
          ...data,
          // Mock AI summary generation
          aiSummary: `Auto-generated summary for: ${data.description.substring(0, 50)}...`,
        };

        set({ complaints: [newComplaint, ...complaints] });
      },
      updateComplaintStatus: (id, status) => {
        set((state) => ({
          complaints: state.complaints.map((c) =>
            c.id === id ? { ...c, status } : c
          ),
        }));
      },
    }),
    {
      name: 'campus-app-storage',
    }
  )
);
