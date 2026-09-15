import React, { useState } from 'react';
import { UserProfile } from '../types';
import { VerificationBadge } from './VerificationBadge';
import {
  Home,
  Compass,
  MessageSquare,
  Users,
  IndianRupee,
  User,
  Shield,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Building,
  UserPlus
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentUser: UserProfile | null;
  candidates: UserProfile[];
  onSwitchUser: (user: UserProfile) => void;
  onOpenRegisterModal: () => void;
  isAdminView: boolean;
  onToggleAdmin: () => void;
  onResetData: () => void;
  onOpenNewStudentModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  candidates,
  onSwitchUser,
  onOpenRegisterModal,
  isAdminView,
  onToggleAdmin,
  onResetData,
  onOpenNewStudentModal
}) => {
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  const otherRegistered = candidates.filter(
    c => c.isRegistered && (!currentUser || c.id !== currentUser.id)
  );

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'allocation', label: 'My Allocation', icon: Building, highlight: true },
    { id: 'chat', label: 'Messages', icon: MessageSquare },
    { id: 'community', label: 'Community', icon: Compass },
    { id: 'expenses', label: 'Expenses & Chores', icon: IndianRupee },
    { id: 'profile', label: 'My Profile', icon: User }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
                  CampusNest
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    AI Allocation
                  </span>
                </span>
                <span className="hidden sm:block text-[10px] text-slate-500 leading-none">
                  Student Accommodation & Verified Companions
                </span>
              </div>
            </div>
          </div>

          {/* Center Navigation Links (Hidden in Admin view) */}
          {!isAdminView && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => onSelectTab(link.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : link.highlight
                        ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                    {link.highlight && !isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Admin Toggle */}
            <button
              id="btn-toggle-admin-view"
              onClick={onToggleAdmin}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isAdminView
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAdminView ? 'Exit Admin' : 'Admin Console'}</span>
            </button>

            {/* User Profile or Register Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="btn-persona-switcher"
                  onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    className="w-7 h-7 rounded-lg object-cover border border-slate-300"
                  />
                  <div className="hidden sm:block text-left text-xs leading-tight">
                    <div className="font-bold text-slate-800 truncate max-w-[110px]">
                      {currentUser.fullName}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold">Registered Student</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showPersonaMenu && (
                  <div
                    id="persona-dropdown-menu"
                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 space-y-1 animate-in fade-in zoom-in-95"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100">
                      Active Student Profile
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200">
                      <div className="font-bold text-xs text-slate-900">{currentUser.fullName}</div>
                      <div className="text-[11px] text-slate-600">{currentUser.college}</div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        Target: {currentUser.preferredCity} • {currentUser.motherTongue}
                      </div>
                    </div>

                    {/* Switch between registered peers if any exist */}
                    {otherRegistered.length > 0 && (
                      <div className="border-t border-slate-100 pt-1 mt-1 space-y-1">
                        <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase">
                          Switch Profile ({otherRegistered.length})
                        </div>
                        <div className="max-h-36 overflow-y-auto space-y-0.5">
                          {otherRegistered.map(c => (
                            <button
                              key={c.id}
                              onClick={() => {
                                setShowPersonaMenu(false);
                                onSwitchUser(c);
                              }}
                              className="w-full text-left p-1.5 hover:bg-slate-50 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
                            >
                              <div className="truncate min-w-0 pr-2">
                                <div className="font-semibold text-xs text-slate-800 truncate">{c.fullName}</div>
                                <div className="text-[10px] text-slate-500 truncate">{c.college}</div>
                              </div>
                              <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold shrink-0">
                                Switch
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-slate-100 pt-1 mt-1 space-y-0.5">
                      <button
                        onClick={() => {
                          setShowPersonaMenu(false);
                          onOpenRegisterModal();
                        }}
                        className="w-full p-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <UserPlus className="w-4 h-4" />
                        Edit My Profile
                      </button>

                      {onOpenNewStudentModal && (
                        <button
                          onClick={() => {
                            setShowPersonaMenu(false);
                            onOpenNewStudentModal();
                          }}
                          className="w-full p-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <UserPlus className="w-4 h-4 text-indigo-600" />
                          Register Another Student
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setShowPersonaMenu(false);
                          onResetData();
                        }}
                        className="w-full p-2 text-[11px] text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
                        Clear & Reset All Data
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="btn-register-profile-nav"
                onClick={onOpenRegisterModal}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        {!isAdminView && (
          <div className="md:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-slate-100 gap-1 text-xs">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium flex items-center gap-1 ${
                    isActive ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
