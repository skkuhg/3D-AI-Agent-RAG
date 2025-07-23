
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface CustomizationOption {
  id: string;
  title: string;
  icon: string;
}

export default function CustomizeScreen() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const appearanceOptions: CustomizationOption[] = [
    { id: 'outfit', title: 'Outfit', icon: 'chevron.right' },
    { id: 'hair', title: 'Hair', icon: 'chevron.right' },
    { id: 'accessories', title: 'Accessories', icon: 'chevron.right' },
  ];

  const settingsOptions: CustomizationOption[] = [
    { id: 'voice', title: 'Voice', icon: 'chevron.right' },
    { id: 'personality', title: 'Personality', icon: 'chevron.right' },
  ];

  const handleOptionPress = (optionId: string) => {
    // Handle customization option selection
    console.log('Selected option:', optionId);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={24} color="#fff" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerText}>Customize</ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Appearance</ThemedText>
          {appearanceOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionItem}
              onPress={() => handleOptionPress(option.id)}
            >
              <Text style={styles.optionText}>{option.title}</Text>
              <IconSymbol name="chevron.right" size={20} color="#888" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Settings</ThemedText>
          {settingsOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionItem}
              onPress={() => handleOptionPress(option.id)}
            >
              <Text style={styles.optionText}>{option.title}</Text>
              <IconSymbol name="chevron.right" size={20} color="#888" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <IconSymbol name="house.fill" size={24} color="#888" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={24} color="#888" />
          <Text style={styles.navText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <IconSymbol name="chevron.right" size={24} color="#4A90E2" />
          <Text style={[styles.navText, styles.activeNavText]}>Settings</Text>
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
  backButton: {
    padding: 8,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
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
