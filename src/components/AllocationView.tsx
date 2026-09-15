import React, { useState } from 'react';
import { AllocationResult, UserProfile } from '../types';
import { SubstanceIndicator } from './SubstanceIndicator';
import { VerificationBadge } from './VerificationBadge';
import {
  Home,
  User,
  Sparkles,
  MapPin,
  Calendar,
  IndianRupee,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  FileText,
  AlertOctagon,
  Moon,
  BookOpen,
  Utensils,
  Volume2,
  Info,
  Clock,
  Building,
  Lock,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

interface AllocationViewProps {
  allocation: AllocationResult | null;
  currentUser: UserProfile | null;
  onOpenChat: () => void;
  onOpenAgreementGuide: () => void;
  onRequestConflictSupport: () => void;
  onReallocate: () => void;
  onViewProfile: (profile: UserProfile) => void;
  onOpenRegisterModal?: () => void;
}

export const AllocationView: React.FC<AllocationViewProps> = ({
  allocation,
  currentUser,
  onOpenChat,
  onOpenAgreementGuide,
  onRequestConflictSupport,
  onReallocate,
  onViewProfile,
  onOpenRegisterModal
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!currentUser) {
    return (
      <div id="allocation-empty-state-no-user" className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <Building className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">No Allocation Assigned Yet</h2>
        <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm">
          Please complete your student profile and accommodation preferences first. Our AI allocation system will then determine the most suitable room and verified Companion for you.
        </p>
        {onOpenRegisterModal && (
          <button
            id="btn-register-to-allocate"
            onClick={onOpenRegisterModal}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Complete Student Registration
          </button>
        )}
      </div>
    );
  }

  if (!allocation) {
    return (
      <div id="allocation-empty-state" className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">No Allocation Record Yet</h2>
        <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm">
          Submit or verify your academic and accommodation requirements so our AI compatibility pipeline can allocate your room and Companion.
        </p>
        <button
          id="btn-run-ai-allocation"
          onClick={onReallocate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-sm transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Run AI Room & Companion Allocation
        </button>
      </div>
    );
  }

  const { room, property, companion, aiRationale, keyCompatibilityFactors } = allocation;

  const displayPhotos = room.photos && room.photos.length > 0 ? room.photos : [property.imageUrl];

  return (
    <div id="allocation-screen" className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Banner: Official Student Accommodation Allocation */}
      <div
        id="allocation-header-banner"
        className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Official Accommodation Allocation
            </div>
            <div className="text-xs text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Allocated on {new Date(allocation.allocatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            🎓 Your Accommodation & Companion
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            The AI system has automatically synthesized your academic background, mother tongue, budget, and lifestyle habits into your verified accommodation arrangement.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              id="btn-allocation-chat-companion"
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Message Your Companion
            </button>
            <button
              id="btn-allocation-roommate-agreement"
              onClick={onOpenAgreementGuide}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Roommate Agreement Guide
            </button>
            <button
              id="btn-allocation-conflict-options"
              onClick={onRequestConflictSupport}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 text-xs font-medium transition-colors cursor-pointer ml-auto"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              Need Help or Re-allocation?
            </button>
          </div>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Primary Grid: Room on Left, Companion on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ROOM CARD (7 Columns) */}
        <div
          id="card-allocated-room"
          className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between"
        >
          <div>
            {/* Room Image Gallery */}
            <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden">
              <img
                src={displayPhotos[selectedPhotoIndex] || property.imageUrl}
                alt={room.roomNumber}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/10">
                  {room.roomType.replace('-', ' ').toUpperCase()}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold">
                  {room.genderRestriction === 'boys-only' ? 'Boys Residence' : room.genderRestriction === 'girls-only' ? 'Girls Residence' : 'Co-ed Wing'}
                </span>
              </div>

              {/* Room & Property Headline */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs text-slate-300 font-medium flex items-center gap-1.5 mb-1">
                  <Building className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{property.name}</span>
                  <span className="text-slate-400">•</span>
                  <span>Floor {room.floor}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{room.roomNumber}</h3>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-emerald-400">₹{room.monthlyRent.toLocaleString()}</span>
                    <span className="text-xs text-slate-300"> / month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail switcher if multiple photos */}
            {displayPhotos.length > 1 && (
              <div className="flex items-center gap-2 px-6 pt-3 pb-1 border-b border-slate-100 bg-slate-50/50">
                {displayPhotos.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`w-14 h-10 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedPhotoIndex === idx ? 'border-emerald-600 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Accommodation Details */}
            <div className="p-6 space-y-5">
              {/* Location & Move-in */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-sm">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">{property.area}, {property.city}</div>
                    <div className="text-xs text-slate-500 line-clamp-1">{property.address}</div>
                    <div className="text-xs text-emerald-700 font-medium mt-0.5">{property.distanceToCampus}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Move-in Schedule</div>
                    <div className="text-xs text-slate-600">Available from: <span className="font-medium text-slate-800">{room.availableFrom}</span></div>
                    <div className="text-xs text-slate-500">Deposit: ₹{room.securityDeposit.toLocaleString()} (Refundable)</div>
                  </div>
                </div>
              </div>

              {/* Room Capacity & Occupants */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Room Capacity & Spaces</div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-600" />
                    <span>Total Capacity: <strong>{room.capacity} beds</strong></span>
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                    1 Space Assigned to You • 1 Assigned to Companion
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Room & Property Amenities</div>
                <div className="flex flex-wrap gap-1.5">
                  {room.amenities.concat(property.amenities.slice(0, 4)).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
                    >
                      ✓ {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* House Rules & Mess info */}
              <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200/80 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Utensils className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Food & Mess Information:</span>
                </div>
                <p className="text-slate-600 pl-5">{property.foodMessInfo}</p>

                <div className="flex items-center gap-1.5 font-bold text-slate-800 pt-1">
                  <Lock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Security & House Rules:</span>
                </div>
                <ul className="text-slate-600 pl-5 list-disc space-y-0.5">
                  {property.houseRules.slice(0, 3).map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Property Warden: <strong className="text-slate-700">{property.wardenContactName}</strong></span>
            <span className="font-semibold text-emerald-700">★ {property.rating} Rated Student Living</span>
          </div>
        </div>

        {/* COMPANION CARD (5 Columns) */}
        {companion ? (
          <div
            id="card-allocated-companion"
            className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* Companion Header */}
              <div className="p-6 pb-4 border-b border-slate-100 bg-gradient-to-b from-indigo-50/40 to-white">
                <div className="flex items-start gap-4">
                  <img
                    src={companion.avatarUrl}
                    alt={companion.fullName}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-sm ring-2 ring-slate-100"
                  />
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        Your Companion
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight truncate">
                      {companion.fullName}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span>{companion.age} yrs</span>
                      <span>•</span>
                      <span className="capitalize">{companion.gender}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">{companion.yearOfStudy}</span>
                    </div>
                    <div className="pt-1">
                      <VerificationBadge verification={companion.verification} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Companion Detailed Information */}
              <div className="p-6 space-y-4 text-sm">
                {/* Mandatory Addiction / Substance Indicator */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Substance & Safety Alignment
                  </div>
                  <div>
                    <SubstanceIndicator habit={companion.substanceHabit} size="md" showDetails={true} />
                  </div>
                </div>

                {/* Academic Details */}
                <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-xs">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Academic Background</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1 text-slate-600">
                    <div className="col-span-2 sm:col-span-1">
                      College: <strong className="text-slate-800">{companion.college}</strong>
                      <span className="inline-block ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Same University
                      </span>
                    </div>
                    <div>Course: <strong className="text-slate-800">{companion.course}</strong></div>
                    <div>Branch: <strong className="text-slate-800">{companion.branch}</strong></div>
                    <div>Stream: <strong className="text-slate-800">{companion.stream}</strong></div>
                    <div>School Board: <strong className="text-slate-800">{companion.board}</strong></div>
                    <div>Graduation: <strong className="text-slate-800">{companion.graduationYear}</strong></div>
                  </div>
                </div>

                {/* Native Homeland & Language */}
                <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-xs">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Homeland & Language</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-slate-600">
                    <div>Mother Tongue: <strong className="text-slate-900 font-semibold">{companion.motherTongue}</strong></div>
                    <div>Home State: <strong className="text-slate-900 font-semibold">{companion.nativeState}</strong></div>
                  </div>
                </div>

                {/* Lifestyle Harmony */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Companion Lifestyle Preferences
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded bg-slate-100/80 border border-slate-200 flex items-center gap-2">
                      <Moon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Sleep Routine</div>
                        <div className="font-semibold text-slate-800 capitalize">{companion.sleepSchedule.replace('-', ' ')}</div>
                      </div>
                    </div>

                    <div className="p-2 rounded bg-slate-100/80 border border-slate-200 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Study Habits</div>
                        <div className="font-semibold text-slate-800 capitalize">{companion.studyHabits.replace('-', ' ')}</div>
                      </div>
                    </div>

                    <div className="p-2 rounded bg-slate-100/80 border border-slate-200 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Cleanliness</div>
                        <div className="font-semibold text-slate-800 capitalize">{companion.cleanliness.replace('-', ' ')}</div>
                      </div>
                    </div>

                    <div className="p-2 rounded bg-slate-100/80 border border-slate-200 flex items-center gap-2">
                      <Volume2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Noise Tolerance</div>
                        <div className="font-semibold text-slate-800 capitalize">{companion.noiseTolerance.replace('-', ' ')}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sensitive Info Privacy Protection Note */}
                <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 text-[11px] text-emerald-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Privacy Guaranteed:</strong> Private phone numbers, personal emails, parent details, and ID documents are strictly protected and never displayed.
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2">
              <button
                id="btn-chat-with-companion-footer"
                onClick={onOpenChat}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Chat With Companion
              </button>
              <button
                id="btn-view-companion-public-profile"
                onClick={() => onViewProfile(companion)}
                className="w-full py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200 transition-colors cursor-pointer"
              >
                View Full Companion Profile
              </button>
            </div>
          </div>
        ) : (
          <div
            id="card-companion-queued"
            className="lg:col-span-5 bg-white rounded-xl border border-dashed border-indigo-200 p-6 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    Companion Matching Queue
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    Awaiting Co-Applicant Registration
                  </h3>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-900 space-y-2">
                <p className="font-semibold">
                  Your room ({room.roomNumber} at {property.name}) is secured!
                </p>
                <p className="text-slate-600 leading-relaxed">
                  You are the first applicant registered for this room category. As soon as another verified student moving to {currentUser.preferredCity || currentUser.currentCity} registers with compatible academic and lifestyle criteria, our AI allocation engine will automatically assign them as your Companion.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Your Matching Profile Criteria
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase block">Mother Tongue</span>
                    <strong className="text-slate-800">{currentUser.motherTongue}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase block">College</span>
                    <strong className="text-slate-800 truncate block">{currentUser.college}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase block">Sleep Habit</span>
                    <strong className="text-slate-800 capitalize">{currentUser.sleepSchedule.replace('-', ' ')}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase block">Study Routine</span>
                    <strong className="text-slate-800 capitalize">{currentUser.studyHabits.replace('-', ' ')}</strong>
                  </div>
                </div>
              </div>
            </div>

            {onOpenRegisterModal && (
              <div className="pt-6 mt-4 border-t border-slate-100 space-y-2">
                <p className="text-xs text-slate-500">
                  Want to register a second student profile to see real-time companion pairing in action?
                </p>
                <button
                  id="btn-register-second-student"
                  onClick={onOpenRegisterModal}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  + Register Another Student Profile
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* WHY THIS ALLOCATION? (AI Holistic Rationale Section) */}
      <div
        id="section-why-this-allocation"
        className="bg-white rounded-xl border border-indigo-100 p-6 sm:p-7 shadow-xs relative overflow-hidden"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-3 flex-1">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-0.5">
                AI Compatibility & Holistic Rationale
              </div>
              <h4 className="text-lg font-bold text-slate-900">Why this allocation?</h4>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed bg-indigo-50/40 p-4 rounded-lg border border-indigo-100/80">
              "{aiRationale}"
            </p>

            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Primary Synergy Factors Synthesized:
              </div>
              <div className="flex flex-wrap gap-2">
                {keyCompatibilityFactors.map((factor, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 italic">
              Note: The AI allocation engine operates on a multi-factor compatibility matrix without public numerical scores or swipe mechanisms.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
