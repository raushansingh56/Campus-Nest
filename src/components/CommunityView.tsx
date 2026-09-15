import React, { useState } from 'react';
import { AnonymousPost, UserProfile } from '../types';
import { StorageService } from '../services/storage';
import {
  MessageSquare,
  ShieldAlert,
  ThumbsUp,
  Flag,
  Plus,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Send,
  EyeOff,
  Building,
  Info
} from 'lucide-react';

interface CommunityViewProps {
  currentUser: UserProfile | null;
  onOpenRegisterModal?: () => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ currentUser, onOpenRegisterModal }) => {
  const [posts, setPosts] = useState<AnonymousPost[]>(() => StorageService.getCommunityPosts());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPostModal, setShowPostModal] = useState(false);
  const [reportingPostId, setReportingPostId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('Harassment or inappropriate conduct');
  const [reportSuccess, setReportSuccess] = useState(false);

  // New Post Form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<AnonymousPost['category']>('accommodation-tip');
  const [newCity, setNewCity] = useState(currentUser?.preferredCity || '');
  const [authorAlias] = useState(
    currentUser ? `Verified ${currentUser.stream?.split(' ')[0] || 'Student'} Resident` : 'Verified Student'
  );

  const handleLike = (id: string) => {
    const updated = posts.map(p => (p.id === id ? { ...p, helpfulCount: p.helpfulCount + 1 } : p));
    setPosts(updated);
    StorageService.saveCommunityPosts(updated);
  };

  const handleReport = (postId: string) => {
    const updated = StorageService.reportPost(postId, reportReason);
    setPosts(updated);
    setReportingPostId(null);
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 4000);
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: AnonymousPost = {
      id: `post-${Date.now()}`,
      city: newCity,
      institution: `${currentUser?.college || 'University'} Area`,
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      authorAlias,
      verifiedAuthor: true,
      timestamp: 'Just now',
      helpfulCount: 1,
      reportCount: 0,
      isFlagged: false,
      moderationStatus: 'approved'
    };

    const updated = StorageService.addCommunityPost(newPost);
    setPosts(updated);
    setShowPostModal(false);
    setNewTitle('');
    setNewContent('');
  };

  const filteredPosts = posts.filter(p => {
    if (p.moderationStatus === 'removed') return false;
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div id="community-screen" className="max-w-4xl mx-auto space-y-6">
      {/* Strict Code of Conduct Banner */}
      <div
        id="community-code-of-conduct-banner"
        className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-xs space-y-3"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <h3 className="text-sm font-bold text-white mb-1">
              Anonymous Student Community & Experience Board • Strict Code of Conduct
            </h3>
            <p className="text-slate-300 leading-relaxed">
              This space empowers incoming students to share authentic, neutral roommate insights, area safety, and hostel tips. Author identities remain private.
            </p>
            <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
              <span className="text-rose-400 font-medium">Strictly Prohibited:</span>
              <span>• Harassment & Doxxing</span>
              <span>• Hate Speech</span>
              <span>• Unverified Defamation</span>
              <span>• Sharing Private Numbers/Names</span>
            </div>
          </div>
        </div>
      </div>

      {reportSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Post submitted to moderation queue for urgent administrative review. Thank you for keeping our community safe.
        </div>
      )}

      {/* Action Header: Filter & Post */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-semibold text-slate-500 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {[
            { id: 'all', label: 'All Experiences' },
            { id: 'accommodation-tip', label: 'Accommodation Tips' },
            { id: 'roommate-etiquette', label: 'Roommate Etiquette' },
            { id: 'area-safety', label: 'Area Safety' },
            { id: 'mess-food', label: 'Mess & Dining' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          id="btn-open-anonymous-post-modal"
          onClick={() => setShowPostModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer ml-auto"
        >
          <Plus className="w-4 h-4" />
          Share Experience (Anonymous)
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className={`bg-white rounded-xl border p-5 transition-all shadow-2xs ${
              post.isFlagged ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 uppercase">
                  {post.category.replace('-', ' ')}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Building className="w-3 h-3 text-slate-400" />
                  {post.city} • {post.institution}
                </span>
                {post.isFlagged && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Under Review
                  </span>
                )}
              </div>

              <button
                onClick={() => setReportingPostId(post.id)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors text-xs flex items-center gap-1 cursor-pointer"
                title="Report violating content"
              >
                <Flag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Report</span>
              </button>
            </div>

            <h4 className="text-base font-bold text-slate-900 mb-2">{post.title}</h4>
            <p className="text-xs text-slate-700 leading-relaxed mb-4 whitespace-pre-wrap">
              {post.content}
            </p>

            <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <EyeOff className="w-3 h-3" />
                </div>
                <span>
                  Posted by <strong className="text-slate-700">{post.authorAlias}</strong>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-400">{post.timestamp}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs cursor-pointer transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Helpful ({post.helpfulCount})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {reportingPostId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Flag className="w-4 h-4 text-rose-600" />
              Report Post to Moderator
            </h3>
            <p className="text-xs text-slate-600">
              Our safety team evaluates reported content against the CampusNest Code of Conduct within 2 hours.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Violation Category</label>
              <select
                value={reportReason}
                onChange={e => setReportReason(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              >
                <option value="Harassment or inappropriate conduct">Harassment or bullying</option>
                <option value="Doxxing or private info exposed">Exposing private student information (Phone/Email)</option>
                <option value="Hate speech or discriminatory content">Hate speech or discriminatory content</option>
                <option value="False accusations or defamation">False or unverified defamation</option>
                <option value="Commercial spam">Commercial spam or marketing</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setReportingPostId(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReport(reportingPostId)}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Anonymous Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Share Anonymous Experience</h3>
                <p className="text-xs text-slate-500">Identity permanently concealed. Only student category shown.</p>
              </div>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitPost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                >
                  <option value="accommodation-tip">Accommodation & Room Tip</option>
                  <option value="roommate-etiquette">Roommate Etiquette & Harmony</option>
                  <option value="area-safety">Area & Campus Safety</option>
                  <option value="mess-food">Mess Food & Nutrition</option>
                  <option value="study-culture">Study Culture & Exam Weeks</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Post Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Tips on study desk lighting at ABC Residency"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Observation / Feedback *</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="Focus on factual, respectful observations regarding accommodations, noise, and living tips..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Publishing as: <strong className="text-slate-800">{authorAlias}</strong></span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                >
                  Publish Anonymously
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
