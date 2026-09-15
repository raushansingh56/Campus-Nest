import React, { useState } from 'react';
import { UserProfile, Room, Property, AnonymousPost, ConflictReport } from '../types';
import { StorageService } from '../services/storage';
import { VerificationBadge } from './VerificationBadge';
import { SubstanceIndicator } from './SubstanceIndicator';
import {
  Users,
  ShieldCheck,
  Building,
  AlertTriangle,
  FileCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onCloseAdmin }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'rooms' | 'moderation' | 'conflicts'>('users');
  const [searchQuery, setSearchQuery] = useState('');

  // Loaded states
  const [candidates, setCandidates] = useState<UserProfile[]>(() => StorageService.getCandidates());
  const [rooms, setRooms] = useState<Room[]>(() => StorageService.getRooms());
  const [properties, setProperties] = useState<Property[]>(() => StorageService.getProperties());
  const [posts, setPosts] = useState<AnonymousPost[]>(() => StorageService.getCommunityPosts());
  const [conflicts, setConflicts] = useState<ConflictReport[]>(() => StorageService.getConflictReports());

  // Action feedback
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // 1. User verification toggle
  const toggleUserVerification = (userId: string) => {
    const updated = candidates.map(u => {
      if (u.id === userId) {
        const currentVerified = u.verification.collegeIdVerified;
        return {
          ...u,
          verification: {
            ...u.verification,
            collegeIdVerified: !currentVerified,
            collegeEmailVerified: !currentVerified
          }
        };
      }
      return u;
    });
    setCandidates(updated);
    StorageService.saveCandidates(updated);
    showFeedback('Student verification status updated successfully.');
  };

  // 2. Room availability toggle
  const toggleRoomAvailability = (roomId: string) => {
    const updated = rooms.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          isAvailable: !r.isAvailable,
          availableSpaces: !r.isAvailable ? 1 : 0
        };
      }
      return r;
    });
    setRooms(updated);
    StorageService.saveRooms(updated);
    showFeedback('Room inventory status updated.');
  };

  // 3. Moderate Post (Approve / Remove)
  const moderatePost = (postId: string, action: 'approve' | 'remove') => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isFlagged: false,
          moderationStatus: action === 'approve' ? ('approved' as const) : ('removed' as const)
        };
      }
      return p;
    });
    setPosts(updated);
    StorageService.saveCommunityPosts(updated);
    showFeedback(action === 'approve' ? 'Post marked as approved by moderation.' : 'Violating post removed.');
  };

  // 4. Resolve Conflict
  const resolveConflict = (conflictId: string) => {
    const updated = conflicts.map(c => (c.id === conflictId ? { ...c, status: 'resolved' as const } : c));
    setConflicts(updated);
    StorageService.saveConflictReports(updated);
    showFeedback('Conflict case marked as resolved with counselor notes.');
  };

  // Filtered lists
  const filteredCandidates = candidates.filter(
    u =>
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.motherTongue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRooms = rooms.filter(
    r =>
      r.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const reportedPosts = posts.filter(p => p.reportCount > 0 || p.isFlagged || p.moderationStatus === 'under-review');

  return (
    <div id="admin-dashboard-screen" className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
            SuperAdmin Housing & Moderation Console
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            CampusNest Operations & Verification Management
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Control verification pipelines, student housing inventory, room capacity, and community safety enforcement.
          </p>
        </div>

        <button
          onClick={onCloseAdmin}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          Return to Student View
        </button>
      </div>

      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {actionNotice}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-3 gap-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'users'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Students & Verifications ({candidates.length})
        </button>
        <button
          onClick={() => setActiveTab('rooms')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'rooms'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building className="w-4 h-4" />
          Rooms & Accommodation ({rooms.length})
        </button>
        <button
          onClick={() => setActiveTab('moderation')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'moderation'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Community Moderation ({reportedPosts.length})
        </button>
        <button
          onClick={() => setActiveTab('conflicts')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'conflicts'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          Conflict Mediation Tickets ({conflicts.length})
        </button>
      </div>

      {/* TAB 1: USERS & VERIFICATION STATUS */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search students, college, tongue..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="text-xs text-slate-500">
              Showing <strong>{filteredCandidates.length}</strong> registered students
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-y border-slate-200 uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">College & Stream</th>
                  <th className="py-2.5 px-3">Homeland & Tongue</th>
                  <th className="py-2.5 px-3">Substance Safety</th>
                  <th className="py-2.5 px-3">Verification Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCandidates.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={u.avatarUrl}
                          alt={u.fullName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{u.fullName}</div>
                          <div className="text-[11px] text-slate-500">
                            {u.age} yrs • {u.gender}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{u.college}</div>
                      <div className="text-[11px] text-slate-500">{u.course} ({u.branch})</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-900">{u.motherTongue}</div>
                      <div className="text-[11px] text-slate-500">{u.nativeState}</div>
                    </td>

                    <td className="py-3 px-3">
                      <SubstanceIndicator habit={u.substanceHabit} size="sm" showDetails={false} />
                    </td>

                    <td className="py-3 px-3">
                      <VerificationBadge verification={u.verification} size="sm" />
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => toggleUserVerification(u.id)}
                        className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                          u.verification.collegeIdVerified
                            ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {u.verification.collegeIdVerified ? 'Revoke Status' : 'Approve College ID'}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCandidates.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                      No student profiles registered in this cohort yet. Students register via the intake form under their university.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ROOMS & PROPERTY INVENTORY */}
      {activeTab === 'rooms' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search rooms..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="text-xs text-slate-500">
              Total Managed Properties: <strong>{properties.length}</strong>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-y border-slate-200 uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Room & Property</th>
                  <th className="py-2.5 px-3">Type & Capacity</th>
                  <th className="py-2.5 px-3">Monthly Rent</th>
                  <th className="py-2.5 px-3">Gender Restriction</th>
                  <th className="py-2.5 px-3">Available Spaces</th>
                  <th className="py-2.5 px-3 text-right">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRooms.map(room => (
                  <tr key={room.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{room.roomNumber}</div>
                      <div className="text-[11px] text-slate-500">{room.propertyName} (Floor {room.floor})</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800 capitalize">{room.roomType.replace('-', ' ')}</div>
                      <div className="text-[11px] text-slate-500">{room.capacity} Beds Total</div>
                    </td>

                    <td className="py-3 px-3 font-bold text-emerald-700">
                      ₹{room.monthlyRent.toLocaleString()} / mo
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 font-medium">
                        {room.genderRestriction}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          room.availableSpaces > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {room.availableSpaces > 0 ? `${room.availableSpaces} Space(s) Open` : 'Fully Occupied'}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => toggleRoomAvailability(room.id)}
                        className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                          room.isAvailable
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {room.isAvailable ? 'Mark Full' : 'Open Vacancy'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MODERATION QUEUE */}
      {activeTab === 'moderation' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Community Safety & Flagged Posts Queue</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review posts flagged by students for harassment, private info leakage, or hate speech.
            </p>
          </div>

          {reportedPosts.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              All community posts are clean. Zero pending flags.
            </div>
          ) : (
            <div className="space-y-3">
              {reportedPosts.map(post => (
                <div key={post.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                      Flags: {post.reportCount} Report(s)
                    </span>
                    <span className="text-slate-400 text-[11px]">{post.timestamp}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">{post.title}</h4>
                  <p className="text-slate-700 bg-white p-3 rounded-lg border border-slate-200">{post.content}</p>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => moderatePost(post.id, 'remove')}
                      className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs cursor-pointer"
                    >
                      Remove Violating Post
                    </button>
                    <button
                      onClick={() => moderatePost(post.id, 'approve')}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs cursor-pointer"
                    >
                      Dismiss Flag & Keep Post
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CONFLICT MEDIATION TICKETS */}
      {activeTab === 'conflicts' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Roommate Conflict Resolution Support Desk</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cases submitted by students choosing Option 2 mediation before separation.
            </p>
          </div>

          {conflicts.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              No active roommate conflict escalations filed.
            </div>
          ) : (
            <div className="space-y-3">
              {conflicts.map(conf => (
                <div key={conf.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded text-[11px] uppercase">
                      {conf.issueCategory}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        conf.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {conf.status}
                    </span>
                  </div>

                  <div className="font-bold text-slate-900">
                    Complainant: {conf.submittedByName} vs Companion: {conf.companionName}
                  </div>
                  <p className="text-slate-700 bg-white p-3 rounded-lg border border-slate-200">{conf.description}</p>

                  {conf.status !== 'resolved' && (
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => resolveConflict(conf.id)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs cursor-pointer"
                      >
                        Mark Counselor Mediation Completed
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
