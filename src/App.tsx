import React, { useState, useEffect } from 'react';
import { UserProfile, AllocationResult } from './types';
import { StorageService } from './services/storage';
import { AllocationEngine } from './services/allocationEngine';
import { Navbar } from './components/Navbar';
import { DashboardHome } from './components/DashboardHome';
import { AllocationView } from './components/AllocationView';
import { ChatView } from './components/ChatView';
import { CommunityView } from './components/CommunityView';
import { ExpensesView } from './components/ExpensesView';
import { ProfileView } from './components/ProfileView';
import { RegistrationModal } from './components/RegistrationModal';
import { ConflictModal } from './components/ConflictModal';
import { OppositeGenderNotice } from './components/OppositeGenderNotice';
import { AdminDashboard } from './components/AdminDashboard';
import { ShieldCheck, Sparkles, Building, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => StorageService.getCurrentUser());
  const [candidates, setCandidates] = useState<UserProfile[]>(() => StorageService.getCandidates());
  const [currentTab, setCurrentTab] = useState<string>(() => (StorageService.getCurrentUser() ? 'allocation' : 'home'));
  const [allocation, setAllocation] = useState<AllocationResult | null>(() => {
    const user = StorageService.getCurrentUser();
    return user ? StorageService.getAllocation(user.id) : null;
  });

  // Modals
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [showOppositeGenderNotice, setShowOppositeGenderNotice] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  // View companion profile modal
  const [viewingProfileUser, setViewingProfileUser] = useState<UserProfile | null>(null);

  // Synchronize allocation when currentUser changes
  useEffect(() => {
    if (currentUser && currentUser.isRegistered) {
      const existing = StorageService.getAllocation(currentUser.id);
      setAllocation(existing);
    } else {
      setAllocation(null);
    }
  }, [currentUser]);

  // Handle student profile updates
  const handleUserSaved = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    StorageService.saveCurrentUser(updatedUser);
    StorageService.addCandidate(updatedUser);

    // Refresh candidate list with updated profile
    const all = StorageService.getCandidates();
    setCandidates(all);

    // Run allocation engine for newly submitted requirements
    const rooms = StorageService.getRooms();
    const properties = StorageService.getProperties();
    const newAlloc = AllocationEngine.allocate(updatedUser, all, rooms, properties);
    if (newAlloc) {
      StorageService.saveAllocation(newAlloc);
      setAllocation(newAlloc);
    }
    setShowRegisterModal(false);
    setCurrentTab('allocation');
  };

  // Switch student profile
  const handleSwitchUser = (user: UserProfile) => {
    setCurrentUser(user);
    StorageService.saveCurrentUser(user);
    const userAlloc = StorageService.getAllocation(user.id);
    if (userAlloc) {
      setAllocation(userAlloc);
    } else {
      const rooms = StorageService.getRooms();
      const properties = StorageService.getProperties();
      const newAlloc = AllocationEngine.allocate(user, candidates, rooms, properties);
      if (newAlloc) {
        StorageService.saveAllocation(newAlloc);
        setAllocation(newAlloc);
      }
    }
    setViewingProfileUser(null);
  };

  // Handle re-allocation triggered from conflict support
  const handleReallocate = () => {
    if (!currentUser) return;
    const rooms = StorageService.getRooms();
    const properties = StorageService.getProperties();
    const newAlloc = AllocationEngine.allocate(currentUser, candidates, rooms, properties);
    if (newAlloc) {
      StorageService.saveAllocation(newAlloc);
      setAllocation(newAlloc);
    }
    setCurrentTab('allocation');
  };

  // Reset demo database to clean initial state
  const handleResetData = () => {
    StorageService.resetToDefaults();
    StorageService.removeCurrentUser();
    setCurrentUser(null);
    setCandidates(StorageService.getCandidates());
    setAllocation(null);
    setCurrentTab('home');
    setShowRegisterModal(false);
    setViewingProfileUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={tab => {
          setViewingProfileUser(null);
          setCurrentTab(tab);
        }}
        currentUser={currentUser}
        candidates={candidates}
        onSwitchUser={handleSwitchUser}
        onOpenRegisterModal={() => setShowRegisterModal(true)}
        isAdminView={isAdminView}
        onToggleAdmin={() => setIsAdminView(!isAdminView)}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-6 px-4 sm:px-6">
        {isAdminView ? (
          <AdminDashboard onCloseAdmin={() => setIsAdminView(false)} />
        ) : viewingProfileUser ? (
          <ProfileView
            user={viewingProfileUser}
            isCurrentUser={Boolean(currentUser && viewingProfileUser.id === currentUser.id)}
            onBack={() => setViewingProfileUser(null)}
            onEditRequirements={() => setShowRegisterModal(true)}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <DashboardHome
                currentUser={currentUser}
                allocation={allocation}
                onNavigateToAllocation={() => setCurrentTab('allocation')}
                onNavigateToChat={() => setCurrentTab('chat')}
                onNavigateToExpenses={() => setCurrentTab('expenses')}
                onNavigateToCommunity={() => setCurrentTab('community')}
                onOpenConflictModal={() => setShowConflictModal(true)}
                onOpenRegisterModal={() => setShowRegisterModal(true)}
                onOpenOppositeGenderNotice={() => setShowOppositeGenderNotice(true)}
              />
            )}

            {currentTab === 'allocation' && (
              <AllocationView
                currentUser={currentUser}
                allocation={allocation}
                onOpenChat={() => setCurrentTab('chat')}
                onOpenAgreementGuide={() => setCurrentTab('expenses')}
                onRequestConflictSupport={() => setShowConflictModal(true)}
                onViewProfile={profile => setViewingProfileUser(profile)}
                onReallocate={handleReallocate}
                onOpenRegisterModal={() => setShowRegisterModal(true)}
              />
            )}

            {currentTab === 'chat' && (
              <ChatView
                currentUser={currentUser}
                allocation={allocation}
                onOpenAgreementGuide={() => setCurrentTab('expenses')}
                onOpenRegisterModal={() => setShowRegisterModal(true)}
              />
            )}

            {currentTab === 'community' && (
              <CommunityView
                currentUser={currentUser}
                onOpenRegisterModal={() => setShowRegisterModal(true)}
              />
            )}

            {currentTab === 'expenses' && (
              <ExpensesView
                currentUser={currentUser}
                allocation={allocation}
                onOpenRegisterModal={() => setShowRegisterModal(true)}
              />
            )}

            {currentTab === 'profile' && (
              <ProfileView
                user={currentUser}
                isCurrentUser={true}
                onEditRequirements={() => setShowRegisterModal(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Persistent Student Safety Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">CampusNest</span>
            <span>•</span>
            <span>AI Automated Room & Companion Allocation Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setShowOppositeGenderNotice(true)}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Opposite-Gender Regulatory Notice
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Student Network
            </span>
          </div>
        </div>
      </footer>

      {/* Registration & Requirement Onboarding Modal */}
      <RegistrationModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        initialUser={currentUser}
        initialData={currentUser}
        onSaveUser={handleUserSaved}
        onComplete={handleUserSaved}
      />

      {/* Conflict Resolution Modal */}
      <ConflictModal
        isOpen={showConflictModal}
        onClose={() => setShowConflictModal(false)}
        currentUser={currentUser}
        allocation={allocation}
        onReallocateSuccess={handleReallocate}
      />

      {/* Opposite Gender Notice Modal */}
      <OppositeGenderNotice
        isOpen={showOppositeGenderNotice}
        onClose={() => setShowOppositeGenderNotice(false)}
      />
    </div>
  );
}
