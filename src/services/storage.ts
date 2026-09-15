import {
  UserProfile,
  Property,
  Room,
  AllocationResult,
  AnonymousPost,
  SharedExpense,
  ChoreItem,
  ConflictReport,
  Message
} from '../types';
import {
  INITIAL_PROPERTIES,
  INITIAL_ROOMS,
  MOCK_STUDENTS,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_EXPENSES,
  INITIAL_CHORES
} from '../data/mockData';
import { AllocationEngine } from './allocationEngine';

const STORAGE_KEYS = {
  CURRENT_USER: 'campusnest_current_user_v1',
  CANDIDATE_POOL: 'campusnest_candidates_v1',
  PROPERTIES: 'campusnest_properties_v1',
  ROOMS: 'campusnest_rooms_v1',
  ALLOCATIONS: 'campusnest_allocations_v1',
  POSTS: 'campusnest_posts_v1',
  EXPENSES: 'campusnest_expenses_v1',
  CHORES: 'campusnest_chores_v1',
  CONFLICTS: 'campusnest_conflicts_v1',
  MESSAGES: 'campusnest_messages_v1'
};

export class StorageService {
  // Current User
  public static getCurrentUser(): UserProfile | null {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.isRegistered && parsed.fullName) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing user', e);
      }
    }
    // No fake/default user is automatically created or logged in
    return null;
  }

  public static saveCurrentUser(user: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  public static removeCurrentUser(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  // Candidate Pool
  public static getCandidates(): UserProfile[] {
    const saved = localStorage.getItem(STORAGE_KEYS.CANDIDATE_POOL);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  }

  public static saveCandidates(candidates: UserProfile[]): void {
    localStorage.setItem(STORAGE_KEYS.CANDIDATE_POOL, JSON.stringify(candidates));
  }

  public static addCandidate(candidate: UserProfile): UserProfile[] {
    const list = this.getCandidates();
    const existingIndex = list.findIndex(c => c.id === candidate.id);
    let updated: UserProfile[];
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = candidate;
    } else {
      updated = [...list, candidate];
    }
    this.saveCandidates(updated);
    return updated;
  }

  // Properties & Rooms
  public static getProperties(): Property[] {
    const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    this.saveProperties(INITIAL_PROPERTIES);
    return INITIAL_PROPERTIES;
  }

  public static saveProperties(properties: Property[]): void {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
  }

  public static getRooms(): Room[] {
    const saved = localStorage.getItem(STORAGE_KEYS.ROOMS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    this.saveRooms(INITIAL_ROOMS);
    return INITIAL_ROOMS;
  }

  public static saveRooms(rooms: Room[]): void {
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
  }

  // Allocations
  public static getAllocation(userId: string): AllocationResult | null {
    if (!userId) return null;
    const saved = localStorage.getItem(`${STORAGE_KEYS.ALLOCATIONS}_${userId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  }

  public static saveAllocation(
    userIdOrAllocation: string | AllocationResult,
    possibleAllocation?: AllocationResult
  ): void {
    if (typeof userIdOrAllocation === 'string' && possibleAllocation) {
      localStorage.setItem(`${STORAGE_KEYS.ALLOCATIONS}_${userIdOrAllocation}`, JSON.stringify(possibleAllocation));
    } else if (typeof userIdOrAllocation !== 'string') {
      localStorage.setItem(`${STORAGE_KEYS.ALLOCATIONS}_${userIdOrAllocation.userId}`, JSON.stringify(userIdOrAllocation));
    }
  }

  public static removeAllocation(userId: string): void {
    localStorage.removeItem(`${STORAGE_KEYS.ALLOCATIONS}_${userId}`);
  }

  // Messages (In-Platform Chat)
  public static getMessages(allocationId: string): Message[] {
    const saved = localStorage.getItem(`${STORAGE_KEYS.MESSAGES}_${allocationId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }

    const defaultMessages: Message[] = [
      {
        id: 'msg-sys-1',
        senderId: 'system',
        senderName: 'CampusNest SafeGate',
        senderAvatar: '',
        text: '🛡️ Controlled Secure Channel Initialized. In accordance with safety rules, private contact details remain confidential. You can coordinate move-in timings, quiet hours, and shared essentials here.',
        timestamp: 'Active',
        isSystemNotice: true
      }
    ];

    this.saveMessages(allocationId, defaultMessages);
    return defaultMessages;
  }

  public static saveMessages(allocationId: string, messages: Message[]): void {
    localStorage.setItem(`${STORAGE_KEYS.MESSAGES}_${allocationId}`, JSON.stringify(messages));
  }

  public static addMessage(allocationId: string, message: Message): Message[] {
    const current = this.getMessages(allocationId);
    const updated = [...current, message];
    this.saveMessages(allocationId, updated);
    return updated;
  }

  // Anonymous Community Posts
  public static getCommunityPosts(): AnonymousPost[] {
    const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    this.saveCommunityPosts(INITIAL_COMMUNITY_POSTS);
    return INITIAL_COMMUNITY_POSTS;
  }

  public static saveCommunityPosts(posts: AnonymousPost[]): void {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }

  public static addCommunityPost(post: AnonymousPost): AnonymousPost[] {
    const posts = this.getCommunityPosts();
    const updated = [post, ...posts];
    this.saveCommunityPosts(updated);
    return updated;
  }

  public static reportPost(postId: string, reason: string): AnonymousPost[] {
    const posts = this.getCommunityPosts();
    const updated = posts.map(p => {
      if (p.id === postId) {
        const newCount = p.reportCount + 1;
        return {
          ...p,
          reportCount: newCount,
          isFlagged: newCount >= 1,
          moderationStatus: newCount >= 2 ? ('under-review' as const) : p.moderationStatus
        };
      }
      return p;
    });
    this.saveCommunityPosts(updated);
    return updated;
  }

  // Shared Expenses
  public static getExpenses(): SharedExpense[] {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  }

  public static saveExpenses(expenses: SharedExpense[]): void {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }

  public static addExpense(expense: SharedExpense): SharedExpense[] {
    const list = this.getExpenses();
    const updated = [expense, ...list];
    this.saveExpenses(updated);
    return updated;
  }

  // Chores
  public static getChores(): ChoreItem[] {
    const saved = localStorage.getItem(STORAGE_KEYS.CHORES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  }

  public static saveChores(chores: ChoreItem[]): void {
    localStorage.setItem(STORAGE_KEYS.CHORES, JSON.stringify(chores));
  }

  public static addChore(chore: ChoreItem): ChoreItem[] {
    const list = this.getChores();
    const updated = [...list, chore];
    this.saveChores(updated);
    return updated;
  }

  public static toggleChore(choreId: string): ChoreItem[] {
    const chores = this.getChores();
    const updated = chores.map(c => (c.id === choreId ? { ...c, completed: !c.completed } : c));
    this.saveChores(updated);
    return updated;
  }

  // Conflicts
  public static getConflictReports(): ConflictReport[] {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFLICTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  }

  public static saveConflictReports(reports: ConflictReport[]): void {
    localStorage.setItem(STORAGE_KEYS.CONFLICTS, JSON.stringify(reports));
  }

  public static submitConflictReport(report: ConflictReport): ConflictReport[] {
    const list = this.getConflictReports();
    const updated = [report, ...list];
    this.saveConflictReports(updated);
    return updated;
  }

  // Reset all
  public static resetAll(): void {
    localStorage.clear();
  }

  public static resetToDefaults(): void {
    localStorage.clear();
    this.saveCandidates([]);
    this.saveProperties(INITIAL_PROPERTIES);
    this.saveRooms(INITIAL_ROOMS);
    this.saveCommunityPosts(INITIAL_COMMUNITY_POSTS);
    this.saveExpenses([]);
    this.saveChores([]);
  }
}
