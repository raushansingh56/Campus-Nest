import React, { useState } from 'react';
import { UserProfile } from '../types';
import { VerificationBadge } from './VerificationBadge';
import { SubstanceIndicator } from './SubstanceIndicator';
import {
  ShieldCheck,
  Lock,
  BookOpen,
  MapPin,
  Moon,
  Volume2,
  CheckCircle2,
  Utensils,
  User,
  School,
  Edit,
  Eye,
  EyeOff,
  Calendar,
  IndianRupee,
  Home
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile | null;
  isCurrentUser: boolean;
  onEditRequirements?: () => void;
  onBack?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  isCurrentUser,
  onEditRequirements,
  onBack
}) => {
  const [viewMode, setViewMode] = useState<'public' | 'private'>(isCurrentUser ? 'public' : 'public');

  if (!user) {
    return (
      <div id="profile-empty-state" className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <User className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No Student Profile Registered</h3>
        <p className="text-xs text-slate-500">
          You haven't registered your student profile yet. Please complete your intake to view your profile and automated allocation.
        </p>
        {onEditRequirements && (
          <button
            onClick={onEditRequirements}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            Create Student Profile
          </button>
        )}
      </div>
    );
  }

  return (
    <div id="profile-screen" className="max-w-4xl mx-auto space-y-6">
      {/* Top action header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
            >
              ← Back
            </button>
          )}
          <h2 className="text-base font-bold text-slate-900">
            {isCurrentUser ? 'My Student Profile' : `Companion Profile: ${user.fullName}`}
          </h2>
        </div>

        {isCurrentUser && (
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setViewMode('public')}
                className={`px-3 py-1 rounded-md font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                  viewMode === 'public'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Public View (What Companions See)
              </button>
              <button
                onClick={() => setViewMode('private')}
                className={`px-3 py-1 rounded-md font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                  viewMode === 'private'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Lock className="w-3.5 h-3.5" /> Private Credentials
              </button>
            </div>

            {onEditRequirements && (
              <button
                onClick={onEditRequirements}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" /> Edit Profile & Requirements
              </button>
            )}
          </div>
        )}
      </div>

      {/* Public Profile View */}
      {viewMode === 'public' && (
        <div className="space-y-6">
          {/* Main Identity Banner */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
            />
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{user.fullName}</h3>
                <VerificationBadge verification={user.verification} size="md" />
              </div>

              <div className="text-xs text-slate-600 flex items-center gap-2 flex-wrap">
                <span>{user.age} Years Old</span>
                <span>•</span>
                <span className="capitalize">{user.gender}</span>
                <span>•</span>
                <span>Native: <strong>{user.nativeState}</strong></span>
                <span>•</span>
                <span>Mother Tongue: <strong className="text-emerald-800">{user.motherTongue}</strong></span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <SubstanceIndicator habit={user.substanceHabit} size="md" />
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  {user.yearOfStudy}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                <School className="w-4 h-4 text-indigo-600" />
                <span>Academic Credentials</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Institution</span>
                  <span className="font-semibold text-slate-900">{user.college}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Course & Degree</span>
                  <span className="font-semibold text-slate-900">{user.course}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Branch</span>
                  <span className="font-semibold text-slate-900">{user.branch}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Academic Stream</span>
                  <span className="font-semibold text-slate-900">{user.stream}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Schooling Board</span>
                  <span className="font-semibold text-slate-900">{user.board}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Graduation Year</span>
                  <span className="font-semibold text-slate-900">{user.graduationYear}</span>
                </div>
              </div>
            </div>

            {/* Accommodation Preferences */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                <Home className="w-4 h-4 text-emerald-600" />
                <span>Accommodation Requirements</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Target City</span>
                  <span className="font-semibold text-slate-900">{user.preferredCity}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Preferred Area</span>
                  <span className="font-semibold text-slate-900">{user.preferredArea || 'Near Campus'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Monthly Budget</span>
                  <span className="font-semibold text-emerald-700">₹{user.monthlyBudgetMin.toLocaleString()} - ₹{user.monthlyBudgetMax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Preferred Room Type</span>
                  <span className="font-semibold text-slate-900 capitalize">{user.preferredRoomType.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Sharing Count</span>
                  <span className="font-semibold text-slate-900">{user.preferredSharingCount} Students</span>
                </div>
              </div>
            </div>

            {/* Lifestyle & Room Habits */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 md:col-span-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Daily Lifestyle & Roommate Habits</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Sleep Schedule</div>
                  <div className="font-semibold text-slate-800 capitalize mt-0.5">{user.sleepSchedule.replace('-', ' ')}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Study Routine</div>
                  <div className="font-semibold text-slate-800 capitalize mt-0.5">{user.studyHabits.replace('-', ' ')}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Cleanliness</div>
                  <div className="font-semibold text-slate-800 capitalize mt-0.5">{user.cleanliness.replace('-', ' ')}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Diet Preference</div>
                  <div className="font-semibold text-slate-800 capitalize mt-0.5">{user.foodPreference}</div>
                </div>
              </div>

              {user.lifestyleNotes && (
                <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700 italic border border-slate-200/60">
                  "{user.lifestyleNotes}"
                </div>
              )}
            </div>
          </div>

          {/* Privacy Protection Callout */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                <strong>Privacy Policy Active:</strong> Phone numbers, email addresses, parent contacts, and government ID documents are strictly hidden from public profiles.
              </span>
            </div>
            <span className="font-bold text-emerald-800 shrink-0 ml-2">✓ Verified Encrypted</span>
          </div>
        </div>
      )}

      {/* Private Credentials (Shown only when student views their own private credentials tab) */}
      {viewMode === 'private' && isCurrentUser && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[11px] font-bold mb-2">
              <Lock className="w-3 h-3" /> Confidential Vault (Never Disclosed Publicly)
            </div>
            <h3 className="text-lg font-bold text-slate-900">Your Private Verification Credentials</h3>
            <p className="text-xs text-slate-500 mt-1">
              These credentials were verified during onboarding. Other students and Companions only see the verified badge.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-700 block">Institutional Email</span>
                <span className="text-slate-500">{user.verification.privateCollegeEmail || 'student@university.edu.in'}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                ✓ College Verified
              </span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-700 block">Verified Mobile Number</span>
                <span className="text-slate-500">{user.verification.privatePhone || '+91 98765 43210'}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                ✓ OTP Verified
              </span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-700 block">Student ID Document</span>
                <span className="text-slate-500">ID_Front_Back_Scanned.pdf (SHA-256 Verified)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[11px]">
                ✓ Document Sealed
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
