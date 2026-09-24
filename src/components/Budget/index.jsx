import { useState } from 'react';
import { BudgetContainer, FormGroup, WhatsappButton } from './styles';
import { MessageSquare } from 'lucide-react';

export function Budget() {
  const [model, setModel] = useState('');
  const [issue, setIssue] = useState('');
  const [details, setDetails] = useState('');

  const phoneNumber = "5511951199844"; 

  const handleSend = () => {
    const text = `Olá BapCell! Gostaria de pedir um orçamento.%0A%0A📱 *Modelo:* ${model || 'Não informado'}%0A🛠️ *Defeito:* ${issue || 'Não informado'}%0A📝 *Detalhes:* ${details || 'Nenhum detalhe adicional'}`;
    return `https://wa.me/${phoneNumber}?text=${text}`;
  };

  return (
    <BudgetContainer id="orcamento">
      <h2>Solicite seu Orçamento Grátis</h2>
      <p>Informe os dados do seu aparelho para atendimento direto no WhatsApp</p>

      <FormGroup>
        <label>Modelo do Aparelho:</label>
        <input 
          type="text" 
          placeholder="Ex: iPhone 13, Moto G84, Galaxy S23..." 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
        />

        <label>Defeito / Problema:</label>
        <select value={issue} onChange={(e) => setIssue(e.target.value)}>
          <option value="">Selecione o serviço...</option>
          <option value="Troca de Tela / Visor">Troca de Tela / Visor</option>
          <option value="Troca de Bateria">Troca de Bateria</option>
          <option value="Reparo de Placa">Reparo de Placa</option>
          <option value="Troca de Conector de Carga">Troca de Conector de Carga</option>
          <option value="Troca de Tampa Traseira">Troca de Tampa Traseira</option>
          <option value="Outro Serviço">Outro Serviço</option>
        </select>

        <label>Detalhes Adicionais (opcional):</label>
        <textarea 
          rows="3" 
          placeholder="Descreva o estado do aparelho ou o que ocorreu..." 
          value={details} 
          onChange={(e) => setDetails(e.target.value)}
        />
      </FormGroup>

      <WhatsappButton href={handleSend()} target="_blank" rel="noopener noreferrer">
        <MessageSquare size={20} /> Solicitar Orçamento no WhatsApp
      </WhatsappButton>
    </BudgetContainer>
  );
}