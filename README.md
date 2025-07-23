# 3D AI Agent with RAG 🤖

An interactive 3D AI Agent built with React Native, Expo, and Three.js, featuring Retrieval-Augmented Generation (RAG) capabilities through OpenAI and Tavily APIs.

## 🌟 Features

- **3D Interactive Avatar**: Beautiful 3D animated AI agent that responds to user interactions
- **RAG-Powered Conversations**: Real-time web search integration for up-to-date responses
- **Modern Chat Interface**: Clean, intuitive chat experience with message history
- **Cross-Platform**: Runs on iOS, Android, and web platforms
- **Customizable Agent**: Modify the 3D avatar appearance and behavior
- **Real-time Animation**: Dynamic 3D animations that respond to conversation state

## 🛠️ Technology Stack

- **Frontend**: React Native with Expo
- **3D Graphics**: Three.js with React Three Fiber
- **AI Services**: OpenAI GPT-4 and Tavily Search API
- **Navigation**: Expo Router with tab-based navigation
- **Styling**: StyleSheet with themed components
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- OpenAI API key
- Tavily API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 3D-AI-Agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   TAVILY_API_KEY=your_tavily_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on your preferred platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on mobile device

## 📱 Usage

1. **Start a Conversation**: Type your message in the chat input at the bottom
2. **Watch the Avatar**: The 3D agent animates while processing your request
3. **Get AI Responses**: Receive intelligent responses enhanced with real-time web data
4. **Explore Features**: Use the navigation tabs to access different sections

## 🏗️ Project Structure

```
3D-AI-Agent/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Home screen with 3D agent
│   │   ├── customize.tsx  # Agent customization
│   │   └── explore.tsx    # Additional features
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── Themed*.tsx       # Themed components
├── services/             # API services
│   └── ragService.ts     # RAG implementation
├── constants/            # App constants
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
└── assets/              # Static assets
```

## 🔧 Configuration

### API Keys Setup

1. **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/)
2. **Tavily API Key**: Get from [Tavily AI](https://tavily.com/)

### Environment Variables

The application uses the following environment variables:

- `TAVILY_API_KEY`: Your Tavily search API key
- `OPENAI_API_KEY`: Your OpenAI API key

## 🎨 Customization

### 3D Avatar

Modify the `Avatar3D` component in `app/(tabs)/index.tsx` to customize:
- Avatar appearance (colors, geometry)
- Animation behaviors
- Lighting and materials

### Chat Interface

Customize the chat experience by modifying:
- Message styling in the StyleSheet
- Color themes in `constants/Colors.ts`
- UI components in the `components/` directory

## 🔒 Security

- API keys are stored in environment variables
- Never commit `.env` files to version control
- Keys are not exposed in the client-side code
- Secure communication with external APIs

## 📋 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Commit: `git commit -m 'Add new feature'`
5. Push: `git push origin feature/new-feature`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **API Keys Not Working**: Ensure your `.env` file is in the root directory and contains valid keys
2. **3D Rendering Issues**: Check device compatibility with WebGL/Three.js
3. **Network Errors**: Verify internet connection and API endpoints

### Support

For support and questions:
- Open an issue in the GitHub repository
- Check the Expo documentation
- Review the Three.js documentation

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Tavily for search API
- Expo team for the development platform
- Three.js community for 3D graphics support
- React Native community for mobile development tools

---

Built with ❤️ using React Native, Expo, and Three.js