import { Guitar, Settings, User } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Guitar className="w-8 h-8" style={{ color: '#FF8C42' }} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF8C42] rounded-full animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl" style={{ color: '#3D2817' }}>ChordSense AI</h1>
          <p className="text-sm" style={{ color: '#8B5A3C' }}>Play. Detect. Perfect.</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          className="p-2 rounded-full hover:bg-white/30 transition-all"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6" style={{ color: '#8B5A3C' }} />
        </button>
        <button 
          className="p-2 rounded-full hover:bg-white/30 transition-all"
          aria-label="Profile"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFAD60] flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </button>
      </div>
    </header>
  );
}
