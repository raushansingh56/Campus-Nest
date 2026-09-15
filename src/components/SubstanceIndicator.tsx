import React from 'react';
import { SubstanceHabit } from '../types';
import { ShieldCheck, AlertTriangle, Cigarette, Wine, CheckCircle2 } from 'lucide-react';

interface SubstanceIndicatorProps {
  habit: SubstanceHabit;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const SubstanceIndicator: React.FC<SubstanceIndicatorProps> = ({
  habit,
  size = 'md',
  showDetails = true
}) => {
  switch (habit) {
    case 'non-smoker-teetotaler':
      return (
        <div
          id="substance-indicator-clean"
          className={`inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 font-medium text-emerald-800 ${
            size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'
          }`}
          title="Safety & Compatibility Verified: Strict Non-smoker and Teetotaler"
        >
          <ShieldCheck className={size === 'sm' ? 'w-3.5 h-3.5 text-emerald-600' : 'w-4 h-4 text-emerald-600'} />
          <span className="font-semibold">Substance-Free</span>
          {showDetails && <span className="text-emerald-700/80">(Non-smoker & Teetotaler)</span>}
        </div>
      );

    case 'social-drinker-only':
      return (
        <div
          id="substance-indicator-social-drink"
          className={`inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 font-medium text-blue-800 ${
            size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
          }`}
          title="Non-smoker, occasional social drinker outside hostel"
        >
          <Wine className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-semibold">Non-Smoker</span>
          {showDetails && <span className="text-blue-700/80">(Occasional Social Drinker)</span>}
        </div>
      );

    case 'occasional-smoker':
      return (
        <div
          id="substance-indicator-occasional-smoke"
          className={`inline-flex items-center gap-1.5 rounded-md border border-amber-300 bg-amber-50 font-medium text-amber-900 ${
            size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
          }`}
          title="Notice: Occasional smoker (smoking prohibited inside hostel)"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span className="font-semibold">Occasional Smoker</span>
          {showDetails && <span className="text-amber-800/80">(Notice for room compatibility)</span>}
        </div>
      );

    case 'regular-smoker':
    case 'regular-drinker':
      return (
        <div
          id="substance-indicator-regular"
          className={`inline-flex items-center gap-1.5 rounded-md border border-rose-300 bg-rose-50 font-medium text-rose-900 ${
            size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
          }`}
          title="Substance Notice: Regular habits. Must be paired with compatible roommates only."
        >
          <Cigarette className="w-3.5 h-3.5 text-rose-600" />
          <span className="font-semibold">Habit Disclosed</span>
          {showDetails && <span className="text-rose-800/80">({habit.replace('-', ' ')})</span>}
        </div>
      );

    default:
      return null;
  }
};
