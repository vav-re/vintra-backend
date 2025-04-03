import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import VintraLogo from '../ui/VintraLogo';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const navItems = [
    { id: 'home', label: 'Início', path: '/', icon: 'user-icon' },
    { id: 'patients', label: 'Pacientes', path: '/patients', icon: 'users-icon' },
    { id: 'evolution', label: 'Evolução', path: '/evolution', icon: 'chart-icon' },
    { id: 'notes', label: 'Notas', path: '/notes', icon: 'notes-icon' },
  ];

  const recentPatients = [
    { id: 1, name: 'João Silva', age: 48, gender: 'Masculino', avatar: 'JS' },
    { id: 2, name: 'Maria Oliveira', age: 35, gender: 'Feminino', avatar: 'MO' },
    { id: 3, name: 'Pedro Santos', age: 42, gender: 'Masculino', avatar: 'PS' },
    { id: 4, name: 'Carla Mendes', age: 29, gender: 'Feminino', avatar: 'CM' },
    { id: 5, name: 'Ricardo Alves', age: 51, gender: 'Masculino', avatar: 'RA' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 min-h-screen bg-vintra-dark text-white flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center border-b border-gray-800">
        <VintraLogo />
        <span className="ml-2 text-2xl font-bold">VINTRA</span>
      </div>
      
      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map(item => (
          <Link 
            key={item.id}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg ${
              isActive(item.path) 
                ? 'bg-white/10 text-white' 
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <span className="mr-3 w-6 h-6 flex items-center justify-center text-gray-400">
              {item.id === 'home' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
              {item.id === 'patients' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
              {item.id === 'evolution' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              )}
              {item.id === 'notes' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              )}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      {/* Recent Patients */}
      <div className="flex-grow overflow-auto mt-4 border-t border-gray-800 pt-4">
        <h3 className="px-6 text-sm text-gray-400 uppercase mb-2">Pacientes recentes</h3>
        {recentPatients.map(patient => (
          <Link 
            key={patient.id}
            to={`/patients/${patient.id}`}
            className="flex items-center px-4 py-3 hover:bg-white/5"
          >
            <div className="w-10 h-10 rounded-full bg-vintra-primary flex items-center justify-center text-white mr-3">
              {patient.avatar}
            </div>
            <div>
              <div className="font-medium">{patient.name}</div>
              <div className="text-sm text-gray-400">{patient.age} anos, {patient.gender}</div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={logout}
          className="flex items-center px-4 py-2 w-full text-left text-gray-300 hover:bg-white/5 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;