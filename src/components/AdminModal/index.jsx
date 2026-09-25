import { useState } from 'react';
import { supabase } from '../../supabaseClient';
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
  const [loading, setLoading] = useState(false);

  // Troca de Senha
  const [newPass, setNewPass] = useState('');

  // Formulário Produto
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodFile, setProdFile] = useState(null);

  // Formulário Trabalho
  const [workTitle, setWorkTitle] = useState('');
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);

  // Formatação monetária em Reais (R$)
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

  // Função genérica de envio de imagem para o Supabase Storage
  const uploadImage = async (file) => {
    if (!file) return '';
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const { error: uploadError } = await supabase.storage
      .from('produtos')
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      throw new Error('Erro ao enviar imagem para a nuvem.');
    }

    const { data: publicUrlData } = supabase.storage
      .from('produtos')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
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

  const handleCreateProduct = async () => {
    if (!prodName || !prodPrice) {
      alert('Preencha o nome e o preço do produto!');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = '';
      if (prodFile) {
        imageUrl = await uploadImage(prodFile);
      }

      const { data, error } = await supabase
        .from('products')
        .insert([{ name: prodName, price: prodPrice, image: imageUrl }])
        .select();

      if (error) throw error;

      onAddProduct(data[0]);
      setProdName('');
      setProdPrice('');
      setProdFile(null);
      alert('Produto cadastrado e salvo com sucesso!');
    } catch (err) {
      alert(err.message || 'Erro ao cadastrar produto.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWork = async () => {
    if (!workTitle) {
      alert('Preencha o título do serviço!');
      return;
    }

    setLoading(true);
    try {
      let beforeUrl = '';
      let afterUrl = '';

      if (beforeFile) beforeUrl = await uploadImage(beforeFile);
      if (afterFile) afterUrl = await uploadImage(afterFile);

      const { data, error } = await supabase
        .from('works')
        .insert([{ title: workTitle, before_img: beforeUrl, after_img: afterUrl }])
        .select();

      if (error) throw error;

      onAddWork(data[0]);
      setWorkTitle('');
      setBeforeFile(null);
      setAfterFile(null);
      alert('Serviço cadastrado e salvo com sucesso!');
    } catch (err) {
      alert(err.message || 'Erro ao cadastrar serviço.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {!authenticated ? (
          <div>
            <h2>Painel Administrativo BapCell</h2>
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
                    onChange={(e) => setProdFile(e.target.files[0])} 
                  />
                </div>
                <button onClick={handleCreateProduct} disabled={loading}>
                  {loading ? 'Enviando...' : 'Cadastrar Produto'}
                </button>

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
                <h3>Adicionar Serviço Feito (Antes e Depois)</h3>
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
                    onChange={(e) => setBeforeFile(e.target.files[0])} 
                  />
                </div>
                <div className="file-input">
                  <label>Foto do DEPOIS:</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setAfterFile(e.target.files[0])} 
                  />
                </div>
                <button onClick={handleCreateWork} disabled={loading}>
                  {loading ? 'Enviando...' : 'Cadastrar Serviço'}
                </button>

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
                <h3>Alterar Senha de Acesso</h3>
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