# VersoPag - Sistema de Patrocínio Interativo

Sistema de patrocínio customizável para eventos com painéis em tempo real, integrado com MongoDB Atlas.

## 🚀 Tecnologias

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização com oklch colors
- **Framer Motion** - Animações suaves
- **MongoDB Atlas** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Radix UI** - Componentes acessíveis

## 🎨 Paleta de Cores

```css
--versopag-primary: #00FF6E     /* Verde Brilhante */
--versopag-secondary: #2E2E2E   /* Cinza Escuro */
--versopag-accent: #f0fff4      /* Verde Claro */
```

## 📁 Estrutura do Projeto

```
├── app/
│   ├── api/
│   │   ├── health/          # Health check + teste de conexão
│   │   ├── events/          # CRUD de eventos
│   │   └── sponsors/        # CRUD de patrocinadores
│   ├── globals.css          # Tema global com oklch
│   └── page.tsx             # Landing page
├── components/
│   └── ui/                  # Componentes Radix UI
├── lib/
│   └── mongodb.ts           # Conexão com MongoDB
├── models/
│   ├── User.ts              # Schema de usuários
│   ├── Event.ts             # Schema de eventos
│   └── Sponsor.ts           # Schema de patrocinadores
└── public/
    └── versopag-logo.png    # Logo da marca
```

## 🗄️ Models do Banco de Dados

### User
```typescript
{
  name: string
  email: string (unique)
  password?: string
  image?: string
  role: 'user' | 'producer' | 'admin'
  emailVerified?: Date
}
```

### Event
```typescript
{
  title: string
  description: string
  date: Date
  location: string
  producer: ObjectId (ref: User)
  maxParticipants?: number
  currentParticipants: number
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled'
  banner?: string
  qrCode?: string
  sponsors: ObjectId[] (ref: Sponsor)
  customization: {
    primaryColor?: string
    secondaryColor?: string
    logo?: string
    backgroundImage?: string
  }
}
```

### Sponsor
```typescript
{
  event: ObjectId (ref: Event)
  company: string
  logo: string
  participant: ObjectId (ref: User)
  displayOrder?: number
  status: 'pending' | 'approved' | 'rejected' | 'displayed'
  displayedAt?: Date
  qrCodeScannedAt: Date
  metadata?: {
    participantName?: string
    participantEmail?: string
    additionalInfo?: string
  }
}
```

## 🔌 API Endpoints

### Health Check
```bash
GET /api/health
# Resposta: { status: "ok", message: "API funcionando...", timestamp: "..." }
```

### Eventos

#### Listar eventos
```bash
GET /api/events?status=published&limit=10&page=1
```

#### Criar evento
```bash
POST /api/events
Content-Type: application/json

{
  "title": "Meu Evento",
  "description": "Descrição do evento",
  "date": "2025-12-31T20:00:00Z",
  "location": "São Paulo, SP",
  "producer": "user_id_aqui"
}
```

### Patrocinadores

#### Listar patrocinadores
```bash
GET /api/sponsors?eventId=event_id&status=approved
```

#### Criar patrocinador
```bash
POST /api/sponsors
Content-Type: application/json

{
  "event": "event_id",
  "company": "Nome da Empresa",
  "logo": "url_do_logo",
  "participant": "user_id"
}
```

#### Atualizar status
```bash
PATCH /api/sponsors
Content-Type: application/json

{
  "sponsorId": "sponsor_id",
  "status": "approved"
}
```

## 🚀 Começando

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env.local`:
```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/?appName=App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta
NODE_ENV=development
```

### 3. Rodar o servidor de desenvolvimento
```bash
npm run dev
```

Acesse: [http://localhost:3001](http://localhost:3001)

### 4. Testar a API
```bash
# Testar conexão com MongoDB
curl http://localhost:3001/api/health

# Listar eventos
curl http://localhost:3001/api/events

# Listar patrocinadores
curl http://localhost:3001/api/sponsors
```

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🎯 Funcionalidades

### Landing Page
- ✅ Header com navegação e perfil
- ✅ Hero section com animações
- ✅ Demonstração visual do painel
- ✅ Grid de funcionalidades
- ✅ Seção "Como funciona" (3 passos)
- ✅ Planos de preços
- ✅ Call-to-action
- ✅ Footer completo

### Backend
- ✅ Conexão com MongoDB Atlas
- ✅ Models: User, Event, Sponsor
- ✅ API Routes: Health, Events, Sponsors
- ✅ Validação de dados
- ✅ Paginação
- ✅ Filtros por status

### Próximos Passos
- [ ] Autenticação com NextAuth
- [ ] Upload de imagens
- [ ] Sistema de QR Code
- [ ] Dashboard do produtor
- [ ] Painel ao vivo (WebSocket)
- [ ] Moderação em tempo real
- [ ] Analytics e relatórios

## 📝 Licença

© 2025 VersoPag. Todos os direitos reservados.
