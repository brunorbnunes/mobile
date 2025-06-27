import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../AuthContext';
import { authStyles } from '../../assets/styles/auth.styles';

/**
 * 🎓 TELA INICIAL DO ALUNO - DESIGN MODERNO
 */
const AlunoHome = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout }
      ]
    );
  };

  const menuItems = [
    {
      title: 'Minhas Matérias',
      subtitle: 'Visualizar disciplinas matriculadas',
      icon: 'book-outline',
      color: '#6B73FF',
      screen: null
    },
    {
      title: 'Frequência',
      subtitle: 'Consultar histórico de presença',
      icon: 'calendar-outline',
      color: '#50c878',
      screen: null
    },
    {
      title: 'Notas',
      subtitle: 'Acompanhar desempenho acadêmico',
      icon: 'trending-up-outline',
      color: '#ff6b6b',
      screen: null
    },
    {
      title: 'Horários',
      subtitle: 'Consultar grade de horários',
      icon: 'time-outline',
      color: '#ffa726',
      screen: null
    }
  ];

  return (
    <SafeAreaView style={authStyles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header com informações do aluno */}
      <View style={authStyles.headerContainer}>
        <View style={authStyles.userInfo}>
          <View style={[authStyles.avatarContainer, { backgroundColor: '#6B73FF' }]}>
            <Ionicons name="person" size={24} color="#fff" />
          </View>
          <View>
            <Text style={authStyles.welcomeText}>Olá, Estudante!</Text>
            <Text style={authStyles.userNameText}>{user?.nome || 'Aluno'}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={authStyles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Menu de opções do aluno */}
      <ScrollView 
        style={authStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={authStyles.sectionTitle}>Portal do Estudante</Text>
        
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[authStyles.menuCard, { borderLeftColor: item.color }]}
            onPress={() => {
              Alert.alert('Em breve', 'Esta funcionalidade será implementada em breve!');
            }}
            activeOpacity={0.7}
          >
            <View style={[authStyles.menuIcon, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon as any} size={24} color="#fff" />
            </View>
            
            <View style={authStyles.menuContent}>
              <Text style={authStyles.menuTitle}>{item.title}</Text>
              <Text style={authStyles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}

        {/* Card de status acadêmico */}
        <View style={authStyles.statsContainer}>
          <Text style={authStyles.sectionTitle}>Status Acadêmico</Text>
          
          <View style={authStyles.statsRow}>
            <View style={[authStyles.statCard, { backgroundColor: '#6B73FF' }]}>
              <Ionicons name="book" size={28} color="#fff" />
              <Text style={authStyles.statNumber}>0</Text>
              <Text style={authStyles.statLabel}>Matérias</Text>
            </View>
            
            <View style={[authStyles.statCard, { backgroundColor: '#50c878' }]}>
              <Ionicons name="checkmark-circle" size={28} color="#fff" />
              <Text style={authStyles.statNumber}>-%</Text>
              <Text style={authStyles.statLabel}>Frequência</Text>
            </View>
          </View>
        </View>

        {/* Card informativo */}
        <View style={[authStyles.dashboardCard, { marginBottom: 32 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="information-circle" size={24} color="#667eea" />
            <Text style={[authStyles.cardTitle, { marginLeft: 8, marginBottom: 0 }]}>
              Bem-vindo ao Sistema!
            </Text>
          </View>
          <Text style={authStyles.cardDescription}>
            Aqui você poderá acompanhar suas matérias, consultar notas, verificar frequência e muito mais. 
            As funcionalidades estão sendo desenvolvidas para oferecer a melhor experiência acadêmica.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STACK DO ALUNO ---
const Stack = createNativeStackNavigator();

export default function AlunoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6B73FF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name="AlunoHome"
        component={AlunoHome}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}
