import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

// GET /api/events - Lista todos os eventos
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const events = await Event.find(query)
      .populate('producer', 'name email')
      .sort({ date: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Event.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: events,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar eventos',
      },
      { status: 500 }
    );
  }
}

// POST /api/events - Cria um novo evento
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validação básica
    if (!body.title || !body.description || !body.date || !body.location) {
      return NextResponse.json(
        {
          success: false,
          error: 'Campos obrigatórios: title, description, date, location',
        },
        { status: 400 }
      );
    }

    const event = await Event.create(body);

    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro ao criar evento:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao criar evento',
      },
      { status: 400 }
    );
  }
}
