
import { Section, Grid, WorkCard } from './styles';

export function Gallery({ works }) {
  return (
    <Section id="galeria">
      <h2>Galeria de Reparos</h2>
      <p className="subtitle">Confira o resultado dos nossos serviços de antes e depois</p>
      <Grid>
        {works.map((work) => (
          <WorkCard key={work.id}>
            <h3>{work.title}</h3>
            <div className="images">
              <div>
                <span>Antes</span>
                <img src={work.before_img || work.beforeImg || "https://via.placeholder.com/150?text=Antes"} alt="Antes" />
              </div>
              <div>
                <span>Depois</span>
                <img src={work.after_img || work.afterImg || "https://via.placeholder.com/150?text=Depois"} alt="Depois" />
              </div>
            </div>
          </WorkCard>
        ))}
      </Grid>
    </Section>
  );
}