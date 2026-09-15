import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  Gender,
  RoomType,
  AcademicStream,
  EducationBoard,
  SleepSchedule,
  StudyHabit,
  CleanlinessLevel,
  FoodPreference,
  GuestPolicy,
  NoiseTolerance,
  SocialStyle,
  SubstanceHabit
} from '../types';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Upload,
  Sparkles,
  School,
  Home,
  Heart,
  FileCheck,
  AlertTriangle,
  Info,
  Phone,
  Mail,
  FileText
} from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onComplete?: (user: UserProfile) => void;
  onSaveUser?: (user: UserProfile) => void;
  initialData?: Partial<UserProfile> | null;
  initialUser?: Partial<UserProfile> | null;
  isStandalone?: boolean;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  onSaveUser,
  initialData,
  initialUser,
  isStandalone = false
}) => {
  const effectiveInitial = initialUser || initialData;
  const [step, setStep] = useState(1);

  // Form State - all strictly starting empty unless existing user data is provided
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [nativeState, setNativeState] = useState('');
  const [country, setCountry] = useState('');
  const [motherTongue, setMotherTongue] = useState('');

  // Education
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const [stream, setStream] = useState<AcademicStream | ''>('');
  const [board, setBoard] = useState<EducationBoard | ''>('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [graduationYear, setGraduationYear] = useState<number | ''>('');

  // Accommodation
  const [preferredCity, setPreferredCity] = useState('');
  const [preferredCollege, setPreferredCollege] = useState('');
  const [monthlyBudgetMin, setMonthlyBudgetMin] = useState<number | ''>('');
  const [monthlyBudgetMax, setMonthlyBudgetMax] = useState<number | ''>('');
  const [preferredRoomType, setPreferredRoomType] = useState<RoomType | ''>('');
  const [preferredSharingCount, setPreferredSharingCount] = useState<number | ''>('');
  const [preferredArea, setPreferredArea] = useState('');

  // Lifestyle
  const [sleepSchedule, setSleepSchedule] = useState<SleepSchedule | ''>('');
  const [studyHabits, setStudyHabits] = useState<StudyHabit | ''>('');
  const [cleanliness, setCleanliness] = useState<CleanlinessLevel | ''>('');
  const [foodPreference, setFoodPreference] = useState<FoodPreference | ''>('');
  const [guestPreference, setGuestPreference] = useState<GuestPolicy | ''>('');
  const [noiseTolerance, setNoiseTolerance] = useState<NoiseTolerance | ''>('');
  const [socialPreference, setSocialPreference] = useState<SocialStyle | ''>('');
  const [substanceHabit, setSubstanceHabit] = useState<SubstanceHabit | ''>('');
  const [lifestyleNotes, setLifestyleNotes] = useState('');

  // Verification
  const [collegeEmail, setCollegeEmail] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpInput, setEmailOtpInput] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const [phone, setPhone] = useState('');
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtpInput, setPhoneOtpInput] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);

  const [idCardFileName, setIdCardFileName] = useState('');
  const [idVerified, setIdVerified] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Sync state when modal opens or initial data is provided
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormError(null);
      const data = initialUser || initialData;
      if (data && data.fullName) {
        setFullName(data.fullName || '');
        setAge(data.age ?? '');
        setGender(data.gender || '');
        setAvatarUrl(data.avatarUrl || '');
        setCurrentCity(data.currentCity || '');
        setNativeState(data.nativeState || '');
        setCountry(data.country || '');
        setMotherTongue(data.motherTongue || '');
        setCollege(data.college || '');
        setCourse(data.course || '');
        setBranch(data.branch || '');
        setStream(data.stream || '');
        setBoard(data.board || '');
        setYearOfStudy(data.yearOfStudy || '');
        setGraduationYear(data.graduationYear ?? '');
        setPreferredCity(data.preferredCity || '');
        setPreferredCollege(data.preferredCollege || '');
        setMonthlyBudgetMin(data.monthlyBudgetMin ?? '');
        setMonthlyBudgetMax(data.monthlyBudgetMax ?? '');
        setPreferredRoomType(data.preferredRoomType || '');
        setPreferredSharingCount(data.preferredSharingCount ?? '');
        setPreferredArea(data.preferredArea || '');
        setSleepSchedule(data.sleepSchedule || '');
        setStudyHabits(data.studyHabits || '');
        setCleanliness(data.cleanliness || '');
        setFoodPreference(data.foodPreference || '');
        setGuestPreference(data.guestPreference || '');
        setNoiseTolerance(data.noiseTolerance || '');
        setSocialPreference(data.socialPreference || '');
        setSubstanceHabit(data.substanceHabit || '');
        setLifestyleNotes(data.lifestyleNotes || '');
        setCollegeEmail(data.verification?.privateCollegeEmail || '');
        setEmailVerified(data.verification?.collegeEmailVerified || false);
        setPhone(data.verification?.privatePhone || '');
        setPhoneVerified(data.verification?.phoneOtpVerified || false);
        setIdVerified(data.verification?.collegeIdVerified || false);
      } else {
        // Reset to completely blank
        setFullName('');
        setAge('');
        setGender('');
        setAvatarUrl('');
        setCurrentCity('');
        setNativeState('');
        setCountry('');
        setMotherTongue('');
        setCollege('');
        setCourse('');
        setBranch('');
        setStream('');
        setBoard('');
        setYearOfStudy('');
        setGraduationYear('');
        setPreferredCity('');
        setPreferredCollege('');
        setMonthlyBudgetMin('');
        setMonthlyBudgetMax('');
        setPreferredRoomType('');
        setPreferredSharingCount('');
        setPreferredArea('');
        setSleepSchedule('');
        setStudyHabits('');
        setCleanliness('');
        setFoodPreference('');
        setGuestPreference('');
        setNoiseTolerance('');
        setSocialPreference('');
        setSubstanceHabit('');
        setLifestyleNotes('');
        setCollegeEmail('');
        setEmailOtpSent(false);
        setEmailOtpInput('');
        setEmailVerified(false);
        setPhone('');
        setPhoneOtpSent(false);
        setPhoneOtpInput('');
        setPhoneVerified(false);
        setIdCardFileName('');
        setIdVerified(false);
      }
    }
  }, [isOpen, initialUser, initialData]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdCardFileName(file.name);
      setIdVerified(true);
    }
  };

  const handleSimulateEmailOtp = () => {
    if (!collegeEmail.trim()) {
      setFormError('Please enter your institutional email first.');
      return;
    }
    setFormError(null);
    setEmailOtpSent(true);
  };

  const handleVerifyEmailOtp = () => {
    if (emailOtpInput.trim().length >= 4) {
      setEmailVerified(true);
      setFormError(null);
    } else {
      setFormError('Please enter the 4 or 6-digit verification code.');
    }
  };

  const handleSimulatePhoneOtp = () => {
    if (!phone.trim()) {
      setFormError('Please enter your mobile phone number first.');
      return;
    }
    setFormError(null);
    setPhoneOtpSent(true);
  };

  const handleVerifyPhoneOtp = () => {
    if (phoneOtpInput.trim().length >= 4) {
      setPhoneVerified(true);
      setFormError(null);
    } else {
      setFormError('Please enter the 4-digit SMS OTP.');
    }
  };

  const validateStep = (s: number): boolean => {
    setFormError(null);
    if (s === 1) {
      if (!fullName.trim()) {
        setFormError('Please enter your full name.');
        return false;
      }
      if (!age || Number(age) < 16 || Number(age) > 60) {
        setFormError('Please enter a valid age (16–60).');
        return false;
      }
      if (!gender) {
        setFormError('Please select your gender.');
        return false;
      }
      if (!currentCity.trim()) {
        setFormError('Please enter your current city.');
        return false;
      }
      if (!nativeState.trim()) {
        setFormError('Please enter your native / home state.');
        return false;
      }
      if (!motherTongue.trim()) {
        setFormError('Please enter your mother tongue.');
        return false;
      }
    } else if (s === 2) {
      if (!college.trim()) {
        setFormError('Please enter your college or university.');
        return false;
      }
      if (!course.trim()) {
        setFormError('Please enter your course / degree.');
        return false;
      }
      if (!branch.trim()) {
        setFormError('Please enter your branch / department.');
        return false;
      }
      if (!stream) {
        setFormError('Please select your academic stream.');
        return false;
      }
      if (!board) {
        setFormError('Please select your high school education board.');
        return false;
      }
      if (!yearOfStudy) {
        setFormError('Please select your year of study.');
        return false;
      }
      if (!graduationYear || Number(graduationYear) < 2024 || Number(graduationYear) > 2035) {
        setFormError('Please enter a valid expected graduation year.');
        return false;
      }
    } else if (s === 3) {
      if (!preferredCity.trim()) {
        setFormError('Please enter your target destination city.');
        return false;
      }
      if (!monthlyBudgetMin || !monthlyBudgetMax) {
        setFormError('Please enter both minimum and maximum monthly budget.');
        return false;
      }
      if (Number(monthlyBudgetMin) > Number(monthlyBudgetMax)) {
        setFormError('Minimum monthly budget cannot be greater than maximum budget.');
        return false;
      }
      if (!preferredRoomType) {
        setFormError('Please select your preferred room sharing type.');
        return false;
      }
    } else if (s === 4) {
      if (!sleepSchedule) {
        setFormError('Please select your typical sleep schedule.');
        return false;
      }
      if (!studyHabits) {
        setFormError('Please select your study habits.');
        return false;
      }
      if (!cleanliness) {
        setFormError('Please select your cleanliness expectations.');
        return false;
      }
      if (!foodPreference) {
        setFormError('Please select your food preference.');
        return false;
      }
      if (!substanceHabit) {
        setFormError('Please select your substance habit preference.');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleGoToStep = (targetStep: number) => {
    if (targetStep <= step) {
      setStep(targetStep);
      return;
    }
    for (let s = 1; s < targetStep; s++) {
      if (!validateStep(s)) {
        setStep(s);
        return;
      }
    }
    setStep(targetStep);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all steps 1 through 4
    for (let s = 1; s <= 4; s++) {
      if (!validateStep(s)) {
        setStep(s);
        return;
      }
    }

    // Step 5 verification requirement
    if (!emailVerified && !idVerified && !phoneVerified && !collegeEmail.trim() && !phone.trim()) {
      setFormError('Please complete at least one verification method (Institutional Email, Student ID card, or Mobile Phone).');
      setStep(5);
      return;
    }

    setFormError(null);

    const effectiveAvatar =
      avatarUrl.trim() ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName.trim())}&backgroundColor=059669,0d9488,4f46e5`;

    const newUser: UserProfile = {
      id: effectiveInitial?.id || `student-${Date.now()}`,
      fullName: fullName.trim(),
      age: Number(age) || 19,
      gender: (gender || 'male') as Gender,
      avatarUrl: effectiveAvatar,
      currentCity: currentCity.trim() || 'Not specified',
      nativeState: nativeState.trim() || 'Not specified',
      country: country.trim() || 'India',
      motherTongue: motherTongue.trim(),
      college: college.trim(),
      course: course.trim() || 'Degree Program',
      branch: branch.trim() || 'General',
      stream: (stream || 'Engineering & Technology') as AcademicStream,
      board: (board || 'CBSE') as EducationBoard,
      yearOfStudy: yearOfStudy || '1st Year / Freshman',
      graduationYear: Number(graduationYear) || new Date().getFullYear() + 4,
      preferredCity: preferredCity.trim(),
      preferredCollege: preferredCollege.trim() || college.trim(),
      monthlyBudgetMin: Number(monthlyBudgetMin) || 6000,
      monthlyBudgetMax: Number(monthlyBudgetMax) || 12000,
      preferredRoomType: (preferredRoomType || 'double-sharing') as RoomType,
      preferredSharingCount: Number(preferredSharingCount) || 2,
      preferredArea: preferredArea.trim() || 'Near College Campus',
      sleepSchedule: (sleepSchedule || 'moderate') as SleepSchedule,
      studyHabits: (studyHabits || 'quiet-room') as StudyHabit,
      cleanliness: (cleanliness || 'strictly-tidy') as CleanlinessLevel,
      foodPreference: (foodPreference || 'vegetarian') as FoodPreference,
      guestPreference: (guestPreference || 'no-overnight-guests') as GuestPolicy,
      noiseTolerance: (noiseTolerance || 'quiet-hours-strict') as NoiseTolerance,
      socialPreference: (socialPreference || 'ambivert') as SocialStyle,
      substanceHabit: (substanceHabit || 'non-smoker-teetotaler') as SubstanceHabit,
      lifestyleNotes: lifestyleNotes.trim(),
      verification: {
        collegeEmailVerified: emailVerified || Boolean(collegeEmail.trim()),
        collegeIdVerified: idVerified,
        phoneOtpVerified: phoneVerified || Boolean(phone.trim()),
        emailOtpVerified: emailVerified || Boolean(collegeEmail.trim()),
        verificationDate: new Date().toISOString().split('T')[0],
        collegeNameVerified: college.trim(),
        privateCollegeEmail: collegeEmail.trim(),
        privatePhone: phone.trim()
      },
      isRegistered: true,
      createdAt: new Date().toISOString()
    };

    const handleSave = onSaveUser || onComplete;
    if (handleSave) {
      handleSave(newUser);
    }
    if (onClose) {
      onClose();
    }
  };

  const cardContent = (
    <div
      id={isStandalone ? "standalone-registration-card" : "modal-registration-content"}
      className={`bg-white rounded-2xl w-full flex flex-col shadow-xl overflow-hidden border border-slate-200/90 ${
        isStandalone ? 'max-w-3xl mx-auto my-4' : 'max-w-2xl max-h-[90vh]'
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {isStandalone ? 'Mandatory Student Intake' : 'Student Onboarding & Requirements'}
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {isStandalone ? 'Student Registration & Profile Setup' : 'Student Intake & Preference Profile'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Step {step} of 5 • {isStandalone ? 'Complete all required sections to enter the campus dashboard and run AI allocation.' : 'Enter your personal requirements for automated room and Companion allocation.'}
          </p>
        </div>
        {!isStandalone && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Stepper indicator */}
      <div className="flex border-b border-slate-100 bg-white">
        {[
          { num: 1, label: 'Identity' },
          { num: 2, label: 'Education' },
          { num: 3, label: 'Room Needs' },
          { num: 4, label: 'Lifestyle' },
          { num: 5, label: 'Verification' }
        ].map(s => (
          <div
            key={s.num}
            onClick={() => handleGoToStep(s.num)}
            className={`flex-1 py-3 px-2 text-center text-xs font-medium cursor-pointer border-b-2 transition-all ${
              step === s.num
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/30 font-bold'
                : step > s.num
                ? 'border-emerald-400 text-slate-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="flex items-center justify-center gap-1">
              <span
                className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  step === s.num
                    ? 'bg-emerald-600 text-white'
                    : step > s.num
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
        {formError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">{formError}</div>
            <button
              type="button"
              onClick={() => setFormError(null)}
              className="text-rose-500 hover:text-rose-700 font-bold"
            >
              ✕
            </button>
          </div>
        )}

          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Basic Student Identity & Homeland
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age & Gender *</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      min={16}
                      max={35}
                      value={age}
                      onChange={e => setAge(e.target.value ? Number(e.target.value) : '')}
                      placeholder="Age"
                      className="w-24 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <select
                      required
                      value={gender}
                      onChange={e => setGender(e.target.value as Gender)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mother Tongue (Primary AI factor) *</label>
                  <input
                    type="text"
                    required
                    value={motherTongue}
                    onChange={e => setMotherTongue(e.target.value)}
                    placeholder="Enter your mother tongue (e.g. Telugu, Hindi, Tamil, Kannada)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500 mt-0.5">Primary language helps allocate culturally harmonic Companions.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Native / Home State *</label>
                  <input
                    type="text"
                    required
                    value={nativeState}
                    onChange={e => setNativeState(e.target.value)}
                    placeholder="Enter your native or home state"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current City of Residence</label>
                  <input
                    type="text"
                    value={currentCity}
                    onChange={e => setCurrentCity(e.target.value)}
                    placeholder="Enter your current city"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    placeholder="Enter your country"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Education */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <School className="w-4 h-4 text-indigo-600" />
                Academic Background & Enrollment
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">College / University *</label>
                  <input
                    type="text"
                    required
                    list="university-list"
                    value={college}
                    onChange={e => {
                      setCollege(e.target.value);
                      if (!preferredCollege) setPreferredCollege(e.target.value);
                    }}
                    placeholder="e.g. Christ University, Bengaluru"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <datalist id="university-list">
                    <option value="Christ University, Bengaluru" />
                    <option value="Christ University - Central Campus, Hosur Road" />
                    <option value="Christ University - Bannerghatta Road Campus" />
                    <option value="Christ University - Kengeri Campus" />
                  </datalist>
                  <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                    Same-University Policy: All student allocations and verified Companions are strictly paired from this university.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Course / Degree *</label>
                  <input
                    type="text"
                    required
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                    placeholder="Enter your course (e.g. B.Tech, MBBS, BBA, B.Sc)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Branch / Department *</label>
                  <input
                    type="text"
                    required
                    value={branch}
                    onChange={e => setBranch(e.target.value)}
                    placeholder="Enter your branch or specialization"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Stream *</label>
                  <select
                    required
                    value={stream}
                    onChange={e => setStream(e.target.value as AcademicStream)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Select Academic Stream</option>
                    <option value="Engineering & Technology">Engineering & Technology</option>
                    <option value="Medicine & Healthcare">Medicine & Healthcare</option>
                    <option value="Business & Management">Business & Management</option>
                    <option value="Arts & Humanities">Arts & Humanities</option>
                    <option value="Pure & Applied Sciences">Pure & Applied Sciences</option>
                    <option value="Law & Legal Studies">Law & Legal Studies</option>
                    <option value="Design & Media">Design & Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">High School Board</label>
                  <select
                    value={board}
                    onChange={e => setBoard(e.target.value as EducationBoard)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Select High School Board</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="IB">IB (International Baccalaureate)</option>
                    <option value="Cambridge / IGCSE">Cambridge / IGCSE</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year of Study *</label>
                  <select
                    required
                    value={yearOfStudy}
                    onChange={e => setYearOfStudy(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Select Year of Study</option>
                    <option value="1st Year / Freshman">1st Year / Freshman</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                    <option value="Internship Student">Internship Student</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Expected Graduation Year</label>
                  <input
                    type="number"
                    value={graduationYear}
                    onChange={e => setGraduationYear(e.target.value ? Number(e.target.value) : '')}
                    placeholder="Enter expected graduation year"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Accommodation Requirements */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Home className="w-4 h-4 text-emerald-600" />
                Accommodation Preferences & Budget
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Destination City *</label>
                  <input
                    type="text"
                    required
                    value={preferredCity}
                    onChange={e => setPreferredCity(e.target.value)}
                    placeholder="Enter destination city (e.g. Bengaluru, Hyderabad, Pune)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Locality / Area</label>
                  <input
                    type="text"
                    value={preferredArea}
                    onChange={e => setPreferredArea(e.target.value)}
                    placeholder="Enter preferred area or campus locality"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target College / Campus</label>
                  <input
                    type="text"
                    value={preferredCollege}
                    onChange={e => setPreferredCollege(e.target.value)}
                    placeholder="Enter destination campus or institute"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Room Type *</label>
                  <select
                    required
                    value={preferredRoomType}
                    onChange={e => {
                      const type = e.target.value as RoomType;
                      setPreferredRoomType(type);
                      if (type === 'single') setPreferredSharingCount(1);
                      if (type === 'double-sharing') setPreferredSharingCount(2);
                      if (type === '3-sharing') setPreferredSharingCount(3);
                      if (type === '4-sharing') setPreferredSharingCount(4);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Select Room Type</option>
                    <option value="single">Single Room (Private)</option>
                    <option value="double-sharing">Double Sharing (2 Beds)</option>
                    <option value="3-sharing">3-Sharing (3 Beds)</option>
                    <option value="4-sharing">4-Sharing (4 Beds, Economical)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Min Monthly Budget (₹)</label>
                  <input
                    type="number"
                    value={monthlyBudgetMin}
                    onChange={e => setMonthlyBudgetMin(e.target.value ? Number(e.target.value) : '')}
                    placeholder="Enter min monthly budget in ₹"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Max Monthly Budget (₹)</label>
                  <input
                    type="number"
                    value={monthlyBudgetMax}
                    onChange={e => setMonthlyBudgetMax(e.target.value ? Number(e.target.value) : '')}
                    placeholder="Enter max monthly budget in ₹"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Lifestyle & Substance Habits */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600" />
                Lifestyle & Safety Compatibility
              </h3>

              {/* Prominent Substance Notice */}
              <div className="p-3.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block mb-0.5">Mandatory Substance Disclosure & Safety Policy:</strong>
                  Accurate disclosure ensures non-smokers and teetotalers are paired strictly together in healthy student environments.
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Smoking, Tobacco & Alcohol Habits *
                </label>
                <select
                  required
                  value={substanceHabit}
                  onChange={e => setSubstanceHabit(e.target.value as SubstanceHabit)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">Select Substance Disclosure</option>
                  <option value="non-smoker-teetotaler">🛡️ Non-Smoker & Teetotaler (Strictly Substance-Free)</option>
                  <option value="social-drinker-only">Non-Smoker (Occasional social drinker off-campus)</option>
                  <option value="occasional-smoker">Occasional Smoker (Notice for room compatibility)</option>
                  <option value="regular-smoker">Regular Smoker</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Sleep Schedule</label>
                  <select
                    value={sleepSchedule}
                    onChange={e => setSleepSchedule(e.target.value as SleepSchedule)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Select Sleep Schedule</option>
                    <option value="early-riser">Early Riser (Sleep before 11 PM, wake early)</option>
                    <option value="moderate">Moderate (Sleep around midnight)</option>
                    <option value="night-owl">Night Owl (Active late night)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Study Habits</label>
                  <select
                    value={studyHabits}
                    onChange={e => setStudyHabits(e.target.value as StudyHabit)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Select Study Habits</option>
                    <option value="quiet-room">Quiet Room Study (Zero distractions)</option>
                    <option value="group-study">Group Study / Collaborative</option>
                    <option value="library-focused">Library / Campus Study</option>
                    <option value="late-night-crammer">Late Night Crammer with Headphones</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Cleanliness Standard</label>
                  <select
                    value={cleanliness}
                    onChange={e => setCleanliness(e.target.value as CleanlinessLevel)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Select Cleanliness Standard</option>
                    <option value="strictly-tidy">Strictly Tidy & Organized</option>
                    <option value="moderately-clean">Moderately Clean (Regular cleaning)</option>
                    <option value="relaxed-casual">Relaxed & Casual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Diet / Food Preference</label>
                  <select
                    value={foodPreference}
                    onChange={e => setFoodPreference(e.target.value as FoodPreference)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Select Food Preference</option>
                    <option value="vegetarian">Pure Vegetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                    <option value="eggetarian">Eggetarian</option>
                    <option value="jain">Jain Vegetarian</option>
                    <option value="vegan">Vegan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Noise Tolerance</label>
                  <select
                    value={noiseTolerance}
                    onChange={e => setNoiseTolerance(e.target.value as NoiseTolerance)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Select Noise Tolerance</option>
                    <option value="quiet-hours-strict">Strict Quiet Hours Needed</option>
                    <option value="moderate-tolerance">Moderate Tolerance</option>
                    <option value="lively-tolerant">Lively & Socially Tolerant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Guest Preference</label>
                  <select
                    value={guestPreference}
                    onChange={e => setGuestPreference(e.target.value as GuestPolicy)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">Select Guest Policy</option>
                    <option value="no-overnight-guests">No Overnight Guests in Room</option>
                    <option value="weekend-friends-ok">Weekend Friends Allowed with Notice</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Lifestyle Notes</label>
                <textarea
                  rows={2}
                  value={lifestyleNotes}
                  onChange={e => setLifestyleNotes(e.target.value)}
                  placeholder="Enter any additional study, sleep, or room preferences (optional)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Mandatory Verification */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Mandatory Student Verification & Privacy Lock
              </h3>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Privacy Rule:</strong> Verification credentials (email, phone, student ID) are kept strictly confidential by CampusNest and will <strong>never</strong> be displayed on your public profile.
                </div>
              </div>

              {/* College Email OTP Verification */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    1. College Email Verification
                  </div>
                  {emailVerified ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      <Check className="w-3.5 h-3.5" /> Verified
                    </span>
                  ) : (
                    <span className="text-xs text-amber-600 font-medium">Pending</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="email"
                    value={collegeEmail}
                    onChange={e => {
                      setCollegeEmail(e.target.value);
                      setEmailVerified(false);
                      setEmailOtpSent(false);
                    }}
                    placeholder="Enter your institutional email address (.edu / .ac.in)"
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  />
                  {!emailVerified && (
                    <button
                      type="button"
                      onClick={handleSimulateEmailOtp}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium cursor-pointer transition-colors"
                    >
                      {emailOtpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  )}
                </div>

                {emailOtpSent && !emailVerified && (
                  <div className="flex items-center gap-2 pt-1 animate-in fade-in">
                    <input
                      type="text"
                      value={emailOtpInput}
                      onChange={e => setEmailOtpInput(e.target.value)}
                      placeholder="Enter 6-digit verification OTP"
                      className="w-48 px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyEmailOtp}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      Confirm OTP
                    </button>
                  </div>
                )}
              </div>

              {/* College ID Card Upload */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    2. College ID / Admission Letter Scan
                  </div>
                  {idVerified ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      <Check className="w-3.5 h-3.5" /> ID Attached
                    </span>
                  ) : (
                    <span className="text-xs text-amber-600 font-medium">Upload Document</span>
                  )}
                </div>

                <label className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center bg-white block cursor-pointer hover:border-emerald-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  {idCardFileName ? (
                    <div>
                      <p className="text-xs font-bold text-emerald-700">Document Uploaded: {idCardFileName}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Click to replace file</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-medium text-slate-700">Click to upload Student ID or Admission Letter</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Supports PDF, PNG, JPG (Kept private and sealed)</p>
                    </div>
                  )}
                </label>
              </div>

              {/* Phone OTP */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    3. Mobile Phone Verification
                  </div>
                  {phoneVerified ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      <Check className="w-3.5 h-3.5" /> Verified
                    </span>
                  ) : (
                    <span className="text-xs text-amber-600 font-medium">Pending</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => {
                      setPhone(e.target.value);
                      setPhoneVerified(false);
                      setPhoneOtpSent(false);
                    }}
                    placeholder="Enter your 10-digit mobile phone number"
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  />
                  {!phoneVerified && (
                    <button
                      type="button"
                      onClick={handleSimulatePhoneOtp}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium cursor-pointer transition-colors"
                    >
                      {phoneOtpSent ? 'Resend SMS' : 'Send SMS OTP'}
                    </button>
                  )}
                </div>

                {phoneOtpSent && !phoneVerified && (
                  <div className="flex items-center gap-2 pt-1 animate-in fade-in">
                    <input
                      type="text"
                      value={phoneOtpInput}
                      onChange={e => setPhoneOtpInput(e.target.value)}
                      placeholder="Enter 4-digit SMS OTP"
                      className="w-48 px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyPhoneOtp}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      Confirm SMS OTP
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                id="btn-submit-registration-and-allocate"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Submit Requirements & Run AI Allocation
              </button>
            )}
          </div>
        </form>
      </div>
    );

  if (!isOpen) return null;

  if (isStandalone) {
    return (
      <div id="standalone-registration-container" className="w-full max-w-4xl mx-auto px-4 py-4">
        {cardContent}
      </div>
    );
  }

  return (
    <div
      id="modal-registration-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      {cardContent}
    </div>
  );
};
