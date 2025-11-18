'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2E2E2E] to-[#1a1a1a]">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E2E2E] to-[#1a1a1a]">
      {/* Header */}
      <header className="border-b border-gray-700 bg-[#2E2E2E]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Image
              src="/versopag-logo.png"
              alt="VersoPag"
              width={140}
              height={46}
            />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Bem-vindo,</p>
                <p className="text-white font-semibold">{session.user.name}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-700 rounded-lg hover:bg-[#1a1a1a] transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Dashboard do Produtor
          </h1>
          <p className="text-gray-400 text-lg">
            Em breve você poderá gerenciar seus eventos aqui!
          </p>

          <div className="mt-8 bg-[#2E2E2E] border border-gray-700 rounded-xl p-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4">
              Informações da sessão
            </h2>
            <div className="text-left space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="font-semibold text-white">Nome:</span> {session.user.name}
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-white">Email:</span> {session.user.email}
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-white">Role:</span> {session.user.role}
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-white">ID:</span> {session.user.id}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
