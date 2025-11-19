"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TypewriterText } from "@/components/TypewriterText";
import { Header } from "@/components/Header";
import Image from "next/image";
import {
  QrCode,
  Tv,
  Zap,
  Users,
  BarChart3,
  ArrowRight,
  Check,
  Shield,
  Globe,
  Eye
} from "lucide-react";

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section - Innovative Design */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-[var(--versopag-primary)]/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-[var(--versopag-secondary)]/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-8 shadow-sm">
              <div className="h-2 w-2 bg-[var(--versopag-primary)] rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">Sistema de Patrocínio Interativo</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl lg:text-7xl xl:text-8xl mb-8 text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Painéis que{" "}
            <TypewriterText words={["conectam", "engajam", "transformam"]} />
          </motion.h1>

          <motion.p
            className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            QR codes que transformam participantes em protagonistas.
            Painéis customizáveis que aparecem no telão em tempo real.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              className="bg-[var(--versopag-secondary)] text-white hover:bg-[var(--versopag-secondary)]/90 px-8 py-6 group"
            >
              Começar agora
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="ghost"
              className="px-8 py-6 group"
            >
              Ver demonstração
              <Eye className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-24 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="border-l-2 border-[var(--versopag-primary)] pl-4">
              <div className="text-4xl text-gray-900 mb-1">1000+</div>
              <div className="text-sm text-gray-500">Eventos realizados</div>
            </div>
            <div className="border-l-2 border-[var(--versopag-primary)] pl-4">
              <div className="text-4xl text-gray-900 mb-1">50K+</div>
              <div className="text-sm text-gray-500">Participantes ativos</div>
            </div>
            <div className="border-l-2 border-[var(--versopag-primary)] pl-4">
              <div className="text-4xl text-gray-900 mb-1">2.5s</div>
              <div className="text-sm text-gray-500">Tempo médio</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Demo - Asymmetric Layout */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl mb-6 text-gray-900">
                Tempo real.<br />
                Zero fricção.
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Quando um participante escaneia o QR code,
                sua empresa aparece instantaneamente no telão.
                Simples assim.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[var(--versopag-primary)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 text-[var(--versopag-primary)]" />
                  </div>
                  <div>
                    <p className="text-gray-900">Atualização instantânea</p>
                    <p className="text-sm text-gray-500">Menos de 500ms de latência</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[var(--versopag-primary)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 text-[var(--versopag-primary)]" />
                  </div>
                  <div>
                    <p className="text-gray-900">100% customizável</p>
                    <p className="text-sm text-gray-500">Sua marca, suas regras</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                {/* Main Panel */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 overflow-hidden">
                  <div className="bg-gradient-to-br from-[var(--versopag-secondary)] via-gray-800 to-[var(--versopag-secondary)] rounded-2xl p-6 relative overflow-hidden">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="grid grid-cols-6 h-full">
                        {[...Array(24)].map((_, i) => (
                          <div key={i} className="border-r border-b border-white/20" />
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-[var(--versopag-primary)] rounded-full animate-pulse" />
                          <span className="text-white text-sm">Painel Ao Vivo</span>
                        </div>
                        <span className="text-white/60 text-xs">18:47:23</span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {[...Array(9)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                          >
                            <div className="h-8 w-8 bg-gradient-to-br from-[var(--versopag-primary)] to-green-400 rounded mb-2" />
                            <div className="h-2 w-16 bg-white/40 rounded" />
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex items-center justify-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                        <QrCode className="h-24 w-24 text-[var(--versopag-primary)]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Element */}
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[var(--versopag-primary)]/10 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-[var(--versopag-primary)]" />
                    </div>
                    <div>
                      <div className="text-2xl text-gray-900">247</div>
                      <div className="text-xs text-gray-500">Participantes online</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features - Minimalist Grid */}
      <section className="py-32">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl lg:text-6xl mb-6 text-gray-900">
              Tudo o que você precisa
            </h2>
            <p className="text-xl text-gray-600">
              Recursos pensados para maximizar o engajamento e simplificar sua operação.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Tv className="h-6 w-6" />,
                title: "Customização Total",
                description: "Adapte cores, layouts, logos e animações para refletir perfeitamente a identidade do seu evento."
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Sincronização Real",
                description: "Tecnologia WebSocket garante que as mudanças apareçam no telão em menos de meio segundo."
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Engajamento Elevado",
                description: "Transforme espectadores em participantes ativos com interação gamificada e divertida."
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Moderação Inteligente",
                description: "Sistema de aprovação automática com IA e controles manuais para total segurança."
              },
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: "Analytics Profundo",
                description: "Dados detalhados sobre participação, timing e comportamento dos usuários."
              },
              {
                icon: <Globe className="h-6 w-6" />,
                title: "Multi-dispositivo",
                description: "Funciona perfeitamente em qualquer dispositivo, de smartphones a smart TVs."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 rounded-2xl border border-gray-200 bg-white hover:border-[var(--versopag-primary)]/50 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 text-gray-700 group-hover:bg-[var(--versopag-primary)]/10 group-hover:text-[var(--versopag-primary)] transition-colors"
                  animate={{ scale: hoveredFeature === index ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>

                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-[var(--versopag-primary)]"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredFeature === index ? "100%" : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Stepped */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-32">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl lg:text-6xl mb-6 text-gray-900">
              Como funciona
            </h2>
            <p className="text-xl text-gray-600">
              Três passos simples para transformar seu evento
            </p>
          </motion.div>

          <div className="space-y-32">
            {[
              {
                step: "01",
                title: "Configure em minutos",
                description: "Interface intuitiva permite criar e personalizar seu painel sem conhecimento técnico. Escolha templates ou comece do zero.",
                features: ["Drag & drop builder", "Templates profissionais", "Preview em tempo real"]
              },
              {
                step: "02",
                title: "Distribua QR codes",
                description: "Gere códigos únicos para cada participante ou use um código universal. Imprima, envie por email ou projete na tela.",
                features: ["QR codes infinitos", "Tracking individual", "URLs customizadas"]
              },
              {
                step: "03",
                title: "Acompanhe ao vivo",
                description: "Dashboard em tempo real mostra todas as participações. Aprove, rejeite ou destaque empresas com um clique.",
                features: ["Moderação ao vivo", "Analytics em tempo real", "Exportação de dados"]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="grid lg:grid-cols-2 gap-16 items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="text-8xl mb-6 text-gray-100">{item.step}</div>
                  <h3 className="text-4xl mb-4 text-gray-900">{item.title}</h3>
                  <p className="text-xl text-gray-600 mb-8">{item.description}</p>
                  <div className="space-y-3">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-[var(--versopag-primary)]" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 h-96 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />

                    {/* Step 1: Configure */}
                    {index === 0 && (
                      <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <div className="relative">
                          {/* Main screen mockup */}
                          <div className="w-64 h-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-4 border-gray-700 relative overflow-hidden">
                            {/* Screen content */}
                            <div className="absolute inset-0 p-4">
                              <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="h-16 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center">
                                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--versopag-primary)] to-green-400 rounded" />
                                </div>
                                <div className="h-16 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center">
                                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="h-2 bg-white/20 rounded w-3/4" />
                                <div className="h-2 bg-white/20 rounded w-1/2" />
                              </div>
                            </div>
                          </div>

                          {/* Floating palette */}
                          <motion.div
                            className="absolute -right-6 -bottom-4 bg-white rounded-xl shadow-lg p-3 border border-gray-200"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            <div className="flex gap-2">
                              <div className="w-6 h-6 rounded-full bg-[var(--versopag-primary)]" />
                              <div className="w-6 h-6 rounded-full bg-blue-500" />
                              <div className="w-6 h-6 rounded-full bg-purple-500" />
                            </div>
                          </motion.div>

                          {/* Floating icon */}
                          <motion.div
                            className="absolute -left-6 top-8 bg-[var(--versopag-primary)]/10 rounded-lg p-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          >
                            <Tv className="h-6 w-6 text-[var(--versopag-primary)]" />
                          </motion.div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: QR Codes */}
                    {index === 1 && (
                      <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <div className="relative">
                          {/* Main QR Code */}
                          <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-gray-200">
                            <div className="w-40 h-40 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                              <QrCode className="h-24 w-24 text-[var(--versopag-primary)]" />

                              {/* QR code pattern overlay */}
                              <div className="absolute inset-0 opacity-10">
                                <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                                  {[...Array(64)].map((_, i) => {
                                    const pattern = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1];
                                    return <div key={i} className={`${pattern[i] ? 'bg-white' : ''}`} />;
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Floating mini QR codes */}
                          <motion.div
                            className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-2 border border-gray-200"
                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                              <QrCode className="h-8 w-8 text-gray-600" />
                            </div>
                          </motion.div>

                          <motion.div
                            className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-2 border border-gray-200"
                            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                              <QrCode className="h-8 w-8 text-gray-600" />
                            </div>
                          </motion.div>

                          {/* Scan indicator */}
                          <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                          >
                            <motion.div
                              className="absolute inset-0 rounded-2xl border-2 border-[var(--versopag-primary)]/30"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Analytics */}
                    {index === 2 && (
                      <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <div className="relative">
                          {/* Dashboard card */}
                          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-700 w-72 relative overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-[var(--versopag-primary)] rounded-full animate-pulse" />
                                <span className="text-white text-xs">Ao vivo</span>
                              </div>
                              <BarChart3 className="h-4 w-4 text-white/60" />
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                <div className="text-2xl text-white mb-1">247</div>
                                <div className="text-xs text-white/60">Participantes</div>
                              </div>
                              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                <div className="text-2xl text-white mb-1">89%</div>
                                <div className="text-xs text-white/60">Engajamento</div>
                              </div>
                            </div>

                            {/* Mini chart */}
                            <div className="space-y-2">
                              <div className="flex items-end gap-1 h-16">
                                {[40, 70, 50, 80, 65, 90, 75].map((height, i) => (
                                  <motion.div
                                    key={i}
                                    className="flex-1 bg-gradient-to-t from-[var(--versopag-primary)] to-green-400 rounded-t"
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${height}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                                  />
                                ))}
                              </div>
                              <div className="flex justify-between text-xs text-white/40">
                                <span>Seg</span>
                                <span>Dom</span>
                              </div>
                            </div>
                          </div>

                          {/* Floating success indicator */}
                          <motion.div
                            className="absolute -top-3 -right-3 bg-[var(--versopag-primary)] rounded-full p-2 shadow-lg"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                          >
                            <Check className="h-5 w-5 text-white" />
                          </motion.div>

                          {/* Floating notification */}
                          <motion.div
                            className="absolute -bottom-3 -left-3 bg-white rounded-lg shadow-lg p-2 border border-gray-200 flex items-center gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                          >
                            <Users className="h-4 w-4 text-[var(--versopag-primary)]" />
                            <span className="text-xs text-gray-600">+12 novos</span>
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Clean Cards */}
      <section className="py-32">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl lg:text-6xl mb-6 text-gray-900">
              Preços transparentes
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para o tamanho do seu evento
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "299",
                description: "Para eventos pequenos",
                features: ["Até 50 participantes", "1 painel", "QR codes ilimitados", "Analytics básico", "Suporte email"],
                highlighted: false
              },
              {
                name: "Pro",
                price: "599",
                description: "Para eventos médios",
                features: ["Até 200 participantes", "3 painéis", "QR codes ilimitados", "Analytics avançado", "Suporte prioritário", "API access"],
                highlighted: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "Para grandes eventos",
                features: ["Participantes ilimitados", "Painéis ilimitados", "White label", "API completa", "Suporte dedicado", "SLA garantido"],
                highlighted: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative rounded-3xl p-8 ${
                  plan.highlighted
                    ? "bg-[var(--versopag-secondary)] text-white border-2 border-[var(--versopag-primary)]"
                    : "bg-white border border-gray-200"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--versopag-primary)] text-[var(--versopag-secondary)] px-4 py-1 rounded-full text-sm">
                    Mais popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`text-2xl mb-2 ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    {plan.price === "Custom" ? (
                      <span className="text-5xl">Custom</span>
                    ) : (
                      <>
                        <span className="text-5xl">R$ {plan.price}</span>
                        <span className={plan.highlighted ? "text-white/70" : "text-gray-500"}>/evento</span>
                      </>
                    )}
                  </div>
                  <p className={plan.highlighted ? "text-white/80" : "text-gray-600"}>
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className={`h-5 w-5 ${plan.highlighted ? "text-[var(--versopag-primary)]" : "text-gray-400"}`} />
                      <span className={plan.highlighted ? "text-white" : "text-gray-700"}>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-[var(--versopag-primary)] text-[var(--versopag-secondary)] hover:bg-[var(--versopag-primary)]/90"
                      : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {plan.price === "Custom" ? "Falar com vendas" : "Começar agora"}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Bold & Simple */}
      <section className="py-32">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl lg:text-7xl mb-8 text-gray-900">
              Pronto para começar?
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Crie seu primeiro painel gratuitamente.
              Sem cartão de crédito necessário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-[var(--versopag-secondary)] text-white hover:bg-[var(--versopag-secondary)]/90 px-12 py-7 group"
              >
                Criar painel grátis
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 px-12 py-7"
              >
                Agendar demo
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--versopag-primary)]" />
                Sem compromisso
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--versopag-primary)]" />
                Setup em 5 minutos
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--versopag-primary)]" />
                Suporte incluído
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="border-t border-gray-200 py-12">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Image
                src="/versopag-logo.png"
                alt="VersoPag"
                width={120}
                height={24}
                className="h-6 w-auto mb-4"
              />
              <p className="text-sm text-gray-600">
                Transformando eventos com tecnologia.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-gray-900">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Demo</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-gray-900">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Carreiras</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-gray-900">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Ajuda</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; 2025 VersoPag. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Termos</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
