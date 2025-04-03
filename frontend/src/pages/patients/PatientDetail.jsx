import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { patientsApi, sessionsApi } from '../../services/api';

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sessoes');

  useEffect(() => {
    const fetchPatientData = async () => {
      setIsLoading(true);
      try {
        // In a real application, this would use the API service
        // const patientResponse = await patientsApi.getById(id);
        // const sessionsResponse = await sessionsApi.getByPatientId(id);
        
        // For now, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockPatient = {
          id: id || '1',
          nome: 'João Silva',
          data_nascimento: '1976-05-12',
          idade: 48,
          genero: 'Masculino',
          contato: {
            email: 'joao.silva@email.com',
            telefone: '41 69876-5432'
          }
        };
        
        const mockSessions = [
          {
            id: '1',
            date: '2024-05-06T10:00:00',
            queixa_principal: 'Dificuldade para dormir e ansiedade aumentada',
            condition: 'Ansiedade generalizada'
          },
          {
            id: '2',
            date: '2024-04-28T15:30:00',
            queixa_principal: 'Persistência de insônia, mas melhora da ansiedade diurna',
            condition: 'Insônia persistente'
          },
          {
            id: '3',
            date: '2024-04-15T09:45:00',
            queixa_principal: 'Pressão no trabalho causando ansiedade e problemas de sono',
            condition: 'Estresse ocupacional'
          },
          {
            id: '4',
            date: '2024-04-02T17:00:00',
            queixa_principal: 'Sensação constante de desânimo e falta de interesse',
            condition: 'Desânimo constante'
          }
        ];
        
        setPatient(mockPatient);
        setSessions(mockSessions);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPatientData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vintra-primary"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Paciente não encontrado.</p>
          <button
            onClick={() => navigate('/patients')}
            className="mt-4 text-vintra-primary hover:underline"
          >
            Voltar para lista de pacientes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Back button and header */}
      <div className="mb-6">
        <Link to="/patients" className="flex items-center text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar
        </Link>
      </div>
      
      {/* Patient profile header */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 flex items-center">
          <div className="h-24 w-24 rounded-full bg-vintra-primary flex items-center justify-center text-white text-3xl">
            {patient.nome.split(' ').map(name => name[0]).join('').slice(0, 2)}
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-gray-900">{patient.nome}</h1>
            <div className="text-lg text-gray-600 flex items-center">
              {patient.idade} anos • {patient.genero}
            </div>
            <div className="mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-gray-700">{patient.contato?.telefone}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-gray-700">{patient.contato?.email}</span>
            </div>
          </div>
          <div className="ml-auto">
            <button 
              className="bg-vintra-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              onClick={() => navigate(`/sessions/new?patientId=${patient.id}`)}
            >
              Nova Sessão
            </button>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['sessoes', 'evolucao', 'documentos', 'notas'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-vintra-primary text-vintra-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md capitalize`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab content */}
      {activeTab === 'sessoes' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sessões</h2>
          
          {sessions.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">Nenhuma sessão registrada.</p>
              <button
                onClick={() => navigate(`/sessions/new?patientId=${patient.id}`)}
                className="mt-4 text-vintra-primary hover:underline"
              >
                Criar primeira sessão
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => {
                const sessionDate = new Date(session.date);
                const formattedDate = sessionDate.toLocaleDateString('pt-BR');
                const formattedTime = sessionDate.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                });
                
                return (
                  <div key={session.id} className="bg-white rounded-lg shadow">
                    <div className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-3 h-3 rounded-full bg-vintra-primary mr-2"></div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {formattedDate}, {formattedTime}
                            </h3>
                          </div>
                          
                          <p className="text-gray-600">{session.queixa_principal}</p>
                          
                          {session.condition && (
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {session.condition}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-start">
                          <Link
                            to={`/sessions/${session.id}`}
                            className="text-vintra-primary hover:underline font-medium"
                          >
                            Ver Sessão
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'evolucao' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Evolução Dimensional</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-center">Visualização de evolução será implementada em breve.</p>
          </div>
        </div>
      )}
      
      {activeTab === 'documentos' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Documentos</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-center">Lista de documentos será implementada em breve.</p>
          </div>
        </div>
      )}
      
      {activeTab === 'notas' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notas</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-center">Sistema de notas será implementado em breve.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetail;