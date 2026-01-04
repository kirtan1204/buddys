// import React, { useState, useRef, useEffect } from "react";
// import "../styles/Login.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const [showForgot, setShowForgot] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState("");
//   const [step, setStep] = useState(1);
//   const [newPass, setNewPass] = useState("");

//   const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
//   const otpRefs = useRef([]);
//   const [timer, setTimer] = useState(30);

//   const navigate = useNavigate();

//   /** ----------------- LOGIN --------------------- */
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/users/login",
//         formData
//       );
//       const user = res.data.user;

//       localStorage.setItem("user", JSON.stringify(user));

//       if (user.role === "admin") {
//         navigate("/admin");
//       } else {
//         const redirect = localStorage.getItem("redirectAfterLogin");
//         localStorage.removeItem("redirectAfterLogin");
//         navigate(redirect || "/");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Try again.");
//     }
//   };

//   /** ---------------- SEND OTP -------------------- */
//   const handleSendOtp = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/users/forgot-password", {
//         email: forgotEmail,
//       });

//       toast.success("OTP sent to your email!");
//       setOtpArray(["", "", "", "", "", ""]);
//       setTimer(30);
//       setStep(2);
//     } catch (err) {
//       toast.error("Failed to send OTP");
//     }
//   };

//   /** ---------------- OTP INPUT LOGIC ---------------- */
//   const handleOtpChange = (e, index) => {
//     const value = e.target.value;

//     if (!/^\d*$/.test(value)) return;

//     let newOtp = [...otpArray];
//     newOtp[index] = value;
//     setOtpArray(newOtp);

//     if (value && index < 5) {
//       otpRefs.current[index + 1].focus();
//     }
//   };

//   const handleOtpBackspace = (e, index) => {
//     if (e.key === "Backspace" && !otpArray[index] && index > 0) {
//       otpRefs.current[index - 1].focus();
//     }
//   };

//   const getOtpString = () => otpArray.join("");

//   /** ---------------- VERIFY OTP ---------------- */
//   const handleVerifyOtp = async () => {
//     const finalOtp = getOtpString();

//     if (finalOtp.length < 6) {
//       toast.error("Enter full 6-digit OTP");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/users/verify-otp", {
//         email: forgotEmail,
//         otp: finalOtp,
//       });

//       toast.success("OTP Verified!");
//       setStep(3);
//     } catch (err) {
//       toast.error("Invalid OTP");
//     }
//   };

//   /** ---------------- RESEND OTP ---------------- */
//   const resendOtp = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/users/forgot-password", {
//         email: forgotEmail,
//       });

//       toast.info("OTP resent!");
//       setOtpArray(["", "", "", "", "", ""]);
//       setTimer(30);
//     } catch (err) {
//       toast.error("Failed to resend OTP");
//     }
//   };

//   /** ---------------- TIMER EFFECT ---------------- */
//   useEffect(() => {
//     if (step === 2 && timer > 0) {
//       const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//       return () => clearInterval(interval);
//     }
//   }, [step, timer]);

//   /** ---------------- RESET PASSWORD ---------------- */
//   const handleResetPassword = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/users/reset-password", {
//         email: forgotEmail,
//         password: newPass,
//       });

//       toast.success("Password reset successfully!");
//       setShowForgot(false);
//       setStep(1);
//     } catch (err) {
//       toast.error("Failed to reset password");
//     }
//   };

//   return (
//     <div className="login-container">
//       {/* -------- Login Form -------- */}
//       <form className="login-box" onSubmit={handleLogin}>
//         <h2>Login</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <div className="password-input-wrapper">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <span
//             className="toggle-password"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         {error && <div className="error-message">{error}</div>}

//         <button type="submit" className="login-button">
//           Login
//         </button>

//         <div className="forgot-password" onClick={() => setShowForgot(true)}>
//           Forgot Password?
//         </div>

//         <div className="login-footer">
//           Don't have an account? <a href="/register">SignUp</a>
//         </div>
//       </form>

//       {/* -------- Forgot Password Modal -------- */}
//       {showForgot && (
//         <div className="modal-bg">
//           <div className="modal-box">
//             <h3>Forgot Password</h3>

//             {/* ---- Step 1: Email ---- */}
//             {step === 1 && (
//               <>
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={forgotEmail}
//                   onChange={(e) => setForgotEmail(e.target.value)}
//                 />
//                 <button onClick={handleSendOtp}>Send OTP</button>
//               </>
//             )}

//             {/* ---- Step 2: OTP ---- */}
//             {step === 2 && (
//               <>
//                 <div className="otp-title">Enter OTP</div>

//                 <div className="otp-box-container">
//                   {otpArray.map((digit, i) => (
//                     <input
//                       key={i}
//                       type="text"
//                       maxLength="1"
//                       className="otp-box"
//                       value={digit}
//                       onChange={(e) => handleOtpChange(e, i)}
//                       onKeyDown={(e) => handleOtpBackspace(e, i)}
//                       ref={(el) => (otpRefs.current[i] = el)}
//                     />
//                   ))}
//                 </div>

//                 <button onClick={handleVerifyOtp}>Verify OTP</button>

//                 <div className="resend-row">
//                   {timer > 0 ? (
//                     <span className="timer">Resend OTP in {timer}s</span>
//                   ) : (
//                     <span className="resend-btn" onClick={resendOtp}>
//                       Resend OTP
//                     </span>
//                   )}
//                 </div>
//               </>
//             )}

//             {/* ---- Step 3: Reset Password ---- */}
//             {step === 3 && (
//               <>
//                 <input
//                   type="password"
//                   placeholder="Enter new password"
//                   value={newPass}
//                   onChange={(e) => setNewPass(e.target.value)}
//                 />
//                 <button onClick={handleResetPassword}>Reset Password</button>
//               </>
//             )}

//             <button
//               className="close-btn"
//               onClick={() => {
//                 setShowForgot(false);
//                 setStep(1);
//                 setOtpArray(["", "", "", "", "", ""]);
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Toast UI */}
//       <ToastContainer position="top-center" autoClose={2500} />
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import '../styles/Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      const user = res.data.user;

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        const redirectPath = localStorage.getItem('redirectAfterLogin');
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath || '/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!forgotEmail) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/users/forgot-password', {
        email: forgotEmail
      });
      setOtpSent(true);
      setSuccessMessage('OTP has been sent to your email address');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!otp) {
      setError('Please enter OTP');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/users/verify-otp', {
        email: forgotEmail,
        otp
      });
      setOtpVerified(true);
      setSuccessMessage('OTP verified successfully! Now set your new password.');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!newPassword || !confirmPassword) {
      setError('Please enter new password and confirm it');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/users/reset-password', {
        email: forgotEmail,
        otp: otp, // Make sure this is included
        newPassword: newPassword // This should match backend expectation
      });
      setSuccessMessage('Password reset successfully! You can now login with your new password.');
      
      // Reset form and go back to login
      setTimeout(() => {
        resetForgotPasswordFlow();
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForgotPasswordFlow = () => {
    setForgotPassword(false);
    setOtpSent(false);
    setOtpVerified(false);
    setForgotEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccessMessage('');
  };

  const getCurrentStep = () => {
    if (!otpSent) return 1; // Enter email
    if (otpSent && !otpVerified) return 2; // Enter OTP
    return 3; // Reset password
  };

  const currentStep = getCurrentStep();

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={
        !forgotPassword ? handleLogin :
        currentStep === 1 ? handleSendOtp :
        currentStep === 2 ? handleVerifyOtp :
        handleResetPassword
      }>
        <h2>
          {!forgotPassword ? 'Login' : 
           currentStep === 1 ? 'Reset Password' :
           currentStep === 2 ? 'Verify OTP' :
           'Set New Password'}
        </h2>

        {/* Progress Steps */}
        {forgotPassword && (
          <div className="progress-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span>Enter Email</span>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span>Verify OTP</span>
            </div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span>New Password</span>
            </div>
          </div>
        )}

        {!forgotPassword ? (
          // Login Form
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="forgot-password-link">
              <a href="#!" onClick={(e) => { e.preventDefault(); setForgotPassword(true); }}>
                Forgot Password?
              </a>
            </div>
          </>
        ) : (
          // Forgot Password Flow
          <>
            {/* Step 1: Enter Email */}
            {currentStep === 1 && (
              <>
                <p className="forgot-password-info">
                  Enter your email address and we'll send you an OTP to reset your password.
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </>
            )}

            {/* Step 2: Enter OTP */}
            {currentStep === 2 && (
              <>
                <p className="forgot-password-info">
                  Enter the 6-digit OTP sent to your email address.
                </p>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  maxLength="6"
                  className="otp-input"
                />
                <div className="resend-otp">
                  Didn't receive OTP? <span className="resend-link" onClick={handleSendOtp}>Resend OTP</span>
                </div>
              </>
            )}

            {/* Step 3: Set New Password */}
            {currentStep === 3 && (
              <>
                <p className="forgot-password-info">
                  Enter your new password and confirm it.
                </p>
                
                <div className="password-input-wrapper">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </>
            )}
          </>
        )}

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Processing...
            </>
          ) : (
            !forgotPassword ? 'Login' :
            currentStep === 1 ? 'Send OTP' :
            currentStep === 2 ? 'Verify OTP' :
            'Reset Password'
          )}
        </button>

        <div className="forgot-password-actions">
              <button 
                type="button" 
                className="back-to-login"
                onClick={resetForgotPasswordFlow}
              >
                Back to Login
              </button>
        </div>

        {!forgotPassword && (
          <div className="login-footer">
            Don't have an account? <a href="/register">SignUp</a>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;