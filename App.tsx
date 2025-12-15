import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import WelcomeScreen from './screens/WelcomeScreen';
import UploadScreen from './screens/UploadScreen';
import StyleScreen from './screens/StyleScreen';
import ResultsScreen from './screens/ResultsScreen';
import DownloadScreen from './screens/DownloadScreen';
import LoginScreen from './screens/LoginScreen';
import GalleryScreen from './screens/GalleryScreen';
import EditorScreen from './screens/EditorScreen';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAppContext();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<WelcomeScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/upload" element={<UploadScreen />} />
                    <Route path="/editor" element={<EditorScreen />} />
                    <Route path="/style" element={<StyleScreen />} />
                    <Route path="/results" element={<ResultsScreen />} />
                    <Route path="/download" element={<DownloadScreen />} />
                    <Route path="/gallery" element={
                        <ProtectedRoute>
                            <GalleryScreen />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </HashRouter>
        </AppProvider>
    );
};

export default App;