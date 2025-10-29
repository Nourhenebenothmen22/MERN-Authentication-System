import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

function Navbar({ isAuthenticated, handleLogout }) {
  return (
    <nav className="flex items-center justify-between p-5 bg-white shadow-md border-b border-gray-200">
      {/* Logo et Titre */}
      <div className="flex items-center gap-4">
        <img 
          src={assets.logo} 
          alt="Logo" 
          className="w-30 sm:w-36"
        />
      </div>

      {/* Boutons */}
      <div className="flex gap-4">
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <img src={assets.arrow_icon} alt="" className="w-4 h-4 filter brightness-0 invert"/>
                <span className="font-medium">Se Connecter</span>
              </button>
            </Link>
            <Link to="/register">
              <button className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <span className="font-medium">S'inscrire</span>
              </button>
            </Link>
          </>
        ) : (
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Déconnexion</span>
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar