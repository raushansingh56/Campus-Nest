import { UserProfile, Property, Room, AnonymousPost, SharedExpense, ChoreItem } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    name: 'ABC Student Residency',
    city: 'Bengaluru',
    area: 'SG Palya / Koramangala',
    address: 'Plot 42, Hosur Main Road, Near Christ University Central Campus, Bengaluru, Karnataka 560029',
    distanceToCampus: '0.4 km from Christ University Central Campus Gate',
    rating: 4.7,
    genderRestriction: 'boys-only',
    foodMessInfo: '3 meals daily (North & South Indian vegetarian buffet with egg counter). Unlimited tea/coffee.',
    houseRules: [
      'Quiet study hours observed between 10:30 PM - 6:30 AM',
      'Non-resident guests allowed only in reception lobby until 8:00 PM',
      'Strict zero-tolerance policy on smoking and illicit substances on premises',
      'Biometric entry doors active 24/7 with CCTV-monitored common areas'
    ],
    amenities: ['High-speed 300Mbps Wi-Fi', 'Power Backup (24x7 UPS)', 'Daily Room Housekeeping', 'RO Purified Alkaline Water', 'Laundromat with Dryers', 'Dedicated Quiet Study Pods', 'Terrace Recreation Area'],
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ],
    wardenContactName: 'Chief Resident Warden Desk',
    securityFeatures: ['Biometric Face Scanner', 'Night Security Guards (2 shifts)', 'First Aid & Doctor on Call', 'Fire Extinguishers & Smoke Detectors']
  },
  {
    id: 'prop-2',
    name: 'Scholar Haven Living',
    city: 'Bengaluru',
    area: 'Tavarekere / BTM Layout',
    address: 'Survey 88, 1st Main Road, Near Christ University Back Gate, Bengaluru, Karnataka 560029',
    distanceToCampus: '0.7 km from Christ University Central Campus',
    rating: 4.8,
    genderRestriction: 'boys-only',
    foodMessInfo: 'Subscribed meal plans with multi-cuisine options (Breakfast, Lunch pack for campus, Evening snack, Dinner).',
    houseRules: [
      'Silent reading rooms accessible 24 hours with soundproofing',
      'Curfew check-in by 10:30 PM (extension granted for academic project labs)',
      'Substance-free campus verified by monthly spot inspections'
    ],
    amenities: ['1 Gbps Fiber Internet', 'Ergonomic Ergofit Study Desks', 'AC in all rooms', 'Gymnasium & Table Tennis', 'Commercial Laundry Service', '24/7 Security Patrol'],
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ],
    wardenContactName: 'Resident Superintendent Desk',
    securityFeatures: ['Smart Card Keyless Locks', '24/7 Command Center', 'Hospital Tie-up with City Medical Center']
  },
  {
    id: 'prop-3',
    name: 'Greenfield University PG & Suites',
    city: 'Bengaluru',
    area: 'Dairy Circle / Hosur Road',
    address: 'Road No 2, Hosur Main Road, Opposite Christ University Auditorium, Bengaluru, Karnataka 560029',
    distanceToCampus: '0.5 km from Christ University Central Campus',
    rating: 4.6,
    genderRestriction: 'boys-only',
    foodMessInfo: 'Homestyle South & North Indian cuisine, special weekend biryani and fruit bar.',
    houseRules: [
      'Respectful study environment between roommates',
      'Quiet hours from 11:00 PM to 6:00 AM',
      'Zero alcohol and smoking policy strictly enforced'
    ],
    amenities: ['High Speed WiFi', 'Attached Modern Bathrooms with Geysers', 'Individual Wardrobes with Locks', 'Refrigerator on each floor', 'Water Dispenser', 'Study Tables'],
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    wardenContactName: 'Hostel Administration Office',
    securityFeatures: ['CCTV in Corridors', 'Night Warden', 'Emergency Panic Buttons']
  },
  {
    id: 'prop-4',
    name: 'Serene Blooms Girls Campus Living',
    city: 'Bengaluru',
    area: 'Koramangala 1st Block',
    address: '14th Cross, 100 Feet Road, Near Christ University Gate 3, Bengaluru, Karnataka 560029',
    distanceToCampus: '0.6 km from Christ University Central Campus Gate',
    rating: 4.9,
    genderRestriction: 'girls-only',
    foodMessInfo: 'Hygienic nutritionist-curated kitchen with pure veg and non-veg options prepared separately.',
    houseRules: [
      'Biometric access only for registered female residents',
      'Quiet study corridors 10:00 PM onwards',
      'Strictly non-smoking, drug-free sanctuary'
    ],
    amenities: ['Fast Wi-Fi', 'Air Conditioning', 'Full Laundry & Ironing', 'Yoga & Study Terrace', 'Power Backup', '24x7 Female Warden'],
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ],
    wardenContactName: 'Resident Support & Warden Desk',
    securityFeatures: ['24/7 Female Security Guard', 'Direct Link to Local Police Station', 'Intercom in Every Room']
  }
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-304',
    propertyId: 'prop-1',
    propertyName: 'ABC Student Residency',
    roomNumber: 'Room 304',
    floor: 3,
    roomType: '4-sharing',
    capacity: 4,
    currentOccupantsCount: 2,
    availableSpaces: 2,
    monthlyRent: 8000,
    securityDeposit: 16000,
    genderRestriction: 'boys-only',
    amenities: ['Individual Study Desks', 'Attached Balcony', 'Western Bathroom with Geyser', 'Lockable Wardrobes', 'Ceiling Fan + Window Airflow', 'High-Speed LAN port'],
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    availableFrom: 'Immediately / 1 September',
    isAvailable: true
  },
  {
    id: 'room-202',
    propertyId: 'prop-1',
    propertyName: 'ABC Student Residency',
    roomNumber: 'Room 202',
    floor: 2,
    roomType: 'double-sharing',
    capacity: 2,
    currentOccupantsCount: 1,
    availableSpaces: 1,
    monthlyRent: 11500,
    securityDeposit: 23000,
    genderRestriction: 'boys-only',
    amenities: ['Split AC', 'Dual Ergonomic Chairs', 'Large Balcony', 'Spacious Dressing Mirror', 'Attached Bath'],
    photos: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
    ],
    availableFrom: 'Available Now',
    isAvailable: true
  },
  {
    id: 'room-105',
    propertyId: 'prop-2',
    propertyName: 'Scholar Haven Living',
    roomNumber: 'Studio 105',
    floor: 1,
    roomType: 'double-sharing',
    capacity: 2,
    currentOccupantsCount: 1,
    availableSpaces: 1,
    monthlyRent: 10500,
    securityDeposit: 20000,
    genderRestriction: 'boys-only',
    amenities: ['In-room Mini Fridge', 'Split AC', 'High-speed LAN + Wi-Fi 6', 'Bedside USB Chargers', 'Daily Trash Collection'],
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ],
    availableFrom: 'Next Monday',
    isAvailable: true
  },
  {
    id: 'room-401',
    propertyId: 'prop-3',
    propertyName: 'Greenfield University PG & Suites',
    roomNumber: 'Room 401',
    floor: 4,
    roomType: '3-sharing',
    capacity: 3,
    currentOccupantsCount: 2,
    availableSpaces: 1,
    monthlyRent: 7500,
    securityDeposit: 15000,
    genderRestriction: 'boys-only',
    amenities: ['Terrace Access', 'Cooler / Fan', 'Study Table', '3 Lockers', 'Clean Bathroom'],
    photos: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    availableFrom: 'Available Now',
    isAvailable: true
  },
  {
    id: 'room-girls-201',
    propertyId: 'prop-4',
    propertyName: 'Serene Blooms Girls Campus Living',
    roomNumber: 'Suite 201',
    floor: 2,
    roomType: 'double-sharing',
    capacity: 2,
    currentOccupantsCount: 1,
    availableSpaces: 1,
    monthlyRent: 9500,
    securityDeposit: 19000,
    genderRestriction: 'girls-only',
    amenities: ['Split AC', 'Attached French Balcony', 'Study Corner', 'Personal Wardrobe Lockers', 'Hot Water 24/7'],
    photos: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ],
    availableFrom: 'Immediately',
    isAvailable: true
  }
];

export const MOCK_STUDENTS: UserProfile[] = [];

export const INITIAL_COMMUNITY_POSTS: AnonymousPost[] = [
  {
    id: 'post-1',
    city: 'Bengaluru',
    institution: 'Christ University Central Campus',
    category: 'accommodation-tip',
    title: 'Koramangala / SG Palya: Electricity meter tip for Christ University students',
    content: 'Always clarify if commercial or residential electrical tariff is billed before signing your deposit! ABC Residency includes 100 units in the base rent which saved us ₹1,200 each last month.',
    authorAlias: 'Verified Engineering Senior',
    verifiedAuthor: true,
    timestamp: '2 hours ago',
    helpfulCount: 38,
    reportCount: 0,
    isFlagged: false,
    moderationStatus: 'approved'
  },
  {
    id: 'post-2',
    city: 'Bengaluru',
    institution: 'Christ University Central Campus',
    category: 'roommate-etiquette',
    title: 'How our room resolved quiet hours during exam week',
    content: 'We set a strict 11 PM rule: desk lamps only and headphones mandatory. Having our AI allocation match us with companions of similar night-owl tendencies made this super natural and zero friction.',
    authorAlias: 'Freshman CSE Resident',
    verifiedAuthor: true,
    timestamp: 'Yesterday',
    helpfulCount: 54,
    reportCount: 0,
    isFlagged: false,
    moderationStatus: 'approved'
  },
  {
    id: 'post-3',
    city: 'Bengaluru',
    institution: 'Christ University Central Campus',
    category: 'mess-food',
    title: 'Clean water filter inspection note for Dairy Circle / Hosur Road accommodations',
    content: 'Check that your property has an active AMC for RO water servicing. Properties near Gate 2 with dual filtration are much healthier.',
    authorAlias: 'Postgraduate Scholar',
    verifiedAuthor: true,
    timestamp: '3 days ago',
    helpfulCount: 29,
    reportCount: 0,
    isFlagged: false,
    moderationStatus: 'approved'
  }
];

export const INITIAL_EXPENSES: SharedExpense[] = [];

export const INITIAL_CHORES: ChoreItem[] = [];
