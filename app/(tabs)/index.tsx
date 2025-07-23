
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Text3D } from '@react-three/drei';
import * as THREE from 'three';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import RAGService from '@/services/ragService';

const { width, height } = Dimensions.get('window');

// 3D Avatar Component
function Avatar3D({ isListening }: { isListening: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
        if (isListening) {
          meshRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.01) * 0.1);
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, [isListening]);

  return (
    <group>
      {/* Head */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#4A90E2" />
      </mesh>
      <mesh position={[0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#4A90E2" />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, -0.2, 0.8]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </group>
  );
}

// Chat Message Component
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function HomeScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Initialize RAG service with environment variables
  const ragService = new (require('@/services/ragService').default)(
    process.env.TAVILY_API_KEY || '',
    process.env.OPENAI_API_KEY || ''
  );

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setIsListening(true);

    try {
      // Convert messages to conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.text
      }));

      // Process query with RAG
      const { response: aiResponse, sources } = await ragService.processQuery(inputText, conversationHistory);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      Alert.alert('Error', 'Failed to process your message. Please try again.');
    } finally {
      setIsLoading(false);
      setIsListening(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>AI Agent</ThemedText>
        <TouchableOpacity style={styles.settingsButton}>
          <IconSymbol name="chevron.right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 3D Avatar */}
      <View style={styles.avatarContainer}>
        <Canvas style={styles.canvas}>
          <Avatar3D isListening={isListening} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.interactButton]}>
            <Text style={styles.buttonText}>Interact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.customizeButton]}>
            <Text style={styles.buttonText}>Customize</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View key={message.id} style={[
            styles.messageContainer,
            message.isUser ? styles.userMessage : styles.aiMessage
          ]}>
            <Text style={[
              styles.messageText,
              message.isUser ? styles.userMessageText : styles.aiMessageText
            ]}>
              {message.text}
            </Text>
          </View>
        ))}
        {isLoading && (
          <View style={[styles.messageContainer, styles.aiMessage]}>
            <Text style={styles.loadingText}>AI is thinking...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <View style={styles.avatarIcon}>
            <View style={styles.avatarIconInner} />
          </View>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me anything..."
            placeholderTextColor="#888"
            multiline
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity 
            style={styles.voiceButton}
            onPress={handleSendMessage}
            disabled={isLoading}
          >
            <IconSymbol name="paperplane.fill" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <IconSymbol name="house.fill" size={24} color="#4A90E2" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={24} color="#888" />
          <Text style={styles.navText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <IconSymbol name="chevron.right" size={24} color="#888" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2332',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
  },
  avatarContainer: {
    height: height * 0.4,
    position: 'relative',
  },
  canvas: {
    flex: 1,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  actionButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  interactButton: {
    backgroundColor: '#4A90E2',
  },
  customizeButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    borderBottomRightRadius: 5,
    padding: 12,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2a3441',
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    padding: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#e0e0e0',
  },
  loadingText: {
    color: '#888',
    fontStyle: 'italic',
  },
  inputContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#2a3441',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },
  avatarIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIconInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 5,
  },
  voiceButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingBottom: 30,
    backgroundColor: '#1a2332',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    alignItems: 'center',
    gap: 5,
  },
  navText: {
    color: '#888',
    fontSize: 12,
  },
  activeNavText: {
    color: '#4A90E2',
  },
});
