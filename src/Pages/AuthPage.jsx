import React, { useState } from 'react';
import { Loader2, Mail, Lock, User, Phone, MapPin ,Building} from 'lucide-react';
import { signup, verifySignup, login, verifyLogin } from "../services/companyauth";
import { useNavigate } from 'react-router-dom';
export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="flex min-h-screen items-center justify-center bg-[--background] px-6 py-12 pt-24">
      <div className="w-full max-w-sm space-y-6 bg-[--card] p-6 rounded-[--radius] shadow-lg border-2 border-[--border]">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-[--card-foreground]">Welcome</h2>
          <p className="mt-1 text-xs text-[--muted-foreground]">Sign in to your account or create a new one</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            className={`py-1.5 px-3 rounded-[--radius] transition flex items-center justify-center gap-2 ${activeTab === 'login' ? 'bg-[#4A90E2] text-[--primary-foreground]' : 'bg-[--secondary] hover:bg-[--muted]'}`}
            onClick={() => setActiveTab('login')}
          >
            <Lock size={16} /> Login
          </button>
          <button
            className={`py-1.5 px-3 rounded-[--radius] transition flex items-center justify-center gap-2 ${activeTab === 'signup' ? 'bg-[#4A90E2] text-[--primary-foreground]' : 'bg-[--secondary] hover:bg-[--muted]'}`}
            onClick={() => setActiveTab('signup')}
          >
            <User size={16} />  SignUp
          </button>
        </div>

        {activeTab === 'login' ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

function LoadingButton({ isLoading, text }) {
  return (
    <button 
      className="w-full py-2 rounded-[--radius] flex items-center justify-center gap-2 
        bg-[#4A90E2] text-[var(--primary-foreground)] focus:outline-none 
        hover:scale-105 active:scale-90 transition-all duration-300 ease-in-out"
    >
      {isLoading ? <div className='flex flex-row justify-center items-center text-center mx-auto'><Loader2 className="animate-spin mr-2 text-[var(--primary-foreground)]" size={20} /> <span>Loading</span></div> : <span >{text}</span> }
    </button>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await login({ email });
    if (response) setOtpSent(true);
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await verifyLogin({ email, otp,navigate });
    setIsLoading(false);
  };

  return (
    <div className="mt-4 space-y-2">
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-2">
          {error && <p className="text-[--destructive] text-xs">{error}</p>}
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3.5" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
              required
            />
          </div>
          <LoadingButton isLoading={isLoading} text="Send OTP" />
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-2">
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
              maxLength={6}
              required
            />
          </div>
          <LoadingButton isLoading={isLoading} text="Verify & Login" />
        </form>
      )}
    </div>
  );
}

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', companyName: '', location: '' });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await signup({ email:formData.email });
    if (response) setOtpSent(true);
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await verifySignup({ email: formData.email, otp,name:formData.name,phone:formData.phone,companyName:formData.companyName,location:formData.location,navigate});
    setIsLoading(false);

  };

  return (
    <div className="mt-4 space-y-2">
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-2">
          {error && <p className="text-[--destructive] text-xs">{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <User size={16} className="absolute left-3 top-3.5" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
                required
              />
            </div>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-3.5" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              
              <Mail size={16} className="absolute left-3 top-3.5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
              required
            />
            </div>

            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-3.5" />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
                required
              />
            </div>
          </div>
          <div className="relative">
            <Building size={16} className="absolute left-3 top-3.5" />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
                required
              />
          </div>
          <LoadingButton isLoading={isLoading} text="Send OTP" />
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-2">
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full py-2 pl-10 pr-3 border border-[--border] rounded-[--radius] focus:outline-none focus:border-[--primary]"
              maxLength={6}
              required
            />
          </div>
          <LoadingButton isLoading={isLoading} text="Verify & Signup" />
        </form>
      )}
    </div>
  );
}