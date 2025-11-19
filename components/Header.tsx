"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Ticket,
  User,
  Settings,
  Calendar,
  LogOut,
  Menu,
} from "lucide-react";

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const onGoToProducerArea = () => {
    router.push("/dashboard");
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    setShowProfileMenu(false);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleHome = () => {
    router.push("/");
  };

  // Função auxiliar para obter as iniciais do usuário
  const getUserInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center h-14">
          {/* Navigation - Desktop Left */}
          <div className="hidden md:flex items-center space-x-4 absolute left-0">
            {session?.user && (
              <>
                <Button
                  variant="ghost"
                  onClick={onGoToProducerArea}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-[var(--versopag-accent)]"
                >
                  <Plus className="h-4 w-4" />
                  <span>Criar evento</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={onGoToProducerArea}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-[var(--versopag-accent)]"
                >
                  <Ticket className="h-4 w-4" />
                  <span>Meus ingressos</span>
                </Button>
              </>
            )}
          </div>

          {/* Logo Centralizada */}
          <div className="flex items-center justify-center cursor-pointer" onClick={handleHome}>
            <Image
              src="/versopag-logo.png"
              alt="VersoPag"
              width={120}
              height={24}
              className="h-6 w-auto"
            />
          </div>

          {/* Profile - Desktop Right */}
          <div className="hidden md:flex items-center absolute right-0">
            {status === "loading" ? (
              <div className="h-8 w-8 rounded-full bg-gray-100 animate-pulse" />
            ) : session?.user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 text-gray-700 hover:bg-transparent px-0 py-0 h-auto"
                >
                  {/* Avatar Container */}
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[var(--versopag-accent)] transition-colors cursor-pointer">
                    <span className="text-sm text-gray-700">
                      {getUserInitials(session.user.name)}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-900">
                      {session.user.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {session.user.email}
                    </span>
                  </div>
                </Button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          Minha Conta
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onGoToProducerArea();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Meu Perfil</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onGoToProducerArea();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Configurações</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onGoToProducerArea();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Ticket className="h-4 w-4" />
                        <span>Meus Ingressos</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onGoToProducerArea();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Meus Eventos</span>
                      </button>

                      <div className="border-t border-gray-100 my-1" />

                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sair</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={handleLogin}
                  className="text-gray-700 hover:text-gray-900 hover:bg-[var(--versopag-accent)]"
                >
                  Entrar
                </Button>
                <Button
                  onClick={handleRegister}
                  className="bg-[var(--versopag-secondary)] text-white hover:bg-[var(--versopag-secondary)]/90"
                >
                  Criar conta
                </Button>
              </div>
            )}
          </div>

          {/* Menu - Mobile */}
          <Button
            variant="ghost"
            className="md:hidden absolute right-4 text-gray-700 hover:text-gray-900 hover:bg-[var(--versopag-accent)]"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
