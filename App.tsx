import React, { useState, useEffect } from 'react';
import { Compass, Moon, Sun } from 'lucide-react';
import InputForm from './components/InputForm';
import AnalysisDashboard from './components/AnalysisDashboard';
import { analyzeCareerPath } from './services/geminiService';
import { CareerAnalysis, AppState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [analysisData, setAnalysisData] = useState<CareerAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAnalyze = async (resume: string, interests: string) => {
    setAppState(AppState.ANALYZING);
    setErrorMsg(null);
    try {
      const result = await analyzeCareerPath(resume, interests);
      setAnalysisData(result);
      setAppState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to analyze data. Please check your internet connection or API key and try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setAppState(AppState.IDLE);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      
      {/* Navigation / Header */}
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
              <div className="p-2 bg-indigo-600 rounded-lg shadow-md shadow-indigo-200 dark:shadow-none">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                Pathfinder AI
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">How it Works</span>
                <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">About</span>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* State Management */}
        {appState === AppState.IDLE && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                Discover Your True <br/>
                <span className="text-indigo-600 dark:text-indigo-400">Career Potential</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Upload your resume and tell us your interests. Our advanced AI will map your skills to real-world roles and build you a custom roadmap to get hired.
              </p>
            </div>
            <InputForm onAnalyze={handleAnalyze} isLoading={false} />
          </div>
        )}

        {appState === AppState.ANALYZING && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
             <div className="relative w-24 h-24 mb-8">
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-indigo-600 dark:border-indigo-500 border-t-transparent animate-spin"></div>
                <Compass className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-500 w-8 h-8" />
             </div>
             <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Analyzing Profile...</h3>
             <p className="text-slate-500 dark:text-slate-400 max-w-md text-center">
               We are mapping your skills to industry standards, identifying gaps, and generating a personalized strategy.
             </p>
          </div>
        )}

        {appState === AppState.ERROR && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-rose-700 dark:text-rose-300 mb-2">Analysis Failed</h3>
              <p className="text-rose-600 dark:text-rose-200 mb-6">{errorMsg}</p>
              <button 
                onClick={handleReset}
                className="px-6 py-3 bg-white dark:bg-slate-800 border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 font-semibold rounded-xl hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {appState === AppState.RESULTS && analysisData && (
          <AnalysisDashboard data={analysisData} onReset={handleReset} />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 mt-auto bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-400 dark:text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Pathfinder AI. Powered by Google Gemini.</p>
        </div>
      </footer>

      {/* Tailwind Custom Animations (inline for simplicity in this file structure) */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;