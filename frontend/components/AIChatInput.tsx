import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onSend: (text: string) => void;
  suggestions?: string[];
}

export const AIChatInput = ({ onSend, suggestions = [] }: Props) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSend(inputText);
    setInputText('');
  };

  const handleSuggestionPress = (text: string) => {
    setInputText(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // ヘッダーやタブの高さに合わせて調整
      style={styles.container}
    >
      {suggestions.length > 0 && (
        <View style={styles.suggestionContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionContent}
          >
            {suggestions.map((text, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.suggestionChip}
                onPress={() => handleSuggestionPress(text)}
              >
                <Text style={styles.suggestionText}>{text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.inputBar}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="メッセージを入力..."
          placeholderTextColor="#999"
          multiline
          maxLength={1000}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} 
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  suggestionContainer: {
    paddingVertical: 12,
  },
  suggestionContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  suggestionText: {
    fontSize: 13,
    color: '#333',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 10 : 16,
    paddingTop: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 44,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#DA8B3C',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
});