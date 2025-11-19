'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { X } from 'lucide-react';

type Orientacao = 'horizontal' | 'vertical';
type PosicaoLogo = 'topo' | 'laterais' | 'cantos' | 'centro';
type AnimacaoTipo = 'fade' | 'slide' | 'zoom' | 'none';

interface ConfiguracaoPainel {
  nomeEvento: string;
  descricao: string;
  logoEventoUrl: string;
  logoPatrocinadorUrl: string;
  corFundo: string;
  corTexto: string;
  corDestaque: string;
  corSecundaria: string;
  fonteTitulo: string;
  fonteCorpo: string;
  orientacao: Orientacao;
  posicaoLogoEvento: PosicaoLogo;
  quantidadeLogosExibicao: number;
  espacamentoLogos: number;
  margens: number;
  exibirCabecalho: boolean;
  exibirRodape: boolean;
  tempoExibicao: number;
  animacao: AnimacaoTipo;
  velocidadeAnimacao: number;
  exibirQRCode: boolean;
  textoQRCodePrincipal: string;
  textoQRCodeSecundario: string;
  exibirRedesSociais: boolean;
}

export default function VisualizarPainelPage() {
  const router = useRouter();
  const params = useParams();
  const painelId = params?.id as string;

  const [config, setConfig] = useState<ConfiguracaoPainel | null>(null);

  useEffect(() => {
    // Carregar painel específico do localStorage
    if (typeof window !== 'undefined' && painelId) {
      const paineisSalvos = JSON.parse(localStorage.getItem('paineisSalvos') || '[]');
      const painelExistente = paineisSalvos.find((p: any) => p.id === painelId);

      if (painelExistente) {
        setConfig(painelExistente);

        // Carregar fontes do Google Fonts dinamicamente
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

        loadFont(painelExistente.fonteTitulo);
        loadFont(painelExistente.fonteCorpo);
      } else {
        alert('Painel não encontrado');
        router.push('/painel/meus-paineis');
      }
    }

    // Adicionar listener para tecla ESC
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [painelId, router]);

  const handleClose = () => {
    router.back();
  };

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="text-lg mb-4">Carregando painel...</div>
          <div className="text-sm text-gray-400">Aguarde um momento</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundColor: config.corFundo,
        fontFamily: config.fonteCorpo,
      }}
    >
      {/* Botão Fechar */}
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all shadow-lg"
        title="Fechar visualização (ESC)"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Painel em Fullscreen */}
      <div
        className="w-full h-screen flex flex-col justify-between"
        style={{ padding: `${config.margens}px` }}
      >
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
                    className="h-20 w-20 object-contain"
                  />
                ) : (
                  <div className="h-20 w-20 bg-gray-800 rounded-full" />
                )}
              </div>
            )}

            <div className="text-center flex-1">
              <div
                className="text-2xl mb-2"
                style={{
                  color: config.corDestaque,
                  fontFamily: config.fonteTitulo,
                }}
              >
                APOIADOR
              </div>
              <div
                className="text-4xl font-bold"
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
                    className="h-20 w-20 object-contain"
                  />
                ) : (
                  <div className="h-20 w-20 bg-gray-800 rounded-full" />
                )}
              </div>
            )}
          </div>
        )}

        {/* Conteúdo do Painel - Grid de Logos */}
        <div
          className={`flex-1 flex items-center justify-center grid ${
            config.quantidadeLogosExibicao === 1
              ? 'grid-cols-1'
              : config.quantidadeLogosExibicao <= 4
              ? 'grid-cols-2'
              : 'grid-cols-3'
          }`}
          style={{
            gap: `${Math.max(config.espacamentoLogos / (config.quantidadeLogosExibicao > 6 ? 3 : config.quantidadeLogosExibicao > 3 ? 2 : 1), 24)}px`,
            padding: '3rem 2rem'
          }}
        >
          {Array.from({ length: config.quantidadeLogosExibicao }).map((_, index) => {
            let logoSize, fontSize, marginBottom, hideRedesSociais = false;

            if (config.quantidadeLogosExibicao === 1) {
              logoSize = 'h-48 w-48';
              fontSize = 'text-3xl';
              marginBottom = 'mb-4';
            } else if (config.quantidadeLogosExibicao === 2) {
              logoSize = 'h-40 w-40';
              fontSize = 'text-2xl';
              marginBottom = 'mb-3';
            } else if (config.quantidadeLogosExibicao <= 4) {
              logoSize = 'h-32 w-32';
              fontSize = 'text-xl';
              marginBottom = 'mb-3';
            } else if (config.quantidadeLogosExibicao <= 6) {
              logoSize = 'h-28 w-28';
              fontSize = 'text-lg';
              marginBottom = 'mb-2';
            } else {
              logoSize = 'h-24 w-24';
              fontSize = 'text-base';
              marginBottom = 'mb-2';
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
                  className={`${fontSize} font-bold ${config.exibirRedesSociais && !hideRedesSociais ? 'mb-2' : ''}`}
                  style={{ color: config.corTexto }}
                >
                  Patrocinador {index + 1}
                </div>
                {config.exibirRedesSociais && !hideRedesSociais && (
                  <div
                    className="text-lg leading-tight"
                    style={{ color: config.corTexto, opacity: 0.7 }}
                  >
                    @instagram • (00) 0000-0000
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer do Painel */}
        {config.exibirRodape && config.exibirQRCode && (
          <div className="flex items-center justify-between flex-shrink-0">
            {/* Logo VersoPag - Esquerda */}
            <div className="flex items-center gap-3">
              <div
                className="h-12 w-12 rounded"
                style={{ backgroundColor: config.corTexto }}
              />
              <span
                className="text-2xl font-medium"
                style={{ color: config.corTexto, fontFamily: config.fonteCorpo }}
              >
                VersoPag
              </span>
            </div>

            {/* Texto + QR Code - Direita */}
            <div className="flex items-center gap-8">
              <div className="flex flex-col text-right">
                {config.textoQRCodePrincipal && (
                  <div
                    className="text-3xl font-bold"
                    style={{ color: config.corDestaque, fontFamily: config.fonteTitulo }}
                  >
                    {config.textoQRCodePrincipal}
                  </div>
                )}
                {config.textoQRCodeSecundario && (
                  <div
                    className="text-xl"
                    style={{ color: config.corTexto, fontFamily: config.fonteCorpo }}
                  >
                    {config.textoQRCodeSecundario}
                  </div>
                )}
              </div>
              <div
                className="h-32 w-32 rounded-lg bg-white flex items-center justify-center shadow-lg"
              >
                <div
                  className="h-28 w-28 rounded"
                  style={{ backgroundColor: config.corTexto }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
