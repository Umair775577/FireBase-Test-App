import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogInForm from './Pages/LogIn';
import SignUpForm from './Pages/SignUp';
import Welcome from './Pages/Welcome';
import ForgotPassword from "./Pages/ForgotPassword"
import ResetPassword from './Pages/ResetPassword';
import ProtectedRoutes from './ProtectedRouts';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Welcome/>} />
        </Route>
        <Route path="/Sign-up" element={<SignUpForm />} />
        <Route path="/Log-in" element={<LogInForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
