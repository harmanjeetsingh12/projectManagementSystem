import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Welcome from "./components/welcome";
import VerifyEmail from "./pages/VerifyEmail";
import AuthPage from "./pages/AuthPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/authPage" element={<AuthPage />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
        

            </Routes>
        </BrowserRouter>
    );
}

export default App;