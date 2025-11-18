import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();

    return NextResponse.json({
      status: 'ok',
      message: 'API funcionando e conectada ao MongoDB!',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro ao conectar com MongoDB:', error);

    return NextResponse.json(
      {
        status: 'error',
        message: 'Erro ao conectar com o banco de dados',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
