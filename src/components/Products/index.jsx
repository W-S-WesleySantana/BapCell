
import { Section, Grid, Card } from './styles';

export function Products({ items }) {
  const phoneNumber = "5511999999999";

  return (
    <Section id="produtos">
      <h2>Acessórios e Peças em Destaque</h2>
      <p className="subtitle">Produtos garantidos e com pronta entrega</p>
      <Grid>
        {items.map((product) => (
          <Card key={product.id}>
            <img src={product.image || "https://via.placeholder.com/200?text=Sem+Foto"} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">{product.price}</p>
            <a 
              href={`https://wa.me/${phoneNumber}?text=Olá BapCell! Tenho interesse no produto: ${product.name} (${product.price})`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Comprar no WhatsApp
            </a>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}