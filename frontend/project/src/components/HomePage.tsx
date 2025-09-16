import React from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";

interface HomePageProps {
  currentUser: any;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
  onNavigate: (view: "home" | "dashboard") => void;
  currentView: "home" | "dashboard";
}

export function HomePage({
  currentUser,
  onLogin,
  onSignup,
  onLogout,
  onNavigate,
  currentView,
}: HomePageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header
        currentUser={currentUser}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        onNavigate={onNavigate}
        currentView={currentView}
      />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="bg-gray-50 py-16 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            About ArtisanHub
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            ArtisanHub is a digital marketplace and creative hub where artists
            and craft enthusiasts can showcase their talent, sell unique
            artworks, and connect with a community that values creativity. 
            <br /><br />
            Artists can upload their creations to their personal dashboards, and
            buyers can explore stunning pieces on the marketplace. Even when
            artists can’t post, our AI generates reels and engaging content to
            keep their work alive and thriving.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <p>© {new Date().getFullYear()} ArtisanHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
