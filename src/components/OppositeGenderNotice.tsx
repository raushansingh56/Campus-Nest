import React from 'react';
import { Shield, Clock, CheckCircle2, AlertCircle, X, Users } from 'lucide-react';

interface OppositeGenderNoticeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OppositeGenderNotice: React.FC<OppositeGenderNoticeProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-opposite-gender-notice-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="modal-opposite-gender-notice-content"
        className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 uppercase">
              Architecture Preview (MVP Disabled)
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Opposite-Gender Shared Accommodation Framework
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed">
            In compliance with student residential safety guidelines, opposite-gender room allocation is <strong>disabled in this MVP</strong>. CampusNest has architected the strict regulatory protocol for future phases:
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">1. Dual Mutual Student Consent</strong>
                <span className="text-slate-600">Both students must explicitly opt-in and consent to co-ed living arrangements.</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">2. Dual Parent/Guardian Gov-ID OTP Verification</strong>
                <span className="text-slate-600">Legal guardians of both students must confirm biometric Gov-ID and OTP authentication.</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">3. Mandatory 7-Day Hold Period</strong>
                <span className="text-slate-600">
                  Arrangements enter a non-negotiable 7-day hold period. If either party or guardian cancels consent, the allocation dissolves instantly and safely.
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Currently Active: Single-gender residences and wings are strictly maintained.</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
