import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportScam from './pages/ReportScam';
import Landing from './pages/Landing';
import Tools from './pages/Tools';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VideoSlider from './components/VideoSlider';
import CrimeAwareness from './pages/CrimeAwareness';
import 'leaflet/dist/leaflet.css';
import Appcrime from './pagescrime/Appcrime.jsx'; // Adjust path if needed
// Adjust path if needed
// Wrapper to use hooks like useLocation inside Router


import Prediction from './pagescrime/Prediction.jsx';
import SubscribeList from './pagescrime/SubscribeList.jsx';
import Dashboard from './pagescrime/Dashboard.jsx';
import Registration from './pagescrime/Registration.jsx';
import CrimeReport from './pagescrime/CrimeReport.jsx';
import NotFound from './pagescrime/NotFound.jsx';
import MapSpot from './pagescrime/MapSpot.jsx';
import InteractiveCrimeMapPage from './pagescrime/InteractiveCrimeMapPage.jsx';
import ScamLearningSection from './pagescrime/ScamLearningSection.jsx';

import QuizSelector from './components/quiz/QuizSelector.jsx';
import QuizContainer from './components/quiz/QuizContainer.jsx';

import { ProtectedRoute } from "./components/ProtectedRoute";
import Footer from './components/Footer.jsx';

// Adjust path if needed
function AppWrapper() {
  const location = useLocation();

  return (
    <>
      {/* Hide Navbar only on Landing page */}
      {location.pathname !== '/' && <Navbar />
      }
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/crime-awareness" element={<CrimeAwareness />} />
        <Route path="/home" element={<Home />} />
        <Route path="/report-scam" element={<ProtectedRoute>
          <ReportScam />
        </ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/learn/videos" element={<VideoSlider />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/crimeprediction" element={<Appcrime />} />


        <Route path="/predict" element={<Prediction />} />
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Prediction />} />
        <Route path="/subscribe" element={<SubscribeList />} />
        <Route path="/analytics" element={<Dashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/report" element={<CrimeReport />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/map-spot" element={<MapSpot />} />
        <Route path="/interactive-crime-map" element={<InteractiveCrimeMapPage />} />

        <Route path="/learn/modules" element={<ScamLearningSection />} />

        {/* <-- add this line */}

        <Route path="/" element={<QuizSelector />} />
        <Route path="/quiz/:quizId" element={<QuizContainer />} />

      </Routes>
      {/* Footer is always visible */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

