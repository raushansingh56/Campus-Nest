import React from 'react';
import { UserProfile, AllocationResult } from '../types';
import { VerificationBadge } from './VerificationBadge';
import { SubstanceIndicator } from './SubstanceIndicator';
import { CampusPeers } from './CampusPeers';
import {
  Sparkles,
  Building,
  User,
  MessageSquare,
  FileText,
  Calendar,
  AlertOctagon,
  ShieldCheck,
  ChevronRight,
  Bell,
  MapPin,
  Clock,
  ArrowRight,
  IndianRupee
} from 'lucide-react';

interface DashboardHomeProps {
  currentUser: UserProfile | null;
  allocation: AllocationResult | null;
  onNavigateToAllocation: () => void;
  onNavigateToChat: () => void;
  onNavigateToExpenses: () => void;
  onNavigateToCommunity: () => void;
  onOpenConflictModal: () => void;
  onOpenRegisterModal: () => void;
  onOpenOppositeGenderNotice: () => void;
  onViewProfile?: (user: UserProfile) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  currentUser,
  allocation,
  onNavigateToAllocation,
  onNavigateToChat,
  onNavigateToExpenses,
  onNavigateToCommunity,
  onOpenConflictModal,
  onOpenRegisterModal,
  onOpenOppositeGenderNotice,
  onViewProfile
}) => {
  return (
    <div id="dashboard-home-screen" className="max-w-5xl mx-auto space-y-6">
      {/* Welcome & Student Status Banner or Onboarding Banner */}
      {currentUser ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Welcome, {currentUser.fullName.split(' ')[0]}!
                </h2>
                <VerificationBadge verification={currentUser.verification} size="sm" />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentUser.yearOfStudy} • {currentUser.course} ({currentUser.branch}) at {currentUser.college}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Target: <strong>{currentUser.preferredCity}</strong>
                </span>
                <span>•</span>
                <span>Mother Tongue: <strong>{currentUser.motherTongue}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-end gap-2 w-full sm:w-auto">
            <button
              id="btn-home-update-requirements"
              onClick={onOpenRegisterModal}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              Edit Requirements
            </button>
            <button
              onClick={onOpenOppositeGenderNotice}
              className="text-[11px] text-indigo-600 hover:underline cursor-pointer"
            >
              Opposite-Gender Policy ℹ️
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-8 shadow-md relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Automated AI Room & Companion Allocation Platform
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Moving to a new city? Find your verified room and student Companion.
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              CampusNest replaces swipe apps and random housing with an objective AI compatibility allocation engine. Input your academic background, mother tongue, budget, sleep and study habits to receive your automated room and Companion allocation.
            </p>
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <button
                id="btn-home-start-intake"
                onClick={onOpenRegisterModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Register Student & Run AI Allocation
              </button>
              <button
                onClick={onOpenOppositeGenderNotice}
                className="text-xs text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Learn about safety & allocation rules
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Primary Allocation Status Highlight */}
      {allocation ? (
        <div
          id="card-home-current-allocation"
          className="bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden"
        >
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Active Room & Companion Allocation
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {allocation.room.roomType.replace('-', ' ').toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-1">
              {/* Room Snapshot */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
                <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" /> Allocated Room
                </div>
                <div className="text-lg font-bold text-white">{allocation.room.roomNumber}</div>
                <div className="text-xs text-slate-300">{allocation.property.name}</div>
                <div className="text-xs text-slate-400 pt-1">
                  Rent: <strong className="text-emerald-300">₹{allocation.room.monthlyRent.toLocaleString()}</strong> / month
                </div>
              </div>

              {/* Companion Snapshot */}
              {allocation.companion ? (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
                  <div className="text-xs text-indigo-300 font-bold uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> Your Companion
                  </div>
                  <div className="text-lg font-bold text-white">{allocation.companion.fullName}</div>
                  <div className="text-xs text-slate-300">
                    {allocation.companion.course} ({allocation.companion.branch})
                  </div>
                  <div className="text-xs text-slate-400 pt-1">
                    Native: <strong>{allocation.companion.nativeState}</strong> • Tongue: <strong>{allocation.companion.motherTongue}</strong>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
                  <div className="text-xs text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> Companion Matching
                  </div>
                  <div className="text-base font-bold text-white">Queueing Applicants</div>
                  <div className="text-xs text-slate-300">
                    Room reserved. Companion assigned as peer applicants register.
                  </div>
                  <div className="text-xs text-slate-400 pt-1">
                    Target: <strong>{currentUser.preferredCity || currentUser.currentCity}</strong> • Tongue: <strong>{currentUser.motherTongue}</strong>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-300 italic max-w-md">
                "{allocation.aiRationale}"
              </p>
              <div className="flex items-center gap-2">
                {allocation.companion && (
                  <button
                    onClick={onNavigateToChat}
                    className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Chat Companion
                  </button>
                )}
                <button
                  id="btn-home-view-full-allocation"
                  onClick={onNavigateToAllocation}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  View Full Accommodation <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
          <Sparkles className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Ready for Automatic Room & Companion Allocation</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Submit your verified requirements. Our multi-factor algorithm pairs you automatically without swipe fatigue or dating-style mechanics.
          </p>
          <button
            onClick={onNavigateToAllocation}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs cursor-pointer shadow-xs"
          >
            Launch Allocation Pipeline
          </button>
        </div>
      )}

      {/* People From Your Campus Section */}
      {currentUser && (
        <CampusPeers currentUser={currentUser} onViewProfile={onViewProfile} />
      )}

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Expenses & Split */}
        <div
          onClick={onNavigateToExpenses}
          className="bg-white rounded-xl border border-slate-200/80 p-5 hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer space-y-2"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <IndianRupee className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Roommate Expenses & Chores</h4>
          <p className="text-xs text-slate-500 leading-normal">
            Track split bills, 20L drinking water cans, and chore rotation wheels with your Companion.
          </p>
          <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1 pt-1">
            Open Ledger <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Anonymous Community */}
        <div
          onClick={onNavigateToCommunity}
          className="bg-white rounded-xl border border-slate-200/80 p-5 hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer space-y-2"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Anonymous Experiences</h4>
          <p className="text-xs text-slate-500 leading-normal">
            Read verified hostel insights, electricity tips, and quiet study habits shared by students.
          </p>
          <div className="text-xs font-semibold text-indigo-700 flex items-center gap-1 pt-1">
            Read Experiences <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Conflict & Re-allocation */}
        <div
          onClick={onOpenConflictModal}
          className="bg-white rounded-xl border border-slate-200/80 p-5 hover:border-rose-300 hover:shadow-xs transition-all cursor-pointer space-y-2"
        >
          <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Conflict Management</h4>
          <p className="text-xs text-slate-500 leading-normal">
            Option 1: End arrangement & reallocate. Option 2: Campus mediation before separation.
          </p>
          <div className="text-xs font-semibold text-rose-700 flex items-center gap-1 pt-1">
            Resolution Center <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Important Campus Notices & Safety Guarantee */}
      <div className="p-4 bg-slate-900 text-white rounded-xl flex items-start gap-3 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-white flex items-center gap-2">
            CampusNest Zero-Exposure Student Privacy Standard
          </div>
          <p className="text-slate-300 leading-relaxed">
            All phone numbers, personal email addresses, parent contacts, and identity documents are encrypted server-side and never displayed on public profile cards.
          </p>
        </div>
      </div>
    </div>
  );
};
