import React, { useState } from 'react';
import { Briefcase, Heart, Sparkles } from 'lucide-react';

interface InputFormProps {
  onAnalyze: (resume: string, interests: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading }) => {
  const [resume, setResume] = useState('');
  const [interests, setInterests] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resume.trim() && interests.trim()) {
      onAnalyze(resume, interests);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-700 dark:to-violet-700 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Career Mapper
          </h2>
          <p className="opacity-90">
            Paste your resume and interests below. AI will analyze your profile to find your best career path.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Input */}
            <div className="space-y-3">
              <label htmlFor="resume" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Your Resume / CV Text
              </label>
              <div className="relative group">
                <textarea
                  id="resume"
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Paste your full resume text here...
- Experience
- Education
- Skills"
                  className="w-full h-64 p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all resize-none font-mono text-sm leading-relaxed"
                  required
                />
                <div className="absolute inset-0 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl pointer-events-none group-hover:border-indigo-300 dark:group-hover:border-indigo-500 transition-colors opacity-50"></div>
              </div>
            </div>

            {/* Interests Input */}
            <div className="space-y-3">
              <label htmlFor="interests" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <Heart className="w-4 h-4 text-rose-500" />
                Career Interests & Goals
              </label>
              <div className="relative group">
                <textarea
                  id="interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Tell us what you love...
- I enjoy frontend development
- I want to work in climate tech
- I prefer remote work"
                  className="w-full h-64 p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none font-mono text-sm leading-relaxed"
                  required
                />
                <div className="absolute inset-0 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl pointer-events-none group-hover:border-rose-300 dark:group-hover:border-rose-500 transition-colors opacity-50"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
            <button
              type="submit"
              disabled={isLoading || !resume || !interests}
              className={`
                flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30
                transition-all duration-300 transform hover:-translate-y-1
                ${isLoading || !resume || !interests 
                  ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed shadow-none hover:transform-none' 
                  : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 hover:shadow-indigo-300'}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Profile...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Career Roadmap
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;