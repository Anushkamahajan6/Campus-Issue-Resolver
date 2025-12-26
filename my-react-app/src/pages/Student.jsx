import React, { useEffect, useState } from "react";
import { LogOut, Send, Camera, X, FileImage } from "lucide-react";
import api from "../services/api";

export default function Student({ token, onLogout }) {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    const data = await api.getMyComplaints(token);
    setComplaints(data);
  };

  const submit = async () => {
    const res = await api.createComplaint(token, {
      description,
      location,
    });

    if (image && res.complaintId) {
      await api.uploadImage(token, res.complaintId, image);
    }

    setDescription("");
    setLocation("");
    setImage(null);
    setPreview(null);
    loadComplaints();
  };

  return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-emerald-50 text-slate-900 font-sans">
    
    {/* --- STICKY HEADER --- */}
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-indigo-200 shadow-lg">
            <Send size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">SupportPortal</h1>
            <p className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold">Issue Tracker</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right border-r pr-4 border-slate-200">
            
           
          </div>
          <button 
            onClick={onLogout}
            className="group p-2.5 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-xl transition-all"
            title="Logout"
          >
            <LogOut size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            
          </button>
        </div>
      </div>
    </header>

    {/* --- MAIN CONTENT --- */}
    <main className="flex-grow max-w-6xl mx-auto w-full p-6 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Form Column (Left 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Submit a New Report</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-600">What's the issue?</label>
                <textarea
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none min-h-[140px]"
                  placeholder="Describe the problem in detail so our team can help you faster..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-600">Exact Location</label>
                <input
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
                  placeholder="e.g., Room 402, North Wing"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-600">Evidence (Optional)</label>
                <div className="flex items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <span className="text-2xl mb-1">📸</span>
                      <p className="text-[10px] text-slate-500 font-medium">Upload Image</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                      setImage(e.target.files[0]);
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }} />
                  </label>
                  
                  {preview && (
                    <div className="relative group w-32 h-32">
                      <img src={preview} className="w-full h-full object-cover rounded-2xl border border-slate-200 shadow-md" />
                      <button onClick={() => setPreview(null)} className="absolute -top-2 -right-2 bg-slate-900 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors shadow-lg">
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={submit}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-indigo-200 transition-all active:scale-95"
              >
                <Send size={18} /> Send Report
              </button>
            </div>
          </section>
        </div>

        {/* Status Column (Right 1/3) */}
        <aside>
          <div className="sticky top-24">
            <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">Recent Activity</h3>
            <div className="space-y-3">
              {complaints.map((c, i) => (
                <div key={i} className="group p-5 bg-white/40 border border-white hover:bg-white hover:shadow-lg transition-all rounded-2xl">
                  <div className="flex justify-between items-start">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-tighter ${
                      c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {c.status?.toUpperCase() || "PENDING"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Today</span>
                  </div>
                  <h4 className="mt-2 font-bold text-slate-700 text-sm line-clamp-1">{c.summary || "Complaint Summary"}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {c.description || "No further details provided."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>

    {/* --- FOOTER --- */}
    <footer className="mt-auto bg-slate-900 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-indigo-500 p-1.5 rounded-md">
              <Send size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">SupportPortal</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            We are dedicated to resolving your workplace concerns quickly and efficiently. Your feedback helps us build a better environment.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="text-xs space-y-2">
              <li className="hover:text-white cursor-pointer transition-colors">Dashboard</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
            <ul className="text-xs space-y-2">
              <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact HR</li>
              <li className="hover:text-white cursor-pointer transition-colors">Guidelines</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">System Status</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              All systems operational
            </div>
          </div>
          <p className="text-[10px] mt-6 pt-6 border-t border-slate-800">
            © 2024 SupportPortal Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
);
}
