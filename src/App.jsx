import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, darkTheme, lightTheme } from './styles/GlobalStyles';
import { Navbar } from './components/Navbar';
import { Budget } from './components/Budget';
import { Products } from './components/Products';
import { Gallery } from './components/Gallery';
import { AdminModal } from './components/AdminModal';
import { supabase } from './supabaseClient';
import { Camera } from 'lucide-react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [works, setWorks] = useState([]);

  // Modo de tema (Claro / Escuro)
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

  useEffect(() => {
  
    const loadData = async () => {
      try {
       
        const [prodResponse, workResponse] = await Promise.all([
          supabase.from('products').select('*').order('id', { ascending: false }),
          supabase.from('works').select('*').order('id', { ascending: false })
        ]);
  
        if (prodResponse.data) {
          setProducts(prodResponse.data);
        }
        
        if (workResponse.data) {
          setWorks(workResponse.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do Supabase:", error);
      }
    };
  
    loadData();
  }, []); 
  
  const handleAddWork = (newWork) => setWorks([newWork, ...works]);

  const handleAddProduct = (newProduct) => setProducts([newProduct, ...products]);

  const handleDeleteWork = async (id) => {
    const { error } = await supabase.from('works').delete().eq('id', id);
    if (!error) {
      setWorks(works.filter((w) => w.id !== id));
      alert('Serviço removido com sucesso!');
    }
  };

  const handleDeleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(products.filter((p) => p.id !== id));
      alert('Produto removido com sucesso!');
    }
  };

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
          <Camera size={18} /> Siga nosso Instagram
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