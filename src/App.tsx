// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';
import Authorization from './pages/Authorization';
import PostJob from './pages/PostJob';
import Transactions from './pages/Transactions';
import Registration from './pages/Registration';
import MyJobs from './pages/MyJobs';
import EditJob from './pages/EditJob';
import { AuthProvider } from './context/AuthContext';
import { useUserStore } from './store/userStore';
import './App.css';
import JobDetails from "./pages/JobDetails";
import Applicants from "./pages/Applicants";
import UserProfile from "./pages/UserProfile";
import ChatPage from "./pages/ChatPage";
import FreelancerJobs from "./pages/FreelancerJobs";


const PrivateRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
    const { token } = useUserStore();
    return token ? <Component /> : <Navigate to="/authorization" />;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Header />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/jobs" element={<Jobs />} />
                            <Route path="/job-details/:id" element={<PrivateRoute component={JobDetails} />} />
                            <Route path="/authorization" element={<Authorization />} />
                            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
                            <Route path="/post-job" element={<PrivateRoute component={PostJob} />} />
                            <Route path="/transactions" element={<PrivateRoute component={Transactions} />} />
                            <Route path="/registration" element={<Registration />} />
                            <Route path="/my-jobs" element={<PrivateRoute component={MyJobs} />} />
                            <Route path="/edit-job/:id" element={<PrivateRoute component={EditJob} />} />
                            <Route path="/applicants/:jobId" element={<PrivateRoute component={Applicants} />} />
                            <Route path="/user-profile/:userId" element={<PrivateRoute component={UserProfile} />} />
                            <Route path="/chat/:jobId/:receiverId" element={<PrivateRoute component={ChatPage} />} />
                            <Route path="/freelancer-jobs" element={<PrivateRoute component={FreelancerJobs} />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
