export type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';

export type RoomType = 'single' | 'double-sharing' | '3-sharing' | '4-sharing';

export type AcademicStream =
  | 'Engineering & Technology'
  | 'Medicine & Healthcare'
  | 'Business & Management'
  | 'Arts & Humanities'
  | 'Pure & Applied Sciences'
  | 'Law & Legal Studies'
  | 'Design & Media';

export type EducationBoard = 'CBSE' | 'ICSE' | 'State Board' | 'IB' | 'Cambridge / IGCSE' | 'Other';

export type SleepSchedule = 'early-riser' | 'moderate' | 'night-owl';

export type StudyHabit = 'quiet-room' | 'group-study' | 'library-focused' | 'late-night-crammer';

export type CleanlinessLevel = 'strictly-tidy' | 'moderately-clean' | 'relaxed-casual';

export type FoodPreference = 'vegetarian' | 'non-vegetarian' | 'vegan' | 'jain' | 'eggetarian';

export type GuestPolicy = 'no-overnight-guests' | 'weekend-friends-ok' | 'flexible';

export type NoiseTolerance = 'quiet-hours-strict' | 'moderate-tolerance' | 'lively-tolerant';

export type SocialStyle = 'introvert-quiet' | 'ambivert' | 'extrovert-social';

export type SubstanceHabit = 'non-smoker-teetotaler' | 'social-drinker-only' | 'occasional-smoker' | 'regular-smoker' | 'regular-drinker';

export interface VerificationData {
  collegeEmailVerified: boolean;
  collegeIdVerified: boolean;
  phoneOtpVerified: boolean;
  emailOtpVerified: boolean;
  verificationDate?: string;
  collegeNameVerified?: string;
  // Private fields (NEVER exposed publicly)
  privateCollegeEmail?: string;
  privatePhone?: string;
  privateGovIdNumber?: string;
  privateParentName?: string;
  privateDocumentUrl?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  gender: Gender;
  avatarUrl: string;
  currentCity: string;
  nativeState: string;
  country: string;
  motherTongue: string;

  // Education
  college: string;
  course: string;
  branch: string;
  stream: AcademicStream;
  board: EducationBoard;
  yearOfStudy: string; // e.g. "1st Year / Freshman"
  graduationYear: number;

  // Accommodation Requirements
  preferredCity: string;
  preferredCollege: string;
  monthlyBudgetMin: number;
  monthlyBudgetMax: number;
  preferredRoomType: RoomType;
  preferredSharingCount: number;
  preferredArea: string;

  // Lifestyle
  sleepSchedule: SleepSchedule;
  studyHabits: StudyHabit;
  cleanliness: CleanlinessLevel;
  foodPreference: FoodPreference;
  guestPreference: GuestPolicy;
  noiseTolerance: NoiseTolerance;
  socialPreference: SocialStyle;
  substanceHabit: SubstanceHabit;
  lifestyleNotes?: string;

  // Verification & Safety
  verification: VerificationData;
  isRegistered: boolean;
  createdAt: string;
}

export interface Property {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  distanceToCampus: string;
  rating: number;
  genderRestriction: 'boys-only' | 'girls-only' | 'co-ed-separate-floors';
  foodMessInfo: string;
  houseRules: string[];
  amenities: string[];
  imageUrl: string;
  galleryImages: string[];
  wardenContactName: string;
  securityFeatures: string[];
}

export interface Room {
  id: string;
  propertyId: string;
  propertyName: string;
  roomNumber: string;
  floor: number;
  roomType: RoomType;
  capacity: number;
  currentOccupantsCount: number;
  availableSpaces: number;
  monthlyRent: number;
  securityDeposit: number;
  genderRestriction: 'boys-only' | 'girls-only' | 'co-ed-separate-floors';
  amenities: string[];
  photos: string[];
  availableFrom: string;
  isAvailable: boolean;
}

export interface AllocationResult {
  id: string;
  userId: string;
  companionId?: string;
  companion?: UserProfile | null;
  roomId: string;
  room: Room;
  property: Property;
  allocatedAt: string;
  status: 'active' | 'reallocated' | 'under-mediation' | 'completed';
  aiRationale: string;
  keyCompatibilityFactors: string[];
  roommates: UserProfile[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isSystemNotice?: boolean;
}

export interface AnonymousPost {
  id: string;
  city: string;
  institution: string;
  category: 'accommodation-tip' | 'roommate-etiquette' | 'area-safety' | 'mess-food' | 'study-culture';
  title: string;
  content: string;
  authorAlias: string; // e.g. "Verified Engineering Student", "Freshman from Hyderabad"
  verifiedAuthor: boolean;
  timestamp: string;
  helpfulCount: number;
  reportCount: number;
  isFlagged: boolean;
  moderationStatus: 'approved' | 'under-review' | 'removed';
}

export interface SharedExpense {
  id: string;
  title: string;
  amount: number;
  paidByUserId: string;
  paidByName: string;
  splitAmong: string[]; // user IDs
  date: string;
  category: 'groceries' | 'wifi' | 'cleaning' | 'electricity' | 'other';
  status: 'settled' | 'pending';
}

export interface ChoreItem {
  id: string;
  task: string;
  assignedToName: string;
  assignedToUserId: string;
  frequency: 'Daily' | 'Weekly' | 'Bi-weekly';
  dayOfWeek?: string;
  completed: boolean;
}

export interface ConflictReport {
  id: string;
  submittedByUserId: string;
  submittedByName: string;
  companionId: string;
  companionName: string;
  issueCategory: 'cleanliness' | 'noise-study' | 'guests-sleep' | 'substance-safety' | 'other';
  description: string;
  actionRequested: 'request-reallocation' | 'request-mediation' | 'safety-escalation';
  status: 'pending' | 'resolved' | 'reallocated';
  createdAt: string;
  adminNotes?: string;
}
