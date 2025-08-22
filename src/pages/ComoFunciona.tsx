import React from 'react';

const EmoTeenHowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-green-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Cada dia de inação pesa na vida dos seus alunos
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Ansiedade, estresse e sofrimento silencioso estão aumentando dentro das escolas. A EmoTeen é a ponte entre o problema e a solução, oferecendo suporte psicológico profissional antes que seja tarde demais.
        </p>
        <a
          href="#start"
          className="inline-block bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300 animate-pulse"
        >
          Não espere — inicie agora a avaliação e proteja seus alunos
        </a>
      </section>

      {/* Passos */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        {/* Passo 1 – Identificação Segura */}
        <div className="mb-12 flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-6">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Passo 1 – Identificação Segura</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>O aluno acessa com código da escola + nome + série.</li>
              <li>Totalmente seguro e confidencial — ninguém fora da escola terá acesso.</li>
              <li>
                <strong>Mensagem de impacto:</strong> Cada dado protegido é uma vida emocional que você começa a salvar.
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-blue-800 p-6 rounded-lg text-center">
              <svg
                className="w-16 h-16 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c0-2.76 2.24-5 5-5s5 2.24 5 5v5h-5m-5-10C9.24 6 7 8.24 7 11v5H2v-5c0-2.76 2.24-5 5-5z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Passo 2 – Triagem Emocional */}
        <div className="mb-12 flex flex-col md:flex-row-reverse items-center bg-white rounded-lg shadow-md p-6">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Passo 2 – Triagem Emocional</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>35 perguntas baseadas em evidência científica identificam sinais de sofrimento emocional antes que se tornem crises.</li>
              <li>
                <strong>Mensagem de impacto:</strong> Ignorar esses sinais pode custar o rendimento escolar e o bem-estar dos alunos.
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <span className="inline-block bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">Baixo</span>
              <span className="inline-block bg-yellow-500 text-white text-sm font-semibold px-3 py-1 rounded-full animate-pulse">Médio</span>
              <span className="inline-block bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full animate-pulse">Alto</span>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-yellow-100 p-6 rounded-lg text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Passo 3 – Resultado Personalizado */}
        <div className="mb-12 flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-6">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Passo 3 – Resultado Personalizado</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Relatórios claros, objetivos e imediatos sobre o estado emocional de cada aluno.</li>
              <li>
                <strong>Mensagem de impacto:</strong> Você não precisa adivinhar — agora é possível agir com precisão e rapidez.
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-green-100 p-6 rounded-lg text-center">
              ```chartjs
              {
                type: 'pie',
                data: {
                  labels: ['Baixo Risco', 'Risco Moderado', 'Risco Alto'],
                  datasets: [{
                    data: [60, 30, 10],
                    backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
                    borderColor: ['#064E3B', '#B45309', '#991B1B'],
                    borderWidth: 1
                  }]
                },
                options: {
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: '#1F2937'
                      }
                    }
                  }
                }
              }
              ```
            </div>
          </div>
        </div>

        {/* Passo 4 – Apoio Profissional */}
        <div className="mb-12 flex flex-col md:flex-row-reverse items-center bg-white rounded-lg shadow-md p-6">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Passo 4 – Apoio Profissional</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>A EmoTeen identifica quando um aluno precisa de psicólogo ou terapeuta e permite encaminhamento imediato.</li>
              <li>
                <strong>Mensagem de impacto:</strong> Cada dia sem ação é mais um aluno sofrendo em silêncio.
              </li>
            </ul>
            <a
              href="#refer"
              className="mt-4 inline-block bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 animate-pulse"
            >
              Encaminhar Agora
            </a>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-red-100 p-6 rounded-lg text-center">
              <svg
                className="w-16 h-16 mx-auto text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5H0"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Mensagem Final */}
      <section className="bg-red-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Não ignore o sofrimento dos seus alunos</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          A EmoTeen transforma dados em ação. Cada minuto de inação aumenta o risco de problemas emocionais sérios. Com baixo esforço e alta eficácia, sua escola pode oferecer suporte real e imediato.
        </p>
        <a
          href="#schedule"
          className="inline-block bg-white text-red-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition duration-300 animate-pulse text-lg"
        >
          Agende agora a implementação da EmoTeen
        </a>
        <p className="mt-4 text-lg font-semibold">Não espere — a hora de proteger seus alunos é hoje.</p>
      </section>
    </div>
  );
};

export default EmoTeenHowItWorks;
