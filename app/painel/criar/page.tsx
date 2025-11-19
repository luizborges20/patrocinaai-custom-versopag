'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  FieldLabel,
  FieldDescription,
} from '@/components/ui/field';
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
  exibirCabecalho: boolean;
  exibirRodape: boolean;

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
    fonteTitulo: 'Poppins',
    fonteCorpo: 'Poppins',

    // Layout
    orientacao: 'horizontal',
    posicaoLogoEvento: 'laterais',
    quantidadeLogosExibicao: 1,
    espacamentoLogos: 20,
    margens: 40,
    exibirCabecalho: true,
    exibirRodape: true,

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

  // Carregar fontes do Google Fonts dinamicamente
  useEffect(() => {
    const loadFont = (fontName: string) => {
      const linkId = `font-${fontName.replace(/\s+/g, '-')}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@400;500;600;700&display=swap`;
        document.head.appendChild(link);
      }
    };

    loadFont(config.fonteTitulo);
    loadFont(config.fonteCorpo);
  }, [config.fonteTitulo, config.fonteCorpo]);

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
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 pl-1">
              {/* ABA BÁSICO */}
              {activeTab === 'basico' && (
                <>
                  <Field>
                    <FieldLabel htmlFor="nome-evento">Nome do Evento</FieldLabel>
                    <Input
                      id="nome-evento"
                      type="text"
                      value={config.nomeEvento}
                      onChange={(e) => updateConfig({ nomeEvento: e.target.value })}
                      placeholder="Meu Evento 2025"
                    />
                    <FieldDescription>
                      Este nome aparecerá no topo do painel
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="descricao">Descrição</FieldLabel>
                    <Textarea
                      id="descricao"
                      value={config.descricao}
                      onChange={(e) => updateConfig({ descricao: e.target.value })}
                      placeholder="Descrição do evento"
                      rows={3}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="logo-evento">Logo do Evento (URL)</FieldLabel>
                    <div className="flex gap-2">
                      <Input
                        id="logo-evento"
                        type="text"
                        value={config.logoEventoUrl}
                        onChange={(e) => updateConfig({ logoEventoUrl: e.target.value })}
                        placeholder="https://exemplo.com/logo.png"
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        className="px-4 py-3 border-gray-200"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="logo-patrocinador">
                      Logo Patrocinador Exemplo (URL)
                    </FieldLabel>
                    <div className="flex gap-2">
                      <Input
                        id="logo-patrocinador"
                        type="text"
                        value={config.logoPatrocinadorUrl}
                        onChange={(e) => updateConfig({ logoPatrocinadorUrl: e.target.value })}
                        placeholder="https://exemplo.com/patrocinador.png"
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        className="px-4 py-3 border-gray-200"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    <FieldDescription>
                      Use para testar o preview com um logo de exemplo
                    </FieldDescription>
                  </Field>
                </>
              )}

              {/* ABA DESIGN */}
              {activeTab === 'design' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="cor-fundo">Cor de Fundo</FieldLabel>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.corFundo}
                          onChange={(e) => updateConfig({ corFundo: e.target.value })}
                          className="h-9 w-12 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <Input
                          id="cor-fundo"
                          type="text"
                          value={config.corFundo}
                          onChange={(e) => updateConfig({ corFundo: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="cor-texto">Cor do Texto</FieldLabel>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.corTexto}
                          onChange={(e) => updateConfig({ corTexto: e.target.value })}
                          className="h-9 w-12 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <Input
                          id="cor-texto"
                          type="text"
                          value={config.corTexto}
                          onChange={(e) => updateConfig({ corTexto: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="cor-destaque">Cor de Destaque</FieldLabel>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.corDestaque}
                          onChange={(e) => updateConfig({ corDestaque: e.target.value })}
                          className="h-9 w-12 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <Input
                          id="cor-destaque"
                          type="text"
                          value={config.corDestaque}
                          onChange={(e) => updateConfig({ corDestaque: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="cor-secundaria">Cor Secundária</FieldLabel>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.corSecundaria}
                          onChange={(e) => updateConfig({ corSecundaria: e.target.value })}
                          className="h-9 w-12 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <Input
                          id="cor-secundaria"
                          type="text"
                          value={config.corSecundaria}
                          onChange={(e) => updateConfig({ corSecundaria: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="fonte-titulo">Fonte do Título</FieldLabel>
                    <select
                      id="fonte-titulo"
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
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="fonte-corpo">Fonte do Corpo</FieldLabel>
                    <select
                      id="fonte-corpo"
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
                  </Field>
                </>
              )}

              {/* ABA LAYOUT */}
              {activeTab === 'layout' && (
                <>
                  <Field>
                    <FieldLabel>Orientação da Página</FieldLabel>
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
                  </Field>

                  <Field>
                    <FieldLabel>Posição do Logo do Evento</FieldLabel>
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
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="quantidade-logos">
                      Quantidade de Logos por Apresentação
                    </FieldLabel>
                    <div className="flex items-center gap-4">
                      <input
                        id="quantidade-logos"
                        type="range"
                        min="1"
                        max="2"
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
                    <FieldDescription>
                      Quantos patrocinadores aparecem ao mesmo tempo
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="espacamento-logos">
                      Espaçamento entre Logos (px)
                    </FieldLabel>
                    <div className="flex items-center gap-4">
                      <input
                        id="espacamento-logos"
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
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="margens">Margens (px)</FieldLabel>
                    <div className="flex items-center gap-4">
                      <input
                        id="margens"
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
                  </Field>

                  <Field>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Exibir Cabeçalho
                        </div>
                        <div className="text-xs text-gray-500">
                          Mostrar cabeçalho com logos e nome do evento
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.exibirCabecalho}
                          onChange={(e) => updateConfig({ exibirCabecalho: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--versopag-primary)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                    </div>
                  </Field>

                  <Field>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Exibir Rodapé
                        </div>
                        <div className="text-xs text-gray-500">
                          Mostrar rodapé com logo VersoPag e QR Code
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.exibirRodape}
                          onChange={(e) => updateConfig({ exibirRodape: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--versopag-primary)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                    </div>
                  </Field>
                </>
              )}

              {/* ABA AVANÇADO */}
              {activeTab === 'avancado' && (
                <>
                  <Field>
                    <FieldLabel htmlFor="tempo-exibicao">
                      Tempo de Exibição por Slide (segundos)
                    </FieldLabel>
                    <div className="flex items-center gap-4">
                      <input
                        id="tempo-exibicao"
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
                  </Field>

                  <Field>
                    <FieldLabel>Tipo de Animação</FieldLabel>
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
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="velocidade-animacao">
                      Velocidade da Animação
                    </FieldLabel>
                    <div className="flex items-center gap-4">
                      <input
                        id="velocidade-animacao"
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
                  </Field>

                  <Field>
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
                  </Field>

                  {config.exibirQRCode && (
                    <Field>
                      <FieldLabel htmlFor="texto-qrcode">Texto do QR Code</FieldLabel>
                      <Input
                        id="texto-qrcode"
                        type="text"
                        value={config.textoQRCode}
                        onChange={(e) => updateConfig({ textoQRCode: e.target.value })}
                      />
                    </Field>
                  )}

                  <Field>
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
                  </Field>
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
                  {config.exibirCabecalho && (
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
                  )}

                  {/* Conteúdo do Painel - Grid de Logos */}
                  <div
                    className={`flex-none overflow-hidden flex items-center justify-center grid ${
                      config.quantidadeLogosExibicao === 1
                        ? 'grid-cols-1'
                        : config.quantidadeLogosExibicao <= 4
                        ? 'grid-cols-2'
                        : 'grid-cols-3'
                    }`}
                    style={{
                      gap: `${Math.max(config.espacamentoLogos / (config.quantidadeLogosExibicao > 6 ? 3 : config.quantidadeLogosExibicao > 3 ? 2 : 1), 12)}px`,
                      padding: '1.5rem 1rem'
                    }}
                  >
                    {Array.from({ length: config.quantidadeLogosExibicao }).map(
                      (_, index) => {
                        // Ajustar tamanho dos logos dinamicamente baseado na quantidade
                        let logoSize, fontSize, marginBottom, hideRedesSociais = false;

                        if (config.quantidadeLogosExibicao === 1) {
                          logoSize = 'h-28 w-28';
                          fontSize = 'text-base';
                          marginBottom = 'mb-2';
                        } else if (config.quantidadeLogosExibicao === 2) {
                          logoSize = 'h-24 w-24';
                          fontSize = 'text-sm';
                          marginBottom = 'mb-2';
                        } else if (config.quantidadeLogosExibicao <= 4) {
                          logoSize = 'h-20 w-20';
                          fontSize = 'text-sm';
                          marginBottom = 'mb-1.5';
                        } else if (config.quantidadeLogosExibicao <= 6) {
                          logoSize = 'h-16 w-16';
                          fontSize = 'text-xs';
                          marginBottom = 'mb-1';
                        } else if (config.quantidadeLogosExibicao <= 8) {
                          logoSize = 'h-12 w-12';
                          fontSize = 'text-xs';
                          marginBottom = 'mb-1';
                          hideRedesSociais = true;
                        } else {
                          // 9 logos - tamanho ainda menor
                          logoSize = 'h-10 w-10';
                          fontSize = 'text-xs';
                          marginBottom = 'mb-0.5';
                          hideRedesSociais = true;
                        }

                        return (
                          <div key={index} className="text-center flex flex-col items-center justify-center">
                            {config.logoPatrocinadorUrl ? (
                              <img
                                src={config.logoPatrocinadorUrl}
                                alt={`Patrocinador ${index + 1}`}
                                className={`${logoSize} mx-auto object-contain ${marginBottom}`}
                              />
                            ) : (
                              <div
                                className={`${logoSize} rounded-full mx-auto ${marginBottom}`}
                                style={{ backgroundColor: config.corSecundaria }}
                              />
                            )}
                            <div
                              className={`${fontSize} font-bold ${config.exibirRedesSociais && !hideRedesSociais ? 'mb-0.5' : ''}`}
                              style={{ color: config.corTexto }}
                            >
                              Patrocinador {index + 1}
                            </div>
                            {config.exibirRedesSociais && !hideRedesSociais && (
                              <div
                                className="text-xs leading-tight"
                                style={{ color: config.corTexto, opacity: 0.7 }}
                              >
                                @instagram • (00) 0000-0000
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* Footer do Painel */}
                  {config.exibirRodape && config.exibirQRCode && (
                    <div className="flex items-center justify-between flex-shrink-0">
                      {/* Logo VersoPag - Esquerda */}
                      <div className="flex items-center gap-2">
                        <div
                          className="h-6 w-6 rounded"
                          style={{ backgroundColor: config.corTexto }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: config.corTexto, fontFamily: config.fonteCorpo }}
                        >
                          VersoPag
                        </span>
                      </div>

                      {/* Texto + QR Code - Direita */}
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col text-right">
                          <div
                            className="text-base font-bold"
                            style={{ color: config.corDestaque, fontFamily: config.fonteTitulo }}
                          >
                            DIVULGUE SUA MARCA
                          </div>
                          <div
                            className="text-sm"
                            style={{ color: config.corTexto, fontFamily: config.fonteCorpo }}
                          >
                            ESCANEIE O QR CODE
                          </div>
                        </div>
                        <div
                          className="h-16 w-16 rounded bg-white flex items-center justify-center"
                        >
                          <div
                            className="h-14 w-14 rounded"
                            style={{ backgroundColor: config.corTexto }}
                          />
                        </div>
                      </div>
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
