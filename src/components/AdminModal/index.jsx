import { useState } from 'react';
import { ModalOverlay, ModalContent, ItemList, TabContainer } from './styles';

export function AdminModal({ 
  onClose, 
  adminPassword, 
  onChangePassword,
  products, 
  works, 
  onAddProduct, 
  onDeleteProduct, 
  onAddWork, 
  onDeleteWork 
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [inputPass, setInputPass] = useState('');
  const [activeTab, setActiveTab] = useState('products');

  // Troca de Senha
  const [newPass, setNewPass] = useState('');

  // Formulário Produto
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodImageBase64, setProdImageBase64] = useState('');

  // Formulário Trabalho
  const [workTitle, setWorkTitle] = useState('');
  const [beforeBase64, setBeforeBase64] = useState('');
  const [afterBase64, setAfterBase64] = useState('');

  // Função para formatar preço em Reais (R$)
  const formatCurrency = (value) => {
    const raw = value.replace(/\D/g, '');
    if (!raw) return '';
    const numeric = (parseFloat(raw) / 100).toFixed(2);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numeric);
  };

  const handlePriceChange = (e) => {
    setProdPrice(formatCurrency(e.target.value));
  };

  // Leitor de arquivo local (Upload em Base64)
  const handleFileUpload = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = () => {
    if (inputPass === adminPassword) {
      setAuthenticated(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleChangePass = () => {
    if (newPass.length < 4) {
      alert('A nova senha deve ter no mínimo 4 caracteres.');
      return;
    }
    onChangePassword(newPass);
    setNewPass('');
    alert('Senha alterada com sucesso!');
  };

  const handleCreateProduct = () => {
    if (!prodName || !prodPrice) {
      alert('Preencha o nome e o preço!');
      return;
    }
    onAddProduct({
      id: Date.now(),
      name: prodName,
      price: prodPrice,
      image: prodImageBase64,
    });
    setProdName('');
    setProdPrice('');
    setProdImageBase64('');
    alert('Produto cadastrado com sucesso!');
  };

  const handleCreateWork = () => {
    if (!workTitle) {
      alert('Preencha o título do serviço!');
      return;
    }
    onAddWork({
      id: Date.now(),
      title: workTitle,
      beforeImg: beforeBase64,
      afterImg: afterBase64,
    });
    setWorkTitle('');
    setBeforeBase64('');
    setAfterBase64('');
    alert('Serviço cadastrado com sucesso!');
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {!authenticated ? (
          <div>
            <h2>Painel Administrativo</h2>
            <input 
              type="password" 
              placeholder="Digite a senha de acesso..." 
              value={inputPass} 
              onChange={(e) => setInputPass(e.target.value)} 
            />
            <button onClick={handleLogin}>Acessar</button>
            <button className="close" onClick={onClose}>Cancelar</button>
          </div>
        ) : (
          <div>
            <h2>Gestão do Site BapCell</h2>

            <TabContainer>
              <button 
                className={activeTab === 'products' ? 'active' : ''} 
                onClick={() => setActiveTab('products')}
              >
                Produtos
              </button>
              <button 
                className={activeTab === 'works' ? 'active' : ''} 
                onClick={() => setActiveTab('works')}
              >
                Serviços
              </button>
              <button 
                className={activeTab === 'settings' ? 'active' : ''} 
                onClick={() => setActiveTab('settings')}
              >
                Senha
              </button>
            </TabContainer>

            {activeTab === 'products' && (
              <div>
                <h3>Adicionar Novo Produto</h3>
                <input 
                  type="text" 
                  placeholder="Nome do Produto/Acessório" 
                  value={prodName} 
                  onChange={(e) => setProdName(e.target.value)} 
                />
                <input 
                  type="text" 
                  placeholder="Preço (ex: R$ 50,00)" 
                  value={prodPrice} 
                  onChange={handlePriceChange} 
                />
                <div className="file-input">
                  <label>Foto do Produto:</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileUpload(e.target.files[0], setProdImageBase64)} 
                  />
                </div>
                <button onClick={handleCreateProduct}>Cadastrar Produto</button>

                <h3 style={{ marginTop: '1.5rem' }}>Produtos Cadastrados ({products.length})</h3>
                <ItemList>
                  {products.map((item) => (
                    <div className="item-row" key={item.id}>
                      <span>{item.name} - {item.price}</span>
                      <button onClick={() => onDeleteProduct(item.id)}>Excluir</button>
                    </div>
                  ))}
                </ItemList>
              </div>
            )}

            {activeTab === 'works' && (
              <div>
                <h3>Adicionar Serviço Feito</h3>
                <input 
                  type="text" 
                  placeholder="Título (Ex: Troca de Tela iPhone 11)" 
                  value={workTitle} 
                  onChange={(e) => setWorkTitle(e.target.value)} 
                />
                <div className="file-input">
                  <label>Foto do ANTES:</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileUpload(e.target.files[0], setBeforeBase64)} 
                  />
                </div>
                <div className="file-input">
                  <label>Foto do DEPOIS:</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileUpload(e.target.files[0], setAfterBase64)} 
                  />
                </div>
                <button onClick={handleCreateWork}>Cadastrar Serviço</button>

                <h3 style={{ marginTop: '1.5rem' }}>Serviços Cadastrados ({works.length})</h3>
                <ItemList>
                  {works.map((item) => (
                    <div className="item-row" key={item.id}>
                      <span>{item.title}</span>
                      <button onClick={() => onDeleteWork(item.id)}>Excluir</button>
                    </div>
                  ))}
                </ItemList>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3>Alterar Senha do Administrador</h3>
                <input 
                  type="password" 
                  placeholder="Digite a nova senha..." 
                  value={newPass} 
                  onChange={(e) => setNewPass(e.target.value)} 
                />
                <button onClick={handleChangePass}>Salvar Nova Senha</button>
              </div>
            )}

            <button className="close" onClick={onClose}>Sair do Painel</button>
          </div>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}