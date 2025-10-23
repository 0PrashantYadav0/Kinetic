# Kinetic

A real-time collaborative virtual world platform inspired by Gather.town, built with modern web technologies. Kinetic allows users to create, customize, and explore virtual spaces with real-time video chat, interactive avatars, and collaborative features.

## 🌟 Features

### Core Features
- **Real-time Virtual Worlds**: Create and explore custom virtual spaces
- **Video Chat Integration**: Built-in video and audio communication using Agora RTC
- **Interactive Avatars**: Customizable character skins and animations
- **Collaborative Editing**: Real-time map editing and customization
- **Multiplayer Support**: Support for multiple users in the same space
- **Room Management**: Create private and public rooms with different themes

### Technical Features
- **Real-time Communication**: Socket.IO for instant updates
- **2D Graphics**: Pixi.js for smooth animations and rendering
- **Authentication**: Secure user authentication with Supabase
- **Responsive Design**: Modern dark theme with glass morphism effects
- **Type Safety**: Full TypeScript implementation
- **Performance Optimized**: Efficient rendering and state management

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom dark theme
- **Graphics**: Pixi.js for 2D rendering and animations
- **Video Chat**: Agora RTC SDK for real-time communication
- **State Management**: React hooks and context
- **Authentication**: Supabase Auth integration

### Backend (Node.js)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Real-time**: Socket.IO for WebSocket communication
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT tokens with Supabase
- **Validation**: Zod schemas for type safety

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Agora.io account (for video chat)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/0PrashantYadav0/Kinetic.git
   cd Kinetic
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   Create `.env` files in both `backend/` and `frontend/` directories:

   **Backend `.env`:**
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   PORT=3001
   NODE_ENV=development
   ```

   **Frontend `.env.local`:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_AGORA_APP_ID=your_agora_app_id
   NEXT_PUBLIC_AGORA_APP_CERTIFICATE=your_agora_app_certificate
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
   ```

4. **Database Setup**
   - Create a new Supabase project
   - Run the database migrations (if any)
   - Configure authentication providers

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend  
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
Kinetic/
├── frontend/                 # Next.js frontend application
│   ├── app/                  # App Router pages
│   │   ├── app/             # Dashboard and realm management
│   │   ├── editor/          # Map editor interface
│   │   ├── play/            # Game client interface
│   │   ├── manage/          # Realm management
│   │   └── signin/          # Authentication pages
│   ├── components/          # Reusable React components
│   │   ├── Modal/           # Modal components
│   │   ├── Navbar/          # Navigation components
│   │   └── VideoChat/       # Video chat components
│   ├── utils/               # Utility functions
│   │   ├── pixi/            # Pixi.js game logic
│   │   ├── supabase/        # Database utilities
│   │   └── video-chat/      # Agora RTC integration
│   └── public/              # Static assets
│       ├── sprites/         # Game sprites and textures
│       └── fonts/           # Custom fonts
├── backend/                 # Node.js backend server
│   ├── src/
│   │   ├── sockets/         # Socket.IO handlers
│   │   ├── routes/          # API routes
│   │   └── utils/           # Backend utilities
│   └── dist/                # Compiled JavaScript
└── README.md
```

## 🎮 Usage

### Creating a Realm
1. Sign in with your Google account
2. Click "Create New Realm" on the dashboard
3. Choose a name and description for your realm
4. Start customizing your virtual space

### Editing Maps
1. Enter the editor mode for your realm
2. Use the tile palette to design your space
3. Add special tiles for spawn points, teleporters, and private areas
4. Save your changes to make them live

### Playing in Virtual Worlds
1. Join a realm from the dashboard
2. Customize your avatar appearance
3. Use video chat to communicate with other players
4. Explore and interact with the virtual environment

## 🔧 Development

### Available Scripts

**Backend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
```

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
```

### Key Technologies

**Frontend:**
- Next.js 14 (React framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Pixi.js (2D graphics)
- Agora RTC (video chat)
- Socket.IO Client (real-time communication)

**Backend:**
- Node.js (runtime)
- Express.js (web framework)
- TypeScript (type safety)
- Socket.IO (WebSocket server)
- Supabase (database & auth)
- Zod (schema validation)

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to any Node.js hosting service:

1. **Heroku:**
   ```bash
   # Add Heroku remote
   heroku git:remote -a your-app-name
   
   # Deploy
   git push heroku main
   ```

2. **Railway/Render:**
   - Connect your GitHub repository
   - Set environment variables
   - Deploy automatically

### Frontend Deployment
Deploy to Vercel, Netlify, or any static hosting service:

1. **Vercel (Recommended):**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Netlify:**
   - Connect repository
   - Set build command: `npm run build`
   - Set publish directory: `out`

## 🔐 Environment Variables

### Required Variables

**Backend:**
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `PORT`: Server port (default: 3001)

**Frontend:**
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `NEXT_PUBLIC_AGORA_APP_ID`: Agora.io application ID
- `NEXT_PUBLIC_AGORA_APP_CERTIFICATE`: Agora.io app certificate
- `NEXT_PUBLIC_BACKEND_URL`: Backend server URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Gather.town** - Inspiration for the virtual world concept
- **Supabase** - Backend-as-a-Service platform
- **Agora.io** - Real-time video communication
- **Pixi.js** - 2D WebGL renderer
- **Next.js** - React framework
- **Socket.IO** - Real-time communication

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/0PrashantYadav0/Kinetic/issues)
- **Documentation**: Check the `/docs` folder for detailed guides
- **Community**: Join our Discord server for discussions

## 🔗 Links

- **Live Demo**: [kinetic-demo.vercel.app](https://kinetic-demo.vercel.app)
- **GitHub Repository**: [github.com/0PrashantYadav0/Kinetic](https://github.com/0PrashantYadav0/Kinetic)
- **Documentation**: [kinetic-docs.vercel.app](https://kinetic-docs.vercel.app)

---

**Built with ❤️ by [Prashant Yadav](https://github.com/0PrashantYadav0)**