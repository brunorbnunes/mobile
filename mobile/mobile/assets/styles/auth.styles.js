import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * ====================================================================
 * 🎨 ESTILOS MODERNOS E ELEGANTES - AUTH SCREENS
 * ====================================================================
 * 
 * Design System baseado em:
 * - Gradientes modernos
 * - Sombras suaves
 * - Bordas arredondadas
 * - Tipografia elegante
 * - Responsividade
 * ====================================================================
 */

export const authStyles = StyleSheet.create({
  // 🌟 Container principal com gradiente
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Permitir gradiente do layout
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  // 🏆 Card principal de login/cadastro
  loginCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 16,
  },

  // 🎯 Logo/Ícone da aplicação
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },

  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#667eea', // Cor sólida ao invés de gradiente CSS
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },

  // 📝 Campos de entrada modernos
  inputGroup: {
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
  },

  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  inputFocused: {
    borderColor: '#667eea',
    backgroundColor: '#fff',
    shadowColor: '#667eea',
    shadowOpacity: 0.15,
  },

  // 🚀 Botões elegantes
  button: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },

  primaryButton: {
    backgroundColor: '#667eea',
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#667eea',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },

  secondaryButtonText: {
    color: '#667eea',
  },

  // 🎨 Títulos e textos
  title: {
    fontSize: width < 350 ? 24 : 28,
    fontWeight: '800',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 32,
    lineHeight: 24,
  },

  // ⚠️ Mensagens de erro elegantes
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },

  errorText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  // 🔗 Links e navegação
  link: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
  },

  // 📱 Componentes específicos
  pickerContainer: {
    marginBottom: 20,
    width: '100%',
  },

  picker: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },

  spacer: {
    height: 20,
  },

  // 🎭 Modal moderno
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 24,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },

  // 👤 Lista de usuários
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  userItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },

  actionBtn: {
    backgroundColor: '#667eea',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 12,
  },

  actionBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // 🎉 Estados de loading
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
  },

  // 📊 Cards de dashboard
  dashboardCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },

  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },

  // 🏠 Estilos para AdminStack moderno
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  welcomeText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },

  userNameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },

  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 24,
    marginBottom: 16,
  },

  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  menuContent: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },

  menuSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },

  statsContainer: {
    marginTop: 16,
    marginBottom: 32,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 6,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginTop: 8,
  },

  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },

  // 🎯 Chips para seleção de roles
  roleChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#f8fafc',
    marginRight: 8,
    marginBottom: 8,
  },

  roleChipSelected: {
    borderColor: '#667eea',
    backgroundColor: '#667eea',
  },

  roleChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },

  roleChipTextSelected: {
    color: '#fff',
  },
});
