import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { sessionsApi, patientsApi } from '../../services/api';

const NewSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [queixaPrincipal, setQueixaPrincipal] = useState('');
  const [medicacoes, setMedicacoes] = useState('');
  const [notas, setNotas] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  
  // Audio recording
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  
  useEffect(() => {
    // Extract patientId from query params if it exists
    const params = new URLSearchParams(location.search);
    const patientId = params.get('patientId');
    
    if (patientId) {
      setSelectedPatient(patientId);
    }
    
    // Fetch patients list
    const fetchPatients = async () => {
      try {
        // In a real app, this would call the API
        // const response = await patientsApi.getAll();
        // setPatients(response.data);
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockPatients = [
          { id: '1', nome: 'João Silva' },
          { id: '2', nome: 'Maria Oliveira' },
          { id: '3', nome: 'Pedro Santos' },
          { id: '4', nome: 'Carla Mendes' },
          { id: '5', nome: 'Ricardo Alves' }
        ];
        
        setPatients(mockPatients);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setError('Erro ao carregar lista de pacientes');
      }
    };
    
    fetchPatients();
  }, [location.search]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
        setAudioFile(audioFile);
        
        // Clean up the audio stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Erro ao iniciar gravação. Verifique se o microfone está conectado e se você deu permissão para usá-lo.');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setAudioFile(files[0]);
    }
  };
  
  const handleTranscribe = async () => {
    if (!audioFile) {
      setError('Nenhum áudio selecionado para transcrição');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      // In a real app, this would call the API
      // const formData = new FormData();
      // formData.append('audio', audioFile);
      // const response = await sessionsApi.transcribe(formData);
      // setTranscription(response.data.transcription);
      
      // Mock transcription for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockTranscription = `Terapeuta: Bom dia, como você está se sentindo hoje?

Paciente: Não muito bem, para ser sincero. Tenho sentido muita ansiedade ultimamente, especialmente no trabalho.

Terapeuta: Pode me contar mais sobre essa ansiedade? Como ela se manifesta?

Paciente: É uma sensação constante de aperto no peito, sabe? Como se algo ruim estivesse prestes a acontecer. Às vezes tenho dificuldade para respirar, principalmente em reuniões importantes. E não estou conseguindo dormir direito também, fico dando voltas na cama pensando nos projetos e prazos.

Terapeuta: E quando começou a notar esses sintomas de forma mais intensa?

Paciente: Acho que nas últimas três semanas, quando assumi um novo projeto. Meu chefe colocou muita pressão, dizendo que é uma oportunidade de mostrar meu valor para a empresa. Mas estou me sentindo sobrecarregado, tem muita coisa para coordenar e pouco tempo.`;
      
      setTranscription(mockTranscription);
      setStep(3);
    } catch (error) {
      console.error('Error transcribing audio:', error);
      setError('Erro ao transcrever o áudio');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPatient) {
      setError('Selecione um paciente');
      return;
    }
    
    if (!queixaPrincipal) {
      setError('Informe a queixa principal');
      return;
    }
    
    if (!transcription) {
      setError('É necessário transcrever a sessão antes de concluir');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call the API
      // const sessionData = {
      //   paciente_id: selectedPatient,
      //   queixa_principal: queixaPrincipal,
      //   medicacoes_atuais: medicacoes.split(',').map(med => med.trim()).filter(med => med),
      //   notas,
      // };
      // const sessionResponse = await sessionsApi.create(sessionData);
      // const sessionId = sessionResponse.data.id;
      
      // const analysisData = new FormData();
      // analysisData.append('transcricao', transcription);
      // await sessionsApi.analyze(sessionId, analysisData);
      
      // navigate(`/sessions/${sessionId}`);
      
      // Mock for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate redirect to a random session ID
      navigate(`/sessions/123`);
    } catch (error) {
      console.error('Error creating session:', error);
      setError('Erro ao criar a sessão');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <Link to="/patients" className="flex items-center text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Nova Sessão</h1>
          
          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-vintra-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-vintra-primary' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-vintra-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-vintra-primary' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-vintra-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
            </div>
            <div className="flex justify-between mt-2 px-1">
              <div className="text-sm font-medium text-gray-700">Informações</div>
              <div className="text-sm font-medium text-gray-700">Gravação</div>
              <div className="text-sm font-medium text-gray-700">Finalização</div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Session Info */}
            {step === 1 && (
              <div>
                <div className="mb-6">
                  <label htmlFor="patient" className="block text-sm font-medium text-gray-700 mb-1">
                    Paciente
                  </label>
                  <select
                    id="patient"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-vintra-primary"
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    required
                  >
                    <option value="">Selecione um paciente</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.nome}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="queixa" className="block text-sm font-medium text-gray-700 mb-1">
                    Queixa Principal
                  </label>
                  <textarea
                    id="queixa"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-vintra-primary"
                    value={queixaPrincipal}
                    onChange={(e) => setQueixaPrincipal(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="medicacoes" className="block text-sm font-medium text-gray-700 mb-1">
                    Medicações em Uso (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    id="medicacoes"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-vintra-primary"
                    value={medicacoes}
                    onChange={(e) => setMedicacoes(e.target.value)}
                    placeholder="Ex: Fluoxetina 20mg, Clonazepam 0.5mg"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="notas" className="block text-sm font-medium text-gray-700 mb-1">
                    Notas Adicionais
                  </label>
                  <textarea
                    id="notas"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-vintra-primary"
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-vintra-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90"
                    onClick={() => {
                      if (!selectedPatient) {
                        setError('Selecione um paciente');
                        return;
                      }
                      if (!queixaPrincipal) {
                        setError('Informe a queixa principal');
                        return;
                      }
                      setError(null);
                      setStep(2);
                    }}
                  >
                    Próximo
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Audio Recording/Upload */}
            {step === 2 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Gravação da Sessão</h2>
                  <p className="text-gray-600 mb-4">
                    Grave o áudio da sessão ou faça upload de um arquivo de áudio existente.
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <div className="flex justify-center mb-4">
                      {isRecording ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-500 font-medium">Gravando</span>
                        </div>
                      ) : (
                        audioFile ? (
                          <div className="flex items-center text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Áudio pronto: {audioFile.name}</span>
                          </div>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        )
                      )}
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      {isRecording ? (
                        <button
                          type="button"
                          className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 flex items-center"
                          onClick={stopRecording}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                          </svg>
                          Parar Gravação
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="bg-vintra-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 flex items-center"
                          onClick={startRecording}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          Iniciar Gravação
                        </button>
                      )}
                      
                      <label className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Upload de Áudio
                        <input
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50"
                      onClick={() => setStep(1)}
                    >
                      Voltar
                    </button>
                    
                    <button
                      type="button"
                      className="bg-vintra-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!audioFile || isUploading}
                      onClick={handleTranscribe}
                    >
                      {isUploading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Transcrevendo...
                        </span>
                      ) : 'Transcrever Áudio'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Transcription and Completion */}
            {step === 3 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Transcrição da Sessão</h2>
                  <p className="text-gray-600 mb-4">
                    Revise a transcrição e faça as correções necessárias antes de finalizar.
                  </p>
                  
                  <textarea
                    rows={15}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-vintra-primary mb-4 font-mono text-sm"
                    value={transcription}
                    onChange={(e) => setTranscription(e.target.value)}
                  ></textarea>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50"
                      onClick={() => setStep(2)}
                    >
                      Voltar
                    </button>
                    
                    <button
                      type="submit"
                      className="bg-vintra-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analisando...
                        </span>
                      ) : 'Finalizar e Analisar'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSession;