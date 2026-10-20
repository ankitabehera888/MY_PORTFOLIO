import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PearlDriftCursor } from './components/PearlDriftCursor';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Projects } from './components/Projects';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { KiboChat } from './components/KiboChat';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F2E6D3] text-[#191816] selection:bg-[#D4A338] selection:text-slate-950 font-sans relative">
        {/* Cursor Animation 06 — Pearl Drift */}
        <PearlDriftCursor />

        {/* Initial editorial loader */}
        {loading && <Loader onComplete={() => setLoading(false)} />}

        {/* Main website structure */}
        <div className={`transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Certifications />
            <Projects />
            <Resume />
            <Contact />
          </main>
          <Footer />

          {/* Kibo AI Portfolio Chatbot */}
          <KiboChat />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
