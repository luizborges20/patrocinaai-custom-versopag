'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Palette,
  LayoutGrid as LayoutGridIcon,
  Settings as SettingsIcon,
  Save,
  Eye,
  Upload
} from 'lucide-react';

type TabType = 'basico' | 'design' | 'layout' | 'avancado';

export default function CriarPainelPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('basico');

  const [formData, setFormData] = useState({
    nomeEvento: '',
    descricao: '',
    logoUrl: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
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

  const tabs = [
    { id: 'basico' as TabType, label: 'Básico', icon: Sparkles },
    { id: 'design' as TabType, label: 'Design', icon: Palette },
    { id: 'layout' as TabType, label: 'Layout', icon: LayoutGridIcon },
    { id: 'avancado' as TabType, label: 'Avançado', icon: SettingsIcon },
  ];

  const handleSave = () => {
    console.log('Salvando configuração:', formData);
    // TODO: Implementar salvamento
  };

  const handlePreview = () => {
    console.log('Abrindo preview');
    // TODO: Implementar preview
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Painel de Configuração */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Personalizar Painel
              </h1>
              <p className="text-gray-600">
                Configure seu painel e veja as mudanças em tempo real
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-gray-900 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Conteúdo das Tabs */}
            <div className="space-y-6">
              {activeTab === 'basico' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Nome do Evento
                    </label>
                    <input
                      type="text"
                      value={formData.nomeEvento}
                      onChange={(e) => setFormData({ ...formData, nomeEvento: e.target.value })}
                      placeholder="Meu Evento 2025"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--versopag-primary)] focus:border-transparent transition-all"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Este nome aparecerá no topo do painel
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Descrição
                    </label>
                    <textarea
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      placeholder="Descrição do evento"
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--versopag-primary)] focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Logo do Evento (URL)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                        placeholder="https://exemplo.com/logo.png"
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--versopag-primary)] focus:border-transparent transition-all"
                      />
                      <Button
                        variant="outline"
                        className="px-4 py-3 border-gray-200"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'design' && (
                <div className="text-center py-12">
                  <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Opções de design em breve...
                  </p>
                </div>
              )}

              {activeTab === 'layout' && (
                <div className="text-center py-12">
                  <LayoutGridIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Opções de layout em breve...
                  </p>
                </div>
              )}

              {activeTab === 'avancado' && (
                <div className="text-center py-12">
                  <SettingsIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Opções avançadas em breve...
                  </p>
                </div>
              )}
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button
                onClick={handleSave}
                className="flex-1 bg-gray-900 text-white hover:bg-gray-800 py-6"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Configuração
              </Button>
              <Button
                onClick={handlePreview}
                variant="outline"
                className="px-8 py-6 border-gray-200"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Preview
              </h2>

              <div className="bg-black rounded-xl overflow-hidden aspect-[16/9] flex flex-col justify-between">
                {/* Header do Painel */}
                <div className="bg-black p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {formData.logoUrl ? (
                      <img
                        src={formData.logoUrl}
                        alt="Logo"
                        className="h-12 w-12 object-contain"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-800 rounded-full" />
                    )}
                  </div>

                  <div className="text-center flex-1">
                    <div className="text-yellow-400 text-xs mb-1">APOIADOR</div>
                    <div className="text-yellow-400 text-sm font-bold">
                      {formData.nomeEvento || 'NOME DO EVENTO'}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {formData.logoUrl ? (
                      <img
                        src={formData.logoUrl}
                        alt="Logo"
                        className="h-12 w-12 object-contain"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-800 rounded-full" />
                    )}
                  </div>
                </div>

                {/* Conteúdo do Painel */}
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="h-32 w-32 bg-gray-800 rounded-full mx-auto mb-4" />
                    <div className="text-white text-xl font-bold mb-2">
                      Nome do Apoiador
                    </div>
                    <div className="text-gray-400 text-sm">
                      @instagram • (00) 00000-0000
                    </div>
                  </div>
                </div>

                {/* Footer do Painel */}
                <div className="bg-black p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-white rounded" />
                    <span className="text-white text-xs">VersoPag</span>
                  </div>
                  <div className="text-yellow-400 text-xs">
                    DIVULGUE SUA MARCA • ESCANEIE O QR CODE
                  </div>
                  <div className="h-12 w-12 bg-white rounded" />
                </div>
              </div>

              {formData.descricao && (
                <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600">{formData.descricao}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
