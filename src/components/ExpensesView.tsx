import React, { useState } from 'react';
import { UserProfile, AllocationResult, SharedExpense, ChoreItem } from '../types';
import { StorageService } from '../services/storage';
import {
  FileText,
  IndianRupee,
  CheckCircle2,
  Plus,
  Calendar,
  Sparkles,
  Layers,
  Clock,
  User,
  Coffee,
  Check,
  AlertCircle
} from 'lucide-react';

interface ExpensesViewProps {
  currentUser: UserProfile | null;
  allocation: AllocationResult | null;
  onOpenRegisterModal?: () => void;
}

export const ExpensesView: React.FC<ExpensesViewProps> = ({ currentUser, allocation, onOpenRegisterModal }) => {
  const [activeTab, setActiveTab] = useState<'agreement' | 'expenses' | 'chores'>('agreement');
  const [expenses, setExpenses] = useState<SharedExpense[]>(() => StorageService.getExpenses());
  const [chores, setChores] = useState<ChoreItem[]>(() => StorageService.getChores());

  // Expense form
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState<number | ''>('');
  const [newCategory, setNewCategory] = useState<SharedExpense['category']>('groceries');
  const [paidBy, setPaidBy] = useState<string>('current-user');
  const [showAddExpense, setShowAddExpense] = useState(false);

  // Agreement topic checklist state (optional guidance)
  const [checkedTopics, setCheckedTopics] = useState<Record<string, boolean>>({
    rent: true,
    bills: true,
    cleaning: false,
    food: true,
    guests: false,
    quiethours: true,
    expenses: false
  });

  if (!currentUser) {
    return (
      <div id="expenses-no-user" className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-500">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Roommate Tools Locked</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Please register your student profile and receive your room allocation to access the roommate agreement guide, shared expenses tracker, and chore rotation.
        </p>
        {onOpenRegisterModal && (
          <button
            onClick={onOpenRegisterModal}
            className="mt-4 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            Register Student Profile
          </button>
        )}
      </div>
    );
  }

  const toggleTopic = (key: string) => {
    setCheckedTopics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount || Number(newAmount) <= 0) return;

    const companionName = allocation?.companion?.fullName || 'Companion';
    const payerName = paidBy === 'current-user' ? 'You' : companionName;

    const newExp: SharedExpense = {
      id: `exp-${Date.now()}`,
      title: newTitle.trim(),
      amount: Number(newAmount),
      paidByUserId: paidBy,
      paidByName: payerName,
      splitAmong: ['current-user', allocation?.companion?.id || 'companion-user'],
      date: new Date().toISOString().split('T')[0],
      category: newCategory,
      status: 'pending'
    };

    const updated = StorageService.addExpense(newExp);
    setExpenses(updated);
    setShowAddExpense(false);
    setNewTitle('');
    setNewAmount('');
  };

  const handleToggleChore = (choreId: string) => {
    const updated = StorageService.toggleChore(choreId);
    setChores(updated);
  };

  // Calculate balances
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const myPaidTotal = expenses
    .filter(e => e.paidByUserId === 'current-user')
    .reduce((sum, e) => sum + e.amount, 0);
  const companionPaidTotal = expenses
    .filter(e => e.paidByUserId !== 'current-user')
    .reduce((sum, e) => sum + e.amount, 0);

  // Equal 50-50 split between roommates
  const myShare = totalExpenses / 2;
  const netBalance = myPaidTotal - myShare; // positive: you are owed; negative: you owe

  return (
    <div id="expenses-screen" className="max-w-4xl mx-auto space-y-6">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-3 gap-2">
        <button
          onClick={() => setActiveTab('agreement')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'agreement'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          Roommate Agreement Guidance (Optional)
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'expenses'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <IndianRupee className="w-4 h-4" />
          Shared Expenses & Split Payments
        </button>
        <button
          onClick={() => setActiveTab('chores')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'chores'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          Chore Rotation Wheel
        </button>
      </div>

      {/* TAB 1: Roommate Agreement Guidance */}
      {activeTab === 'agreement' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Non-Mandatory Mutual Framework
            </div>
            <h3 className="text-lg font-bold text-slate-900">Roommate Harmony Guidance Checklist</h3>
            <p className="text-xs text-slate-600 max-w-2xl mt-1 leading-relaxed">
              In student shared accommodation, legal contracts are not mandatory. Instead, successful companions maintain mutual understanding by aligning on these 7 key living topics during move-in week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {[
              {
                key: 'rent',
                title: '1. Rent & Monthly Deposit Dues',
                desc: 'Confirm payment deadline (typically 1st to 5th of every month) with property warden.'
              },
              {
                key: 'bills',
                title: '2. Electricity & WiFi Billing',
                desc: 'Agree whether air conditioner or heater usage is metered individually or split equally.'
              },
              {
                key: 'cleaning',
                title: '3. Room Cleanliness & Trash',
                desc: 'Establish who disposes daily wet waste and weekly dust sweeping rotation.'
              },
              {
                key: 'food',
                title: '4. Food, Fridge & Cooking Essentials',
                desc: 'Clarify label etiquette for shared milk, fruits, or meal storage in the room fridge.'
              },
              {
                key: 'guests',
                title: '5. Guest Policy & Study Hours',
                desc: 'Respect hostel quiet hours (10:30 PM - 6:30 AM). Give prior notice before inviting classmates.'
              },
              {
                key: 'quiethours',
                title: '6. Quiet Hours & Headphone Rule',
                desc: 'Mandatory headphones after 11 PM during examination and project submission weeks.'
              },
              {
                key: 'expenses',
                title: '7. Shared Utility Expenses',
                desc: 'Log shared 20L drinking water cans and room supplies in the CampusNest expense splitter.'
              }
            ].map(item => (
              <div
                key={item.key}
                onClick={() => toggleTopic(item.key)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  checkedTopics[item.key]
                    ? 'border-emerald-300 bg-emerald-50/40 text-emerald-950'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                    checkedTopics[item.key]
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {checkedTopics[item.key] && <Check className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs mb-0.5">{item.title}</div>
                  <div className="text-slate-600 leading-normal">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600">
              Alignment Status: <strong>{Object.values(checkedTopics).filter(Boolean).length} / 7</strong> topics discussed with Companion.
            </span>
            <span className="text-emerald-700 font-semibold">Mutual Agreement in Effect</span>
          </div>
        </div>
      )}

      {/* TAB 2: Shared Expenses */}
      {activeTab === 'expenses' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 space-y-6">
          {/* Summary Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="text-slate-500 mb-1">Total Room Expenses</div>
              <div className="text-xl font-bold text-slate-900">₹{totalExpenses.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400 mt-1">Split 50/50 among room companions</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="text-slate-500 mb-1">Paid by You</div>
              <div className="text-xl font-bold text-emerald-700">₹{myPaidTotal.toLocaleString()}</div>
              <div className="text-[11px] text-slate-500 mt-1">Your fair share: ₹{myShare.toLocaleString()}</div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs ${
                netBalance > 0
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : netBalance < 0
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="text-slate-500 mb-1">Settlement Balance</div>
              <div className="text-xl font-bold">
                {netBalance > 0
                  ? `You are owed ₹${Math.abs(netBalance).toLocaleString()}`
                  : netBalance < 0
                  ? `You owe ₹${Math.abs(netBalance).toLocaleString()}`
                  : 'All settled up!'}
              </div>
              <div className="text-[11px] opacity-80 mt-1">
                {netBalance > 0 ? 'Companion will reimburse you' : netBalance < 0 ? 'Pay Companion directly or adjust next bill' : 'Zero outstanding'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-sm">Room Expense Ledger</h4>
            <button
              onClick={() => setShowAddExpense(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Shared Expense
            </button>
          </div>

          {/* Ledger List */}
          {expenses.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <p className="text-xs text-slate-500 mb-3">No shared expenses logged yet for this room.</p>
              <button
                onClick={() => setShowAddExpense(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Log First Shared Expense
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {expenses.map(exp => (
                <div
                  key={exp.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900">{exp.title}</div>
                    <div className="text-slate-500 flex items-center gap-2 text-[11px]">
                      <span className="capitalize">{exp.category}</span>
                      <span>•</span>
                      <span>Paid by <strong>{exp.paidByName}</strong></span>
                      <span>•</span>
                      <span>{exp.date}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-slate-900 text-sm">₹{exp.amount.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">₹{(exp.amount / 2).toLocaleString()} / student</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Expense Modal */}
          {showAddExpense && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl space-y-4">
                <h3 className="text-base font-bold text-slate-900">Add Shared Room Expense</h3>
                <form onSubmit={handleAddExpense} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Expense Title *</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      placeholder="e.g. WiFi Bill / Mineral Water Can"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (₹) *</label>
                      <input
                        type="number"
                        required
                        min={10}
                        value={newAmount}
                        onChange={e => setNewAmount(Number(e.target.value))}
                        placeholder="e.g. 500"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                      <select
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      >
                        <option value="groceries">Groceries / Water</option>
                        <option value="wifi">WiFi Internet</option>
                        <option value="cleaning">Cleaning Supplies</option>
                        <option value="electricity">Electricity / AC</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Who paid for this?</label>
                    <select
                      value={paidBy}
                      onChange={e => setPaidBy(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    >
                      <option value="current-user">You (I paid full amount)</option>
                      <option value="companion">{allocation?.companion?.fullName || 'Companion'} paid</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddExpense(false)}
                      className="px-4 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      Save & Split
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Chore Rotation */}
      {activeTab === 'chores' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 space-y-6">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Room Cleanliness & Chore Rotation</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Rotating shared tasks keeps room air clean and prevents unnecessary roommate tension.
            </p>
          </div>

          {chores.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
              <p className="text-xs text-slate-500">No recurring chores defined yet.</p>
              <button
                onClick={() => {
                  const studentName = currentUser?.fullName || 'You';
                  const compName = allocation?.companion?.fullName || 'Roommate';
                  const initialRotatedChores: ChoreItem[] = [
                    { id: `c-1-${Date.now()}`, task: 'Sweep & Mop Dorm Floor', assignedToUserId: currentUser?.id || 'current-user', assignedToName: studentName, frequency: 'Weekly', dayOfWeek: 'Sunday', completed: false },
                    { id: `c-2-${Date.now()}`, task: 'Empty & Clean Room Dustbin', assignedToUserId: allocation?.companion?.id || 'comp-id', assignedToName: compName, frequency: 'Daily', dayOfWeek: 'Daily', completed: false },
                    { id: `c-3-${Date.now()}`, task: 'Dust Study Tables & Book Shelves', assignedToUserId: currentUser?.id || 'current-user', assignedToName: studentName, frequency: 'Weekly', dayOfWeek: 'Wednesday', completed: false }
                  ];
                  StorageService.saveChores(initialRotatedChores);
                  setChores(initialRotatedChores);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Set Up Standard Chore Rotation
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {chores.map(chore => (
                <div
                  key={chore.id}
                  onClick={() => handleToggleChore(chore.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                    chore.completed
                      ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                      : 'bg-white border-slate-300 text-slate-800 hover:border-emerald-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        chore.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {chore.completed && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{chore.task}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Assigned to: <strong>{chore.assignedToName}</strong> • {chore.frequency} ({chore.dayOfWeek})
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                      chore.completed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {chore.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
