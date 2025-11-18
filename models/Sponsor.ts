import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISponsor extends Document {
  event: mongoose.Types.ObjectId;
  company: string;
  logo: string;
  participant: mongoose.Types.ObjectId;
  displayOrder?: number;
  status: 'pending' | 'approved' | 'rejected' | 'displayed';
  displayedAt?: Date;
  qrCodeScannedAt: Date;
  metadata?: {
    participantName?: string;
    participantEmail?: string;
    additionalInfo?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SponsorSchema: Schema<ISponsor> = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    company: {
      type: String,
      required: [true, 'Por favor, forneça o nome da empresa'],
      trim: true,
    },
    logo: {
      type: String,
      required: [true, 'Por favor, forneça o logo da empresa'],
    },
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'displayed'],
      default: 'pending',
    },
    displayedAt: {
      type: Date,
    },
    qrCodeScannedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    metadata: {
      participantName: String,
      participantEmail: String,
      additionalInfo: String,
    },
  },
  {
    timestamps: true,
  }
);

// Índices para melhorar performance
SponsorSchema.index({ event: 1, status: 1 });
SponsorSchema.index({ event: 1, displayOrder: 1 });
SponsorSchema.index({ participant: 1 });

// Método para marcar como exibido
SponsorSchema.methods.markAsDisplayed = function() {
  this.status = 'displayed';
  this.displayedAt = new Date();
  return this.save();
};

const Sponsor: Model<ISponsor> = mongoose.models.Sponsor || mongoose.model<ISponsor>('Sponsor', SponsorSchema);

export default Sponsor;
