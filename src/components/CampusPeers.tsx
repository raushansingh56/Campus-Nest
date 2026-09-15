import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { StorageService } from '../services/storage';
import { VerificationBadge } from './VerificationBadge';
import {
  School,
  Shuffle,
  Users,
  MapPin,
  Languages,
  BookOpen,
  Clock,
  Sparkles,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface CampusPeersProps {
  currentUser: UserProfile;
  onViewProfile?: (user: UserProfile) => void;
}

/**
 * Normalizes and checks if two college/campus strings refer to the same university or campus.
 */
function isSameCampus(c1?: string, c2?: string): boolean {
  if (!c1 || !c2) return false;
  const a = c1.trim().toLowerCase();
  const b = c2.trim().toLowerCase();
  if (a === b) return true;
  if (a.length > 4 && b.includes(a)) return true;
  if (b.length > 4 && a.includes(b)) return true;

  // Compare main prefix before comma or dash
  const aPrefix = a.split(/[-,]/)[0].trim();
  const bPrefix = b.split(/[-,]/)[0].trim();
  if (aPrefix.length > 5 && aPrefix === bPrefix) return true;

  return false;
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const CampusPeers: React.FC<CampusPeersProps> = ({ currentUser, onViewProfile }) => {
  const [peers, setPeers] = useState<UserProfile[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadAndShufflePeers = () => {
    // 5. Must come from the actual registered-user database, not hardcoded demo data
    const allRegistered = StorageService.getCandidates().filter(u => u && u.isRegistered);

    // 7. Never show the current logged-in user in this section
    // 4. Same college/campus
    const matchingPeers = allRegistered.filter(
      u => u.id !== currentUser.id && isSameCampus(u.college, currentUser.college)
    );

    // 6. Randomize displayed people so the same users are not always shown in the same order
    const randomized = shuffleArray(matchingPeers);
    setPeers(randomized);
    setHasLoaded(true);
  };

  useEffect(() => {
    loadAndShufflePeers();
  }, [currentUser.id, currentUser.college]);

  return (
    <div id="section-campus-peers" className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold mb-1">
            <School className="w-3.5 h-3.5 text-emerald-600" />
            Verified Campus Cohort
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            People From Your Campus
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered students enrolled at <strong className="text-slate-700">{currentUser.college}</strong>
          </p>
        </div>

        {peers.length > 1 && (
          <button
            onClick={loadAndShufflePeers}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium cursor-pointer transition-colors self-start sm:self-auto"
            title="Randomize display order"
          >
            <Shuffle className="w-3.5 h-3.5 text-slate-500" />
            Randomize Order
          </button>
        )}
      </div>

      {/* No fake users: If empty, display exact message */}
      {peers.length === 0 ? (
        <div className="py-10 px-4 text-center space-y-2 bg-slate-50/60 rounded-xl border border-dashed border-slate-200">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-800">
            No other students from your campus have registered yet.
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            You are currently the first registered student from <span className="font-semibold text-slate-700">{currentUser.college}</span>. As other real classmates complete their profile setup, they will appear here in randomized order.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {peers.map(peer => (
            <div
              key={peer.id}
              className="bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200/80 hover:border-emerald-300 p-4 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-3"
            >
              {/* Top Header: Avatar + Public Name + Verification */}
              <div className="flex items-start gap-3">
                <img
                  src={peer.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(peer.fullName)}`}
                  alt={peer.fullName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 bg-white"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {peer.fullName}
                    </h4>
                    <VerificationBadge verification={peer.verification} size="sm" />
                  </div>
                  <p className="text-xs text-slate-600 truncate mt-0.5">
                    {peer.course} • {peer.branch}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {peer.yearOfStudy} (Class of {peer.graduationYear})
                  </p>
                </div>
              </div>

              {/* Public Information Cards (Privacy Preserving: No emails, phones, IDs) */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-lg border border-slate-200/50">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Native: <strong>{peer.nativeState}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <Languages className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="truncate">Tongue: <strong>{peer.motherTongue}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">Stream: <strong>{peer.stream.split(' ')[0]}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="truncate capitalize">{peer.sleepSchedule.replace('-', ' ')}</span>
                </div>
              </div>

              {/* Action / Public Profile Details */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[11px]">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Public Profile
                </span>
                {onViewProfile && (
                  <button
                    onClick={() => onViewProfile(peer)}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Privacy Guarantee Note */}
      <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400 border-t border-slate-100">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
        <span>Privacy Protected: Phone numbers, emails, government IDs, and passwords are never exposed.</span>
      </div>
    </div>
  );
};
