// import React from 'react';
// import { Palette, User, LogOut, Home, Grid3X3 } from 'lucide-react';
// import type { User as UserType } from '../types';

// interface HeaderProps {
//   currentUser: UserType | null;
//   onLogin: () => void;
//   onLogout: () => void;
//   onNavigate: (view: 'home' | 'dashboard') => void;
//   currentView: 'home' | 'dashboard';
// }

// export function Header({ currentUser, onLogin, onLogout, onNavigate, currentView }: HeaderProps) {
//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <div className="flex-shrink-0 flex items-center">
//               <Palette className="h-8 w-8 text-purple-600" />
//               <span className="ml-2 text-xl font-bold text-gray-900">ArtisanHub</span>
//             </div>
            
//             {currentUser?.isArtist && (
//               <nav className="ml-8 flex space-x-4">
//                 <button
//                   onClick={() => onNavigate('home')}
//                   className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     currentView === 'home'
//                       ? 'bg-purple-100 text-purple-700'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   <Home className="h-4 w-4 mr-2" />
//                   Marketplace
//                 </button>
//                 <button
//                   onClick={() => onNavigate('dashboard')}
//                   className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     currentView === 'dashboard'
//                       ? 'bg-purple-100 text-purple-700'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   <Grid3X3 className="h-4 w-4 mr-2" />
//                   Dashboard
//                 </button>
//               </nav>
//             )}
//           </div>

//           <div className="flex items-center space-x-4">
//             {currentUser ? (
//               <div className="flex items-center space-x-3">
//                 <div className="flex items-center">
//                   <User className="h-6 w-6 text-gray-400" />
//                   <span className="ml-2 text-sm text-gray-700">{currentUser.name}</span>
//                   {currentUser.isArtist && (
//                     <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
//                       Artist
//                     </span>
//                   )}
//                 </div>
//                 <button
//                   onClick={onLogout}
//                   className="flex items-center px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
//                 >
//                   <LogOut className="h-4 w-4 mr-1" />
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={onLogin}
//                 className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
//               >
//                 Sign In
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

import React from 'react';
import { Palette, User, LogOut, Home, Grid3X3 } from 'lucide-react';
import type { User as UserType } from '../types';

interface HeaderProps {
  currentUser: UserType | null;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
  onNavigate: (view: 'home' | 'dashboard') => void;
  currentView: 'home' | 'dashboard';
}

export function Header({ currentUser, onLogin, onSignup, onLogout, onNavigate, currentView }: HeaderProps) {
  return (
    <header className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-800 shadow-sm border-b border-gray-700">
      {/* Black overlay like in Hero */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Palette className="h-8 w-8 text-purple-400" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              ArtisanHub
            </span>

            {/* Navigation Links */}
            {currentUser && (
              <nav className="ml-8 flex space-x-4">
                <button
                  onClick={() => onNavigate('home')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium border-2 transition-colors ${
                    currentView === 'home'
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-pink'
                      : 'text-white border-white hover:bg-white/10'
                  }`}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Marketplace
                </button>

                {currentUser.isArtist && (
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium border-2 transition-colors ${
                      currentView === 'dashboard'
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                        : 'text-white border-white hover:bg-white/10'
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </button>
                )}
              </nav>
            )}
          </div>

          {/* Right side: Auth or User */}
          <div className="flex items-center space-x-4">
            {!currentUser ? (
              <>
                <button
                  onClick={onSignup}
                  className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium border-2 border-transparent hover:bg-gradient-to-r from-orange-500 to-pink-500 hover:text-white transition-all"
                >
                  Sign Up
                </button>
                <button
                  onClick={onLogin}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-orange-600 hover:to-pink-600 transition-all"
                >
                  Login
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <User className="h-6 w-6 text-gray-200" />
                <span className="text-sm font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">{currentUser.name}</span>
                {currentUser.isArtist && (
                  <span className="ml-2 px-2 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs rounded-full">
                    Artist
                  </span>
                )}
                <button
                    onClick={onLogout}
                    className="flex items-center px-3 py-2 text-sm text-white border-2 border-pink-500 rounded-md 
                              bg-gradient-to-r from-pink-500 via-orange-400 to-blue-500 
                              hover:from-pink-400 hover:via-orange-300 hover:to-blue-400 
                              transition-all duration-300 shadow-md"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
