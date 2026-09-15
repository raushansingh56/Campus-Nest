import React, { useState } from 'react';
import { UserProfile, AllocationResult, ConflictReport } from '../types';
import { StorageService } from '../services/storage';
import {
  AlertTriangle,
  RefreshCw,
  HelpCircle,
  ShieldAlert,
  CheckCircle2,
  X,
  PhoneCall,
  UserCheck
} from 'lucide-react';

interface ConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  allocation: AllocationResult | null;
  onReallocateSuccess: () => void;
}

export const ConflictModal: React.FC<ConflictModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  allocation,
  onReallocateSuccess
}) => {
  const [selectedOption, setSelectedOption] = useState<'none' | 'reallocate' | 'mediation'>('none');
  const [issueCategory, setIssueCategory] = useState<ConflictReport['issueCategory']>('noise-study');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resolutionSuccess, setResolutionSuccess] = useState<'reallocated' | 'mediation-filed' | null>(null);

  if (!isOpen || !allocation || !currentUser) return null;

  const handleEndAndReallocate = () => {
    setIsSubmitting(true);

    const report: ConflictReport = {
      id: `conflict-${Date.now()}`,
      submittedByUserId: currentUser.id,
      submittedByName: currentUser.fullName,
      companionId: allocation.companion.id,
      companionName: allocation.companion.fullName,
      issueCategory,
      description: description || 'Student requested room re-allocation via Option 1.',
      actionRequested: 'request-reallocation',
      status: 'reallocated',
      createdAt: new Date().toISOString()
    };

    StorageService.submitConflictReport(report);

    // Remove existing allocation so engine pairs anew
    StorageService.removeAllocation(currentUser.id);

    setTimeout(() => {
      setIsSubmitting(false);
      setResolutionSuccess('reallocated');
      setTimeout(() => {
        onReallocateSuccess();
        onClose();
      }, 1500);
    }, 1000);
  };

  const handleRequestMediation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const report: ConflictReport = {
      id: `conflict-${Date.now()}`,
      submittedByUserId: currentUser.id,
      submittedByName: currentUser.fullName,
      companionId: allocation.companion.id,
      companionName: allocation.companion.fullName,
      issueCategory,
      description,
      actionRequested: 'request-mediation',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    StorageService.submitConflictReport(report);

    setTimeout(() => {
      setIsSubmitting(false);
      setResolutionSuccess('mediation-filed');
      setTimeout(() => {
        onClose();
        setResolutionSuccess(null);
        setSelectedOption('none');
      }, 2000);
    }, 800);
  };

  return (
    <div
      id="modal-conflict-support-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="modal-conflict-support-content"
        className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-rose-700">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-slate-900 text-base">Roommate Conflict Support & Resolution</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {resolutionSuccess === 'reallocated' && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-2 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm">Arrangement Ended & Re-entering Allocation Pipeline</h4>
            <p className="text-slate-600">
              The current room reservation has been cleanly concluded. Running AI Allocation for a fresh room and Companion now...
            </p>
          </div>
        )}

        {resolutionSuccess === 'mediation-filed' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-2 text-center">
            <UserCheck className="w-8 h-8 text-blue-600 mx-auto" />
            <h4 className="font-bold text-sm">Mediation Case Opened with Campus Living Counselor</h4>
            <p className="text-slate-600">
              A neutral student counselor will review the situation and schedule an informal discussion before any separation decision is made.
            </p>
          </div>
        )}

        {!resolutionSuccess && (
          <>
            <p className="text-xs text-slate-600 leading-relaxed">
              Living with a new student can sometimes surface unexpected friction around study hours, sleep habits, or cleanliness. CampusNest provides two structured paths:
            </p>

            {/* Option Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Option 1 */}
              <div
                onClick={() => setSelectedOption('reallocate')}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  selectedOption === 'reallocate'
                    ? 'border-rose-400 bg-rose-50/40 text-rose-950 ring-1 ring-rose-400'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-rose-700">
                  <RefreshCw className="w-4 h-4" />
                  <span>Option 1: End & Reallocate</span>
                </div>
                <p className="text-slate-600 leading-normal text-[11px]">
                  End the current arrangement respectfully. Re-enter the AI allocation engine immediately to be allocated another suitable room & Companion.
                </p>
              </div>

              {/* Option 2 */}
              <div
                onClick={() => setSelectedOption('mediation')}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  selectedOption === 'mediation'
                    ? 'border-indigo-400 bg-indigo-50/40 text-indigo-950 ring-1 ring-indigo-400'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-indigo-700">
                  <HelpCircle className="w-4 h-4" />
                  <span>Option 2: Campus Mediation</span>
                </div>
                <p className="text-slate-600 leading-normal text-[11px]">
                  Request an impartial platform mediation facilitator or hostel warden check-in to resolve misunderstandings before parting ways.
                </p>
              </div>
            </div>

            {/* Option 1 Action Form */}
            {selectedOption === 'reallocate' && (
              <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-3 text-xs">
                <div className="font-bold text-rose-900">Confirm Re-allocation Request</div>
                <p className="text-slate-600 text-[11px]">
                  Please indicate what caused the incompatibility so the AI allocation engine can adjust its weights for your next Companion:
                </p>
                <select
                  value={issueCategory}
                  onChange={e => setIssueCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option value="noise-study">Quiet Hours / Exam Study Incompatibility</option>
                  <option value="cleanliness">Hygiene or Cleanliness Standard Differences</option>
                  <option value="guests-sleep">Sleep Schedule & Guest Disruptions</option>
                  <option value="substance-safety">Substance / Safety Concern</option>
                  <option value="other">General Lifestyle Incompatibility</option>
                </select>

                <button
                  onClick={handleEndAndReallocate}
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-colors"
                >
                  {isSubmitting ? 'Processing Re-allocation...' : 'Confirm & Request Replacement Allocation'}
                </button>
              </div>
            )}

            {/* Option 2 Action Form */}
            {selectedOption === 'mediation' && (
              <form onSubmit={handleRequestMediation} className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-3 text-xs">
                <div className="font-bold text-indigo-950">Campus Mediation Support Request</div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Issue Category</label>
                  <select
                    value={issueCategory}
                    onChange={e => setIssueCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                  >
                    <option value="noise-study">Noise / Study Schedule Friction</option>
                    <option value="cleanliness">Room Chores / Cleanliness Standards</option>
                    <option value="guests-sleep">Overnight Guests Policy</option>
                    <option value="other">Communication / Living Habit Friction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">What would help resolve this?</label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Briefly describe what you would like the counselor or warden to assist with..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-colors"
                >
                  {isSubmitting ? 'Submitting Case...' : 'Submit to Student Living Counselor'}
                </button>
              </form>
            )}

            {/* Emergency Info */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                Emergency Campus Helpline: <strong>1800-CAMPUS-SAFE</strong>
              </span>
              <span>Available 24/7</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
