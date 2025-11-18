import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Sponsor from '@/models/Sponsor';

// GET /api/sponsors - Lista todos os patrocinadores
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const status = searchParams.get('status');

    const query: any = {};
    if (eventId) {
      query.event = eventId;
    }
    if (status) {
      query.status = status;
    }

    const sponsors = await Sponsor.find(query)
      .populate('event', 'title')
      .populate('participant', 'name email')
      .sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: sponsors,
    });
  } catch (error) {
    console.error('Erro ao buscar patrocinadores:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar patrocinadores',
      },
      { status: 500 }
    );
  }
}

// POST /api/sponsors - Adiciona um novo patrocinador
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validação básica
    if (!body.event || !body.company || !body.participant) {
      return NextResponse.json(
        {
          success: false,
          error: 'Campos obrigatórios: event, company, participant',
        },
        { status: 400 }
      );
    }

    const sponsor = await Sponsor.create(body);

    return NextResponse.json(
      {
        success: true,
        data: sponsor,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro ao criar patrocinador:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao criar patrocinador',
      },
      { status: 400 }
    );
  }
}

// PATCH /api/sponsors - Atualiza status de um patrocinador
export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { sponsorId, status } = body;

    if (!sponsorId || !status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Campos obrigatórios: sponsorId, status',
        },
        { status: 400 }
      );
    }

    const sponsor = await Sponsor.findByIdAndUpdate(
      sponsorId,
      { status },
      { new: true, runValidators: true }
    );

    if (!sponsor) {
      return NextResponse.json(
        {
          success: false,
          error: 'Patrocinador não encontrado',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: sponsor,
    });
  } catch (error: any) {
    console.error('Erro ao atualizar patrocinador:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao atualizar patrocinador',
      },
      { status: 400 }
    );
  }
}
