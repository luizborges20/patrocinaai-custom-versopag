'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Palette,
  LayoutGrid as LayoutGridIcon,
  Settings as SettingsIcon,
  Save,
  Eye,
  Upload,
  Monitor,
  Smartphone,
} from 'lucide-react';

type TabType = 'basico' | 'design' | 'layout' | 'avancado';
type Orientacao = 'horizontal' | 'vertical';
type PosicaoLogo = 'topo' | 'laterais' | 'cantos' | 'centro';
type AnimacaoTipo = 'fade' | 'slide' | 'zoom' | 'none';

interface ConfiguracaoPainel {
  // Básico
  nomeEvento: string;
  descricao: string;
  logoEventoUrl: string;
  logoPatrocinadorUrl: string;

  // Design
  corFundo: string;
  corTexto: string;
  corDestaque: string;
  corSecundaria: string;
  fonteTitulo: string;
  fonteCorpo: string;

  // Layout
  orientacao: Orientacao;
  posicaoLogoEvento: PosicaoLogo;
  quantidadeLogosExibicao: number;
  espacamentoLogos: number;
  margens: number;

  // Avançado
  tempoExibicao: number;
  animacao: AnimacaoTipo;
  velocidadeAnimacao: number;
  exibirQRCode: boolean;
  textoQRCode: string;
  exibirRedesSociais: boolean;
}

export default function CriarPainelPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('basico');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const [config, setConfig] = useState<ConfiguracaoPainel>({
    // Básico
    nomeEvento: 'Meu Evento 2025',
    descricao: 'Descrição do evento',
    logoEventoUrl: '',
    logoPatrocinadorUrl: '',

    // Design
    corFundo: '#000000',
    corTexto: '#FFFFFF',
    corDestaque: '#FFD700',
    corSecundaria: '#2E2E2E',
    fonteTitulo: 'Inter',
    fonteCorpo: 'Inter',

    // Layout
    orientacao: 'horizontal',
    posicaoLogoEvento: 'laterais',
    quantidadeLogosExibicao: 1,
    espacamentoLogos: 20,
    margens: 40,

    // Avançado
    tempoExibicao: 5,
    animacao: 'fade',
    velocidadeAnimacao: 1,
    exibirQRCode: true,
    textoQRCode: 'DIVULGUE SUA MARCA • ESCANEIE O QR CODE',
    exibirRedesSociais: true,
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
    console.log('Salvando configuração:', config);
    // TODO: Implementar salvamento na API
  };

  const handlePreview = () => {
    console.log('Abrindo preview em tela cheia');
    // TODO: Implementar preview em tela cheia
  };

  const updateConfig = (updates: Partial<ConfiguracaoPainel>) => {
    setConfig({ ...config, ...updates });
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
            <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
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
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
              {/* ABA BÁSICO */}
              {activeTab === 'basico' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Nome do Evento
                    </label>
                    <input
                      type="text"
                      value={config.nomeEvento}
                      onChange={(e) => updateConfig({ nomeEvento: e.target.value })}
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
                      value={config.descricao}
                      onChange={(e) => updateConfig({ descricao: e.target.value })}
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
                        value={config.logoEventoUrl}
                        onChange={(e) => updateConfig({ logoEventoUrl: e.target.value })}
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

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Logo Patrocinador Exemplo (URL)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.logoPatrocinadorUrl}
                        onChange={(e) => updateConfig({ logoPatrocinadorUrl: e.target.value })}
                        placeholder="https://exemplo.com/patrocinador.png"
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
                    <p className="mt-1 text-sm text-gray-500">
                      Use para testar o preview com um logo de exemplo
                    </p>
                  </div>
                </>
              )}

              {/* ABA DESIGN */}
              {activeTab === 'design' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Cor de Fundo
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.corFundo}
                          onChange={(e) => updateConfig({ corFundo: e.target.value })}
                          className="h-12 w-12 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.corFundo}
                          onChange={(e) => updateConfig({ corFundo: e.target.value })}
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--versopag-primary)] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Cor do Texto
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.corTexto}
                          onChange={(e) => updateConfig({ corTexto: e.target.value })}
                          className="h-12 w-12 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.corTexto}
                          onChange={(e) => updateConfig({ corTexto: e.target.value })}
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--versopag-primary)] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Cor de Destaque
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.corDestaque}
                          onChange={(e) => updateConfig({ corDestaque: e.target.value })}
                          className="h-12 w-12 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.corDestaque}
                          onChange={(e) => updateConfig({ corDestaque: e.target.value })}
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--versopag-primary)] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Cor Secundária
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.corSecundaria}
                          onChange={(e) => updateConfig({ corSecundaria: e.target.value })}
                          className="h-12 w-12 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.corSecundaria}
                          onChange={(e) => updateConfig({ corSecundaria: e.target.value })}
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--versopag-primary)] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Fonte do Título
                    </label>
                    <select
                      value={config.fonteTitulo}
                      onChange={(e) => updateConfig({ fonteTitulo: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--versopag-primary)] focus:border-transparent transition-all"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Arial">Arial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Fonte do Corpo
                    </label>
                    <select
                      value={config.fonteCorpo}
                      onChange={(e) => updateConfig({ fonteCorpo: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--versopag-primary)] focus:border-transparent transition-all"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Arial">Arial</option>
                    </select>
                  </div>
                </>
              )}

              {/* ABA LAYOUT */}
              {activeTab === 'layout' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Orientação da Página
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => updateConfig({ orientacao: 'horizontal' })}
                        className={`p-4 border-2 rounded-xl transition-all ${
                          config.orientacao === 'horizontal'
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Monitor className="h-8 w-8 mx-auto mb-2 text-gray-700" />
                        <div className="text-sm font-medium text-gray-900">
                          Horizontal
                        </div>
                        <div className="text-xs text-gray-500">16:9 (Landscape)</div>
                      </button>
                      <button
                        onClick={() => updateConfig({ orientacao: 'vertical' })}
                        className={`p-4 border-2 rounded-xl transition-all ${
                          config.orientacao === 'vertical'
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Smartphone className="h-8 w-8 mx-auto mb-2 text-gray-700" />
                        <div className="text-sm font-medium text-gray-900">
                          Vertical
                        </div>
                        <div className="text-xs text-gray-500">9:16 (Portrait)</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Posição do Logo do Evento
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'topo' as PosicaoLogo, label: 'Topo' },
                        { value: 'laterais' as PosicaoLogo, label: 'Laterais' },
                        { value: 'cantos' as PosicaoLogo, label: 'Cantos' },
                        { value: 'centro' as PosicaoLogo, label: 'Centro' },
                      ].map((pos) => (
                        <button
                          key={pos.value}
                          onClick={() => updateConfig({ posicaoLogoEvento: pos.value })}
                          className={`px-4 py-3 border-2 rounded-xl text-sm font-medium transition-all ${
                            config.posicaoLogoEvento === pos.value
                              ? 'border-gray-900 bg-gray-50 text-gray-900'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {pos.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Quantidade de Logos por Apresentação
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="9"
                        value={config.quantidadeLogosExibicao}
                        onChange={(e) =>
                          updateConfig({ quantidadeLogosExibicao: parseInt(e.target.value) })
                        }
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold text-gray-900 w-12 text-center">
                        {config.quantidadeLogosExibicao}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Quantos patrocinadores aparecem ao mesmo tempo
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Espaçamento entre Logos (px)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={config.espacamentoLogos}
                        onChange={(e) =>
                          updateConfig({ espacamentoLogos: parseInt(e.target.value) })
                        }
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold text-gray-900 w-12 text-center">
                        {config.espacamentoLogos}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Margens (px)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={config.margens}
                        onChange={(e) =>
                          updateConfig({ margens: parseInt(e.target.value) })
                        }
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold text-gray-900 w-12 text-center">
                        {config.margens}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* ABA AVANÇADO */}
              {activeTab === 'avancado' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Tempo de Exibição por Slide (segundos)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={config.tempoExibicao}
                        onChange={(e) =>
                          updateConfig({ tempoExibicao: parseInt(e.target.value) })
                        }
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold text-gray-900 w-12 text-center">
                        {config.tempoExibicao}s
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Tipo de Animação
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'fade' as AnimacaoTipo, label: 'Fade' },
                        { value: 'slide' as AnimacaoTipo, label: 'Slide' },
                        { value: 'zoom' as AnimacaoTipo, label: 'Zoom' },
                        { value: 'none' as AnimacaoTipo, label: 'Sem animação' },
                      ].map((anim) => (
                        <button
                          key={anim.value}
                          onClick={() => updateConfig({ animacao: anim.value })}
                          className={`px-4 py-3 border-2 rounded-xl text-sm font-medium transition-all ${
                            config.animacao === anim.value
                              ? 'border-gray-900 bg-gray-50 text-gray-900'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {anim.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Velocidade da Animação
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.5"
                        value={config.velocidadeAnimacao}
                        onChange={(e) =>
                          updateConfig({ velocidadeAnimacao: parseFloat(e.target.value) })
                        }
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold text-gray-900 w-12 text-center">
                        {config.velocidadeAnimacao}x
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Exibir QR Code
                      </div>
                      <div className="text-xs text-gray-500">
                        Mostrar QR Code para participação
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.exibirQRCode}
                        onChange={(e) => updateConfig({ exibirQRCode: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--versopag-primary)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                    </label>
                  </div>

                  {config.exibirQRCode && (
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Texto do QR Code
                      </label>
                      <input
                        type="text"
                        value={config.textoQRCode}
                        onChange={(e) => updateConfig({ textoQRCode: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--versopag-primary)] focus:border-transparent transition-all"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Exibir Redes Sociais
                      </div>
                      <div className="text-xs text-gray-500">
                        Mostrar Instagram e telefone do patrocinador
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.exibirRedesSociais}
                        onChange={(e) =>
                          updateConfig({ exibirRedesSociais: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--versopag-primary)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                    </label>
                  </div>
                </>
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Preview</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-2 rounded-lg transition-colors ${
                      previewDevice === 'desktop'
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <Monitor className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-2 rounded-lg transition-colors ${
                      previewDevice === 'mobile'
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <Smartphone className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div
                className={`rounded-xl overflow-hidden ${
                  config.orientacao === 'horizontal'
                    ? 'aspect-[16/9]'
                    : 'aspect-[9/16] max-w-sm mx-auto'
                }`}
                style={{
                  backgroundColor: config.corFundo,
                  fontFamily: config.fonteCorpo,
                  padding: `${config.margens}px`,
                }}
              >
                <div className="h-full flex flex-col justify-between">
                  {/* Header do Painel */}
                  <div
                    className={`flex items-center ${
                      config.posicaoLogoEvento === 'topo'
                        ? 'justify-center'
                        : config.posicaoLogoEvento === 'laterais'
                        ? 'justify-between'
                        : config.posicaoLogoEvento === 'cantos'
                        ? 'justify-between'
                        : 'justify-center'
                    }`}
                    style={{ gap: `${config.espacamentoLogos}px` }}
                  >
                    {(config.posicaoLogoEvento === 'laterais' ||
                      config.posicaoLogoEvento === 'cantos') && (
                      <div className="flex items-center gap-4">
                        {config.logoEventoUrl ? (
                          <img
                            src={config.logoEventoUrl}
                            alt="Logo Evento"
                            className="h-12 w-12 object-contain"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gray-800 rounded-full" />
                        )}
                      </div>
                    )}

                    <div className="text-center flex-1">
                      <div
                        className="text-xs mb-1"
                        style={{
                          color: config.corDestaque,
                          fontFamily: config.fonteTitulo,
                        }}
                      >
                        APOIADOR
                      </div>
                      <div
                        className="text-sm font-bold"
                        style={{
                          color: config.corDestaque,
                          fontFamily: config.fonteTitulo,
                        }}
                      >
                        {config.nomeEvento}
                      </div>
                    </div>

                    {(config.posicaoLogoEvento === 'laterais' ||
                      config.posicaoLogoEvento === 'cantos') && (
                      <div className="flex items-center gap-4">
                        {config.logoEventoUrl ? (
                          <img
                            src={config.logoEventoUrl}
                            alt="Logo Evento"
                            className="h-12 w-12 object-contain"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gray-800 rounded-full" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Conteúdo do Painel - Grid de Logos */}
                  <div
                    className={`flex-1 flex items-center justify-center p-8 grid ${
                      config.quantidadeLogosExibicao === 1
                        ? 'grid-cols-1'
                        : config.quantidadeLogosExibicao <= 4
                        ? 'grid-cols-2'
                        : 'grid-cols-3'
                    }`}
                    style={{ gap: `${config.espacamentoLogos}px` }}
                  >
                    {Array.from({ length: config.quantidadeLogosExibicao }).map(
                      (_, index) => (
                        <div key={index} className="text-center">
                          {config.logoPatrocinadorUrl ? (
                            <img
                              src={config.logoPatrocinadorUrl}
                              alt={`Patrocinador ${index + 1}`}
                              className="h-24 w-24 mx-auto object-contain mb-3"
                            />
                          ) : (
                            <div
                              className="h-24 w-24 rounded-full mx-auto mb-3"
                              style={{ backgroundColor: config.corSecundaria }}
                            />
                          )}
                          <div
                            className="text-sm font-bold mb-1"
                            style={{ color: config.corTexto }}
                          >
                            Patrocinador {index + 1}
                          </div>
                          {config.exibirRedesSociais && (
                            <div
                              className="text-xs"
                              style={{ color: config.corTexto, opacity: 0.7 }}
                            >
                              @instagram • (00) 0000-0000
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  {/* Footer do Painel */}
                  {config.exibirQRCode && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-6 w-6 rounded"
                          style={{ backgroundColor: config.corTexto }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: config.corTexto }}
                        >
                          VersoPag
                        </span>
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: config.corDestaque }}
                      >
                        {config.textoQRCode}
                      </div>
                      <div
                        className="h-12 w-12 rounded"
                        style={{ backgroundColor: config.corTexto }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
