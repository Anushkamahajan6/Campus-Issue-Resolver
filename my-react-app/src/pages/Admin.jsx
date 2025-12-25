import React, { useEffect, useState } from "react";
import api from "../services/api";
import { 
  LogOut, 
  Home, 
  RefreshCcw, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  Filter
} from "lucide-react";

export default function Admin({ token, onLogout }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getAllComplaints(token);
      setComplaints(data);
    } catch (error) {
      console.error("Failed to load complaints", error);
    }
    setLoading(false);
  };

  // Quick stats for the top cards
  const pendingCount = complaints.filter(c => c.status !== 'Resolved').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-emerald-50 text-slate-900 font-sans">
      
      {/* --- STICKY HEADER --- */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-600 text-white rounded-xl">
              <Home size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800 leading-none">Admin Panel</h1>
              <p className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold mt-1">Management Console</p>
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

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-6 lg:py-10">
        
        {/* Statistics Overview Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Issues</p>
              <h3 className="text-2xl font-bold text-slate-800">{complaints.length}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending</p>
              <h3 className="text-2xl font-bold text-slate-800">{pendingCount}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Resolved</p>
              <h3 className="text-2xl font-bold text-slate-800">{resolvedCount}</h3>
            </div>
          </div>
        </div>

        {/* List Controls */}
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            Active Complaints
            {loading && <RefreshCcw size={18} className="animate-spin text-indigo-500" />}
          </h2>
          <div className="flex gap-3">
            <button onClick={load} className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
              <RefreshCcw size={18} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 shadow-sm font-medium text-sm">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Complaints Grid/List */}
        <div className="grid grid-cols-1 gap-4">
          {complaints.length > 0 ? (
            complaints.map((c, i) => (
              <div 
                key={i} 
                className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                      c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {c.status || "Pending"}
                    </span>
                    <span className="text-xs text-slate-400 font-medium italic">Ref: #ID-{i+100}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-1">{c.summary || "No Summary Provided"}</h4>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                    {c.originalDescription || "No detailed description provided for this campus issue."}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 md:pl-6 md:border-l border-slate-100">
                  <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-colors flex items-center gap-2">
                    Review <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white/50 border-2 border-dashed border-slate-200 rounded-[3rem]">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Filter size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-700">No complaints yet</h3>
              <p className="text-slate-500">The dashboard is currently clear.</p>
            </div>
          )}
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-1.5 rounded-lg">
              <AlertCircle size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">AdminPortal</span>
          </div>
          <p className="text-xs font-medium tracking-widest uppercase">
            © 2024 University Internal Management System
          </p>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-tighter">
            <span className="hover:text-white cursor-pointer transition-colors">Audit Log</span>
            <span className="hover:text-white cursor-pointer transition-colors">Security Settings</span>
          </div>
        </div>
      </footer>
    </div>
  );
}