import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  producer: mongoose.Types.ObjectId;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  banner?: string;
  qrCode?: string;
  sponsors: mongoose.Types.ObjectId[];
  customization: {
    primaryColor?: string;
    secondaryColor?: string;
    logo?: string;
    backgroundImage?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema<IEvent> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Por favor, forneça um título para o evento'],
      trim: true,
      maxlength: [100, 'O título não pode ter mais de 100 caracteres'],
    },
    description: {
      type: String,
      required: [true, 'Por favor, forneça uma descrição'],
      maxlength: [500, 'A descrição não pode ter mais de 500 caracteres'],
    },
    date: {
      type: Date,
      required: [true, 'Por favor, forneça uma data para o evento'],
    },
    location: {
      type: String,
      required: [true, 'Por favor, forneça um local'],
    },
    producer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    maxParticipants: {
      type: Number,
      min: [1, 'Deve haver pelo menos 1 participante'],
    },
    currentParticipants: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'ongoing', 'completed', 'cancelled'],
      default: 'draft',
    },
    banner: {
      type: String,
    },
    qrCode: {
      type: String,
    },
    sponsors: [{
      type: Schema.Types.ObjectId,
      ref: 'Sponsor',
    }],
    customization: {
      primaryColor: {
        type: String,
        default: '#00FF6E',
      },
      secondaryColor: {
        type: String,
        default: '#2E2E2E',
      },
      logo: {
        type: String,
      },
      backgroundImage: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Índices para melhorar performance
EventSchema.index({ producer: 1, status: 1 });
EventSchema.index({ date: 1 });

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
