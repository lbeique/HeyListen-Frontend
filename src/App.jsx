import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUp from "./auth/SignUp"
import ConfirmSignUp from "./auth/ConfirmSignUp"
import Login from "./auth/Login"
import UserProfile from "./pages/UserProfile"
import Home from "./pages/Home"
import Navigation from "./components/Navigation"
import RouteGuard from "./auth/RouteGuard"
import Dashboard from "./pages/Dashboard"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<RouteGuard><UserProfile /></RouteGuard>} />
        <Route path="/dashboard" element={<RouteGuard><Dashboard /></RouteGuard>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}

export default App
