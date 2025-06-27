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
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LancarFrequencia from '../LancarFrequencia';
import { useAuth } from '../../AuthContext';
import { authStyles } from '../../assets/styles/auth.styles';

/**
 * 👨‍🎓 TELA INICIAL DO MONITOR - DESIGN MODERNO
 */
const MonitorHome = () => {
  const navigation = useNavigation<any>();
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
      title: 'Lançar Frequência',
      subtitle: 'Registrar presença dos alunos',
      icon: 'checkmark-circle-outline',
      color: '#50c878',
      screen: 'LancarFrequencia'
    },
    {
      title: 'Relatório de Frequência',
      subtitle: 'Visualizar relatórios de presença',
      icon: 'bar-chart-outline',
      color: '#667eea',
      screen: null
    },
    {
      title: 'Lista de Alunos',
      subtitle: 'Consultar alunos das turmas',
      icon: 'people-outline',
      color: '#764ba2',
      screen: null
    },
    {
      title: 'Configurações',
      subtitle: 'Ajustes do perfil de monitor',
      icon: 'settings-outline',
      color: '#ffa726',
      screen: null
    }
  ];

  return (
    <SafeAreaView style={authStyles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header com informações do monitor */}
      <View style={authStyles.headerContainer}>
        <View style={authStyles.userInfo}>
          <View style={[authStyles.avatarContainer, { backgroundColor: '#50c878' }]}>
            <Ionicons name="ribbon" size={24} color="#fff" />
          </View>
          <View>
            <Text style={authStyles.welcomeText}>Olá, Monitor!</Text>
            <Text style={authStyles.userNameText}>{user?.nome || 'Monitor'}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={authStyles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Menu de opções do monitor */}
      <ScrollView 
        style={authStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={authStyles.sectionTitle}>Painel do Monitor</Text>
        
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[authStyles.menuCard, { borderLeftColor: item.color }]}
            onPress={() => {
              if (item.screen) {
                navigation.navigate(item.screen);
              } else {
                Alert.alert('Em breve', 'Esta funcionalidade será implementada em breve!');
              }
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

        {/* Card de atividades do dia */}
        <View style={authStyles.statsContainer}>
          <Text style={authStyles.sectionTitle}>Atividades de Hoje</Text>
          
          <View style={authStyles.statsRow}>
            <View style={[authStyles.statCard, { backgroundColor: '#50c878' }]}>
              <Ionicons name="today" size={28} color="#fff" />
              <Text style={authStyles.statNumber}>0</Text>
              <Text style={authStyles.statLabel}>Turmas</Text>
            </View>
            
            <View style={[authStyles.statCard, { backgroundColor: '#667eea' }]}>
              <Ionicons name="time" size={28} color="#fff" />
              <Text style={authStyles.statNumber}>0</Text>
              <Text style={authStyles.statLabel}>Frequências</Text>
            </View>
          </View>
        </View>

        {/* Card informativo para monitor */}
        <View style={[authStyles.dashboardCard, { marginBottom: 32 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="star" size={24} color="#50c878" />
            <Text style={[authStyles.cardTitle, { marginLeft: 8, marginBottom: 0 }]}>
              Parabéns, Monitor!
            </Text>
          </View>
          <Text style={authStyles.cardDescription}>
            Como monitor, você desempenha um papel fundamental no apoio às atividades acadêmicas. 
            Use este painel para gerenciar frequências e acompanhar o progresso das turmas.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();

export default function MonitorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#50c878',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name="MonitorHome"
        component={MonitorHome}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="LancarFrequencia" 
        component={LancarFrequencia}
        options={{
          title: 'Lançar Frequência',
          headerBackTitle: 'Voltar'
        }}
      />
    </Stack.Navigator>
  );
}
