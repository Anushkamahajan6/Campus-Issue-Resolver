import React, { useState } from 'react';
import { login, signup } from "../services/auth";
import { 
  Home, 
  LogOut, 
  Send, 
  X, 
  Check, 
  AlertCircle, 
  RefreshCcw,
  MapPin,
  Image as ImageIcon,
  Clock
} from 'lucide-react';

export default function Login({ onLogin, onLogout, complaints = [], description, setDescription, location, setLocation, setImage, setPreview, preview, submit }) {
  // 1. Core Auth State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  // 2. Animation & Feedback State
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 3. Auth Handler
  const handleAuth = async () => {
    setLoading(true);
    setError("");
    try {
      const token = isSignup
        ? await signup(email, password)
        : await login(email, password);

      const role = email.includes("admin") ? "admin" : "student";
      
      // Trigger Success Animation
      setShowSuccess(true);
      
      // Delay the actual login transition so user sees the animation
      setTimeout(() => {
        onLogin(token, role);
      }, 2000);

    } catch (err) {
      setError(err.message || "Authentication failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-emerald-50 text-slate-900 font-sans relative overflow-x-hidden">
      
      {/* --- 1. SUCCESS OVERLAY --- */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-indigo-600/95 backdrop-blur-lg">
          <div className="text-center animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Check className="text-indigo-600 w-12 h-12" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
            <p className="text-indigo-100 mt-2 font-medium">Redirecting to your campus dashboard...</p>
          </div>
        </div>
      )}

      {/* --- 2. SUCCESS TOAST --- */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform ${
        submitted ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
          <div className="bg-emerald-500 rounded-full p-1">
            <Check size={14} className="text-white" strokeWidth={4} />
          </div>
          <span className="text-sm font-medium">Action completed successfully!</span>
        </div>
      </div>

      {/* --- 3. STICKY HEADER --- */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.location.reload()} 
              className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all group"
            >
              <Home size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">CampusResolver</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">System Online</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onLogout}
            className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 rounded-xl transition-all shadow-sm"
          >
            <span className="text-sm font-semibold">Logout</span>
            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* --- 4. MAIN AUTH CARD (Login/Signup Form) --- */}
      {/* Note: Based on your code, this appears to be a combined page. 
          If you are logged out, we show the Auth inputs. */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white relative overflow-hidden">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-indigo-200">
              <AlertCircle className="text-white w-10 h-10" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {isSignup ? "Create Account" : "Sign In"}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Campus Issue Resolver</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-center gap-3">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <input
                className="w-full p-4 pl-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
                placeholder="University Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute left-4 top-4.5 text-slate-400">@</span>
            </div>

            <div className="relative">
              <input
                type="password"
                className="w-full p-4 pl-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute left-4 top-4.5 text-slate-400">🔒</span>
            </div>

            <button
              onClick={handleAuth}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all transform active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? "Processing..." : isSignup ? "Sign Up" : "Sign In"}
            </button>

            <button
              onClick={() => setIsSignup(!isSignup)}
              className="w-full text-slate-500 py-2 text-sm font-medium hover:text-indigo-600 transition-colors"
            >
              {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </main>

      {/* --- 5. FOOTER --- */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-500 p-2 rounded-xl">
                <AlertCircle size={20} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">CampusResolver</span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              The CampusResolver platform uses AI to triage and route facility issues instantly, ensuring a safer learning environment for everyone.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Resources</h4>
            <ul className="text-sm space-y-4">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Emergency Protocol</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Campus Map</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Support</h4>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
              <p className="text-white font-bold text-sm">support@campus.edu</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}