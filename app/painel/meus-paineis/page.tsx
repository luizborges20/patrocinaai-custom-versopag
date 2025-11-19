'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye,
  QrCode as QrCodeIcon,
  Search,
  SortAsc,
} from 'lucide-react';

export default function MeusPaineisPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [paineis, setPaineis] = useState<any[]>([]);
  const [menuAberto, setMenuAberto] = useState<string | null>(null);
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState<'recente' | 'antigo' | 'nome'>('recente');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }

    // Carregar painéis do localStorage
    if (typeof window !== 'undefined') {
      const paineisSalvos = JSON.parse(localStorage.getItem('paineisSalvos') || '[]');
      setPaineis(paineisSalvos);
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-900 text-lg">Carregando...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleNovoPainel = () => {
    router.push('/painel/criar');
  };

  const handleEditarPainel = (id: string) => {
    router.push(`/painel/editar/${id}`);
    setMenuAberto(null);
  };

  const handleDuplicarPainel = (id: string) => {
    const painelOriginal = paineis.find((p) => p.id === id);

    if (painelOriginal) {
      const painelDuplicado = {
        ...painelOriginal,
        id: Date.now().toString(),
        nomeEvento: `${painelOriginal.nomeEvento} (Cópia)`,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      };

      const novosPaineis = [...paineis, painelDuplicado];
      setPaineis(novosPaineis);
      localStorage.setItem('paineisSalvos', JSON.stringify(novosPaineis));
    }

    setMenuAberto(null);
  };

  const handleExcluirPainel = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este painel?')) {
      const novosPaineis = paineis.filter((p) => p.id !== id);
      setPaineis(novosPaineis);
      localStorage.setItem('paineisSalvos', JSON.stringify(novosPaineis));
      setMenuAberto(null);
    }
  };

  const handleVisualizarPainel = (id: string) => {
    router.push(`/painel/visualizar/${id}`);
    setMenuAberto(null);
  };

  // Filtrar e ordenar painéis
  const paineisFiltrados = paineis
    .filter((painel) => {
      if (!busca) return true;
      const buscaLower = busca.toLowerCase();
      return (
        painel.nomeEvento?.toLowerCase().includes(buscaLower) ||
        painel.descricao?.toLowerCase().includes(buscaLower)
      );
    })
    .sort((a, b) => {
      if (ordenacao === 'recente') {
        return new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime();
      } else if (ordenacao === 'antigo') {
        return new Date(a.criadoEm).getTime() - new Date(b.criadoEm).getTime();
      } else {
        // ordenação por nome
        return (a.nomeEvento || '').localeCompare(b.nomeEvento || '');
      }
    });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Meus Painéis
            </h1>
            <p className="text-gray-600">
              Gerencie todos os seus painéis de patrocínio
            </p>
          </div>
          <Button
            onClick={handleNovoPainel}
            className="bg-[var(--versopag-secondary)] text-white hover:bg-[var(--versopag-secondary)]/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Painel
          </Button>
        </div>

        {/* Busca e Filtros */}
        {paineis.length > 0 && (
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            {/* Campo de busca */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou descrição..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--versopag-primary)] focus:border-transparent transition-all"
              />
            </div>

            {/* Ordenação */}
            <div className="flex items-center gap-2">
              <SortAsc className="h-5 w-5 text-gray-500" />
              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value as 'recente' | 'antigo' | 'nome')}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--versopag-primary)] focus:border-transparent transition-all bg-white"
              >
                <option value="recente">Mais recentes</option>
                <option value="antigo">Mais antigos</option>
                <option value="nome">Nome (A-Z)</option>
              </select>
            </div>
          </div>
        )}

        {/* Lista de Painéis */}
        {paineis.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <QrCodeIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum painel criado
            </h3>
            <p className="text-gray-600 mb-6">
              Crie seu primeiro painel para começar a receber patrocinadores
            </p>
            <Button
              onClick={handleNovoPainel}
              className="bg-[var(--versopag-secondary)] text-white hover:bg-[var(--versopag-secondary)]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Painel
            </Button>
          </div>
        ) : paineisFiltrados.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum painel encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou termos de busca
            </p>
            <Button
              onClick={() => setBusca('')}
              variant="outline"
              className="border-gray-200"
            >
              Limpar busca
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paineisFiltrados.map((painel) => (
              <div
                key={painel.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow relative group"
              >
                {/* Menu de Ações */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() =>
                      setMenuAberto(menuAberto === painel.id ? null : painel.id)
                    }
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>

                  {menuAberto === painel.id && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setMenuAberto(null)}
                      />
                      <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <button
                          onClick={() => handleEditarPainel(painel.id)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                          Editar
                        </button>
                        <button
                          onClick={() => handleVisualizarPainel(painel.id)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          Visualizar
                        </button>
                        <button
                          onClick={() => handleDuplicarPainel(painel.id)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                          Duplicar
                        </button>
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={() => handleExcluirPainel(painel.id)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          Excluir
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Preview do Painel */}
                <div
                  className="rounded-lg h-40 mb-4 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: painel.corFundo || '#000000' }}
                >
                  {painel.logoEventoUrl ? (
                    <img
                      src={painel.logoEventoUrl}
                      alt={painel.nomeEvento}
                      className="h-20 w-20 object-contain"
                    />
                  ) : (
                    <QrCodeIcon className="h-12 w-12" style={{ color: painel.corTexto || '#FFFFFF', opacity: 0.3 }} />
                  )}
                </div>

                {/* Informações */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {painel.nomeEvento || 'Painel sem nome'}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {painel.descricao || 'Sem descrição'}
                </p>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Ativo
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(painel.criadoEm).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                {/* Botão de Ação Rápida */}
                <Button
                  onClick={() => handleEditarPainel(painel.id)}
                  variant="outline"
                  className="w-full mt-4 border-gray-200"
                >
                  Editar Painel
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
