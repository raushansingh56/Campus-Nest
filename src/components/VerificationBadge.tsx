import React from 'react';
import { VerificationData } from '../types';
import { CheckCircle2, ShieldCheck, Mail, FileCheck, Phone } from 'lucide-react';

interface VerificationBadgeProps {
  verification: VerificationData;
  size?: 'sm' | 'md' | 'lg';
  showAllPills?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  verification,
  size = 'md',
  showAllPills = false
}) => {
  const isFullyVerified =
    verification.collegeIdVerified &&
    verification.collegeEmailVerified;

  if (showAllPills) {
    return (
      <div className="flex flex-wrap items-center gap-1.5" id="verification-badges-group">
        {verification.collegeEmailVerified && (
          <span
            id="badge-college-email"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300"
            title="Institutional academic email verified via OTP"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            College Email Verified
          </span>
        )}
        {verification.collegeIdVerified && (
          <span
            id="badge-college-id"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300"
            title="Physical Student ID / Admission letter verified"
          >
            <ShieldCheck className="w-3 h-3 text-blue-600" />
            College ID Verified
          </span>
        )}
        {verification.phoneOtpVerified && (
          <span
            id="badge-phone-verified"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300"
            title="Mobile security OTP verified"
          >
            <Phone className="w-3 h-3 text-slate-600" />
            Phone Verified
          </span>
        )}
      </div>
    );
  }

  // Standard compact badge for headers and cards
  return (
    <span
      id="compact-verification-badge"
      className={`inline-flex items-center gap-1 font-semibold rounded-full border ${
        isFullyVerified
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-amber-50 text-amber-700 border-amber-200'
      } ${
        size === 'sm'
          ? 'px-2 py-0.5 text-xs'
          : size === 'lg'
          ? 'px-3 py-1 text-sm'
          : 'px-2.5 py-0.5 text-xs'
      }`}
      title={isFullyVerified ? 'Verified Student: College credentials confirmed' : 'Verification Pending'}
    >
      <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{isFullyVerified ? '✓ College Verified' : 'Pending Verification'}</span>
    </span>
  );
};
