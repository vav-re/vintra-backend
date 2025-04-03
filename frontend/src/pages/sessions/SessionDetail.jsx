import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DimensionalRadar from '../../components/charts/DimensionalRadar';
import { sessionsApi } from '../../services/api';

const SessionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analise');
  
  useEffect(() => {
    const fetchSessionData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would call the API
        // const sessionResponse = await sessionsApi.getById(id);
        // const analysisResponse = await sessionsApi.getAnalysis(id);
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockSession = {
          id: id || '1',
          paciente_id: '1',
          paciente_nome: 'João Silva',
          data: '2024-05-06T10:00:00',
          queixa_principal: 'Dificuldade para dormir e ansiedade aumentada',
          medicacoes_atuais: ['Fluoxetina 20mg', 'Clonazepam 0.5mg'],
          notas: 'Paciente relata piora da ansiedade nas últimas duas semanas, coincidindo com aumento de responsabilidades no trabalho.',
          transcricao: `Terapeuta: Bom dia, João. Como você está se sentindo hoje?

João: Olá, doutor. Não estou muito bem, para ser sincero. As últimas semanas têm sido difíceis. Estou tendo problemas para dormir novamente.

Terapeuta: Sinto muito ouvir isso. Você consegue me contar mais sobre como está sendo sua experiência com o sono?

João: É frustrante. Deito na cama e fico rolando de um lado para o outro. Minha mente não para, fico pensando em mil coisas do trabalho, principalmente. Quando consigo dormir, acordo várias vezes durante a noite. De manhã, estou exausto.

Terapeuta: E você percebe algum padrão específico nos pensamentos que surgem quando está tentando dormir?

João: Principalmente preocupações com o novo projeto que estou liderando. É uma grande responsabilidade, e meu chefe aumentou muito as expectativas. Tenho medo de não conseguir entregar o que ele espera. Começo a pensar em tudo que pode dar errado.

Terapeuta: Entendo. E como você tem lidado com essas preocupações durante o dia?

João: Tento focar nas tarefas, mas é difícil. Minha concentração não está boa. Às vezes percebo que passei minutos olhando para a tela sem fazer nada, só preocupado. Tenho sentido aquela pressão no peito também, sabe? Aquela sensação de aperto que tive nos episódios de ansiedade anteriores.

Terapeuta: As técnicas de respiração que praticamos têm ajudado nesses momentos?

João: Às vezes sim... quando eu lembro de usar. O problema é que muitas vezes só percebo que estou ansioso quando já estou muito tenso. Aí parece que a respiração não funciona tão bem.`,
          analise: {
            v1: -2.5,
            v2: 7.0,
            v3: 3.0,
            v4: 8.0,
            v5: 6.0,
            v6: 5.0,
            v7: 4.0,
            v8: 7.0,
            v9_past: 3.0,
            v9_present: 8.0,
            v9_future: 7.0,
            v10: 4.0,
            sintese_narrativa: "João apresenta um quadro de ansiedade significativa, com grande preocupação relacionada ao trabalho. Relata dificuldades para dormir, ruminações noturnas e sinais físicos de ansiedade como pressão no peito. Expressa apreensão sobre seu desempenho profissional e medo de não corresponder às expectativas. As técnicas de gerenciamento de ansiedade estão sendo aplicadas de forma irregular, com eficácia limitada. Demonstra consciência de seus sintomas, mas dificuldade em implementar estratégias preventivas.",
            formulacao_integrativa: "O quadro atual de João caracteriza-se por ansiedade generalizada com componentes somáticos, cognitivos e comportamentais significativos. Há uma clara conexão entre o aumento das responsabilidades profissionais e a intensificação dos sintomas ansiosos, sugerindo uma vulnerabilidade anterior potencializada pelo estressor atual. A insônia reativa está agravando o quadro, criando um ciclo de retroalimentação negativa onde a ansiedade prejudica o sono e a privação de sono intensifica a ansiedade. O paciente demonstra insight sobre sua condição, mas apresenta dificuldades na autorregulação emocional nos momentos críticos.",
            recomendacoes: [
              "Revisão da medicação ansiolítica, considerando ajuste temporário de dose",
              "Intensificação da prática de técnicas de atenção plena (mindfulness) com ênfase na consciência precoce dos sinais de ansiedade",
              "Estabelecimento de rotina de sono mais estruturada, com ritual de preparação para o sono",
              "Introdução de técnica de preocupação programada para reduzir ruminações noturnas",
              "Treinamento em autocompaixão para reduzir autocrítica relacionada ao desempenho profissional"
            ]
          }
        };
        
        setSession(mockSession);
      } catch (error) {
        console.error('Error fetching session data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchSessionData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vintra-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Sessão não encontrada.</p>
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

  const sessionDate = new Date(session.data);
  const formattedDate = sessionDate.toLocaleDateString('pt-BR');
  const formattedTime = sessionDate.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="p-6">
      {/* Back button */}
      <div className="mb-6">
        <Link to={`/patients/${session.paciente_id}`} className="flex items-center text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar ao Paciente
        </Link>
      </div>
      
      {/* Session header */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Sessão: {formattedDate}, {formattedTime}
            </h1>
            <div className="flex space-x-3">
              <button className="border border-vintra-primary text-vintra-primary px-4 py-2 rounded-lg hover:bg-vintra-primary hover:bg-opacity-5">
                Editar
              </button>
              <button className="bg-vintra-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
                Exportar
              </button>
            </div>
          </div>
          
          <div className="flex items-center text-lg text-gray-700 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{session.paciente_nome}</span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 uppercase font-medium mb-1">Queixa Principal</div>
            <div className="text-gray-700">{session.queixa_principal}</div>
          </div>
          
          {session.medicacoes_atuais && session.medicacoes_atuais.length > 0 && (
            <div className="mt-4">
              <div className="text-sm text-gray-500 uppercase font-medium mb-1">Medicações em Uso</div>
              <div className="flex flex-wrap gap-2">
                {session.medicacoes_atuais.map((med, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {med}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {session.notas && (
            <div className="mt-4">
              <div className="text-sm text-gray-500 uppercase font-medium mb-1">Notas</div>
              <div className="text-gray-700">{session.notas}</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['analise', 'transcricao', 'documentos'].map((tab) => (
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
      {activeTab === 'analise' && session.analise && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dimensional radar */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Perfil Dimensional</h2>
              <DimensionalRadar 
                data={session.analise} 
                height={350}
              />
            </div>
            
            {/* Analysis summary */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Síntese Narrativa</h2>
                <p className="text-gray-700">{session.analise.sintese_narrativa}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Formulação Integrativa</h2>
                <p className="text-gray-700">{session.analise.formulacao_integrativa}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recomendações</h2>
                <ul className="list-disc list-inside space-y-2">
                  {session.analise.recomendacoes.map((rec, index) => (
                    <li key={index} className="text-gray-700">{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'transcricao' && session.transcricao && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Transcrição da Sessão</h2>
          <div className="whitespace-pre-line text-gray-700">
            {session.transcricao}
          </div>
        </div>
      )}
      
      {activeTab === 'documentos' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Documentos Gerados</h2>
          <p className="text-gray-500 text-center">Funcionalidade em desenvolvimento.</p>
        </div>
      )}
    </div>
  );
};

export default SessionDetail;