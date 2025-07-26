
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportScam from './pages/ReportScam';
import Landing from './pages/Landing';
import Tools from './pages/Tools';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgetPasswordPage from './pages/ForgetPassword';
import VideoSlider from './components/VideoSlider';
import CrimeAwareness from './pages/CrimeAwareness';
import 'leaflet/dist/leaflet.css';
import Appcrime from './pagescrime/Appcrime';


import Prediction from './pagescrime/Prediction.jsx';
import SubscribeList from './pagescrime/SubscribeList.jsx';
import Dashboard from './pages/Deshboard.jsx';
import Registration from './pagescrime/Registration.jsx';
import CrimeReport from './pagescrime/CrimeReport.jsx';
import InteractiveCrimeMapPage from './pagescrime/InteractiveCrimeMapPage.jsx';
import ScamLearningSection from './pagescrime/ScamLearningSection.jsx';

import { ProtectedRoute } from "./components/ProtectedRoute";
import Footer from './components/Footer.jsx';
import PageNotFound from './pagescrime/NotFound.jsx';
import MapSpotPage from './pagescrime/MapSpot.jsx';

// Adjust path if needed
function AppWrapper() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/crime-awareness" element={<CrimeAwareness />} />
        <Route path="/home" element={<Home />} />
        <Route path="/report-scam" element={<ReportScam />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/learn/videos" element={<VideoSlider />} />
        <Route path="/chatbot" element={<Tools />} />
        <Route path="/crimehub" element={<Appcrime />} />


        <Route path="/predict" element={<Prediction />} />
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Prediction />} />
        <Route path="/subscribe" element={<SubscribeList />} />
        <Route path="/analytics" element={<Dashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/report" element={<CrimeReport />} />

        <Route path="/map-spot" element={<MapSpotPage />} />
        <Route path="/interactive-crime-map" element={<InteractiveCrimeMapPage />} />

        <Route path="/learn/modules" element={<ScamLearningSection />} />

        {/* <-- add this line */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* Footer is always visible */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;

