/**
 * ====================================================================
 * 🎯 LAYOUT ROOT PERSONALIZADO
 * ====================================================================
 * 
 * Este arquivo resolve o bug do DefaultNavigator do Expo Router
 * que tentava passar 'style' para React.Fragment em Android edge-to-edge.
 * 
 * 🐛 Bug corrigido: "Invalid prop `style` supplied to `React.Fragment`"
 * ✅ Solução: Layout root customizado com SafeAreaProvider
 * 🎨 Design limpo e moderno
 * ====================================================================
 */

import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Platform, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * 🎨 Layout principal da aplicação
 * Background com gradiente sutil e elegante
 */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* StatusBar sem backgroundColor para edge-to-edge */}
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#667eea', '#764ba2', '#6B73FF']}
        style={styles.container}
      >
        {/* View para colorir área do StatusBar em edge-to-edge */}
        <View style={styles.statusBarBackground} />
        
        {/* Wrapper condicional baseado na plataforma */}
        {Platform.OS === 'android' ? (
          // Android: View com padding para status bar
          <View style={styles.androidWrapper}>
            <Slot />
          </View>
        ) : (
          // iOS: SafeAreaView padrão
          <SafeAreaView style={styles.iosWrapper}>
            <Slot />
          </SafeAreaView>
        )}
      </LinearGradient>
    </SafeAreaProvider>
  );
}

// 🎨 Estilos limpos e modernos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'android' ? 35 : 0, // StatusBar height
    backgroundColor: '#667eea',
    zIndex: 1,
  },
  
  androidWrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 0, // StatusBar height
  },
  
  iosWrapper: {
    flex: 1,
  },
});
