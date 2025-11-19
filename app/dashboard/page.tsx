'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/Header';

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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-900 text-lg">Carregando...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Dashboard do Produtor
          </h1>
          <p className="text-gray-600 text-lg">
            Em breve você poderá gerenciar seus eventos aqui!
          </p>

          <div className="mt-8 bg-white border border-gray-200 rounded-xl p-8 max-w-md mx-auto shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Informações da sessão
            </h2>
            <div className="text-left space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Nome:</span> {session.user.name}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Email:</span> {session.user.email}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Role:</span> {session.user.role}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">ID:</span> {session.user.id}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
