// import React, { useState } from 'react';
// import { X, Mail, Lock, User } from 'lucide-react';

// interface AuthModalProps {
//   onClose: () => void;
//   onLogin: (email: string, password: string) => void;
//   onRegister: (name: string, email: string, password: string, isArtist: boolean) => void;
// }

// export function AuthModal({ onClose, onLogin, onRegister }: AuthModalProps) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     isArtist: false
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isLogin) {
//       onLogin(formData.email, formData.password);
//     } else {
//       onRegister(formData.name, formData.email, formData.password, formData.isArtist);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-xl max-w-md w-full">
//         <div className="flex justify-between items-center p-6 border-b border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-900">
//             {isLogin ? 'Sign In' : 'Create Account'}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           {!isLogin && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Enter your full name"
//                 />
//               </div>
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Enter your email"
//               />
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Enter your password"
//               />
//             </div>
//           </div>

//           {!isLogin && (
//             <div className="mb-6">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={formData.isArtist}
//                   onChange={(e) => setFormData(prev => ({ ...prev, isArtist: e.target.checked }))}
//                   className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//                 />
//                 <span className="text-sm text-gray-700">I'm an artist looking to sell my work</span>
//               </label>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-purple-700 transition-colors"
//           >
//             {isLogin ? 'Sign In' : 'Create Account'}
//           </button>

//           <div className="mt-4 text-center">
//             <button
//               type="button"
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-purple-600 hover:text-purple-700 text-sm"
//             >
//               {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
//             </button>
//           </div>

//           {isLogin && (
//             <div className="mt-6 p-4 bg-purple-50 rounded-lg">
//               <p className="text-sm text-purple-800 mb-2">Demo Credentials:</p>
//               <p className="text-xs text-purple-700">Email: elena@example.com</p>
//               <p className="text-xs text-purple-700">Password: any password</p>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (
    name: string,
    email: string,
    password: string,
    craft: string,
    location: string,
    isArtist: boolean
  ) => void;
  mode: 'login' | 'signup';
}

export function AuthModal({ onClose, onLogin, onSignup, mode }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    craft: '',
    location: '',
    isArtist: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(form.email, form.password);
    } else {
      onSignup(form.name, form.email, form.password, form.craft, form.location, form.isArtist);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-violet-700 via-pink-300 to-blue-700 rounded-2xl shadow-2xl p-8 w-96 relative border border-white/20">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-400"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-blue-300 text-center drop-shadow-lg">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl p-3 bg-white/20 border border-white/30 placeholder-white/70 text-white focus:ring-2 focus:ring-pink-400 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Craft"
                value={form.craft}
                onChange={e => setForm({ ...form, craft: e.target.value })}
                className="w-full rounded-xl p-3 bg-white/20 border border-white/30 placeholder-white/70 text-white focus:ring-2 focus:ring-pink-400 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full rounded-xl p-3 bg-white/20 border border-white/30 placeholder-white/70 text-white focus:ring-2 focus:ring-pink-400 outline-none"
                required
              />
              <label className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  checked={form.isArtist}
                  onChange={e => setForm({ ...form, isArtist: e.target.checked })}
                  className="accent-pink-400"
                />
                <span>I'm an Artist</span>
              </label>
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl p-3 bg-white/20 border border-white/30 placeholder-white/70 text-white focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-xl p-3 bg-white/20 border border-white/30 placeholder-white/70 text-white focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:scale-105 transform transition-all shadow-lg"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 w-full text-sm text-white/80 hover:text-white text-center underline"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
