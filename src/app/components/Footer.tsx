import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full px-6 py-8 mt-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <p style={{ color: '#8B5A3C' }}>
              Powered by AI Audio Detection
            </p>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/30 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" style={{ color: '#8B5A3C' }} />
            </a>
          </div>
          <p className="text-sm" style={{ color: '#FFAD60' }}>
            Practice makes perfect
          </p>
        </div>
      </div>
    </footer>
  );
}
