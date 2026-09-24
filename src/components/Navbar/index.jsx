
import { Header, Logo, NavLinks, ActionGroup, IconButton, AdminButton } from './styles';
import { Lock, Sun, Moon } from 'lucide-react';

export function Navbar({ onOpenAdmin, theme, toggleTheme }) {
  return (
    <Header>
      <Logo>Bap<span>Cell</span></Logo>
      <NavLinks>
        <a href="#orcamento">Orçamento</a>
        <a href="#produtos">Acessórios & Peças</a>
        <a href="#galeria">Serviços</a>
      </NavLinks>
      <ActionGroup>
        <IconButton onClick={toggleTheme} title="Alternar tema">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </IconButton>
        <AdminButton onClick={onOpenAdmin}>
          <Lock size={16} /> Painel Admin
        </AdminButton>
      </ActionGroup>
    </Header>
  );
}