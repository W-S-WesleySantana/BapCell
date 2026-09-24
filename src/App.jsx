import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, darkTheme, lightTheme } from './styles/GlobalStyles';
import { Navbar } from './components/Navbar';
import { Budget } from './components/Budget';
import { Products } from './components/Products';
import { Gallery } from './components/Gallery';
import { AdminModal } from './components/AdminModal';

// Ícone SVG nativo do Instagram (Mesmo estilo visual e peso do Lucide)
const InstagramIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://w3.org"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Tema Claro / Escuro
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('bapcell_theme') || 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextTheme);
    localStorage.setItem('bapcell_theme', nextTheme);
  };

  // Senha do Administrador
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('bapcell_admin_password') || 'admin123';
  });

  const handleChangePassword = (newPass) => {
    setAdminPassword(newPass);
    localStorage.setItem('bapcell_admin_password', newPass);
  };

  // Lista de Produtos
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('bapcell_products');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Película de Vidro 3D', price: 'R$ 25,00', image: '' },
      { id: 2, name: 'Carregador Turbo Type-C', price: 'R$ 80,00', image: '' },
      { id: 3, name: 'Cabo Lightning iPhone', price: 'R$ 45,00', image: '' },
      { id: 4, name: 'Capinha Anti-Impacto', price: 'R$ 35,00', image: '' }
    ];
  });

  // Lista de Trabalhos
  const [works, setWorks] = useState(() => {
    const saved = localStorage.getItem('bapcell_works');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Troca de Tela Moto G30', beforeImg: '', afterImg: '' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('bapcell_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bapcell_works', JSON.stringify(works));
  }, [works]);

  const handleAddProduct = (newProd) => setProducts([newProd, ...products]);
  const handleDeleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

  const handleAddWork = (newWork) => setWorks([newWork, ...works]);
  const handleDeleteWork = (id) => setWorks(works.filter(w => w.id !== id));

  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        theme={themeMode}
        toggleTheme={toggleTheme}
      />
      
      <main>
        <Budget />
        <Products items={products} />
        <Gallery works={works} />
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        background: currentTheme.cardBg, 
        marginTop: '3rem',
        borderTop: `1px solid ${currentTheme.border}`
      }}>
        <p style={{ color: currentTheme.subText }}>© BapCell - Assistência Técnica Especializada</p>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: currentTheme.accent, marginTop: '0.5rem', fontWeight: 600 }}
        >
          {/* Usando o componente SVG atualizado */}
          <InstagramIcon size={18} /> Siga nosso Instagram
        </a>
      </footer>

      {isAdminOpen && (
        <AdminModal 
          onClose={() => setIsAdminOpen(false)} 
          adminPassword={adminPassword}
          onChangePassword={handleChangePassword}
          products={products}
          works={works}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddWork={handleAddWork}
          onDeleteWork={handleDeleteWork}
        />
      )}
    </ThemeProvider>
  );
}
