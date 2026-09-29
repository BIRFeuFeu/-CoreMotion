import type { Metadata } from 'next';
import CaseStudyPresentation from './presentation';

export const metadata: Metadata = {
  title: 'Diagrama de Casos de Uso | CoreMotiom',
  description:
    'Apresentação do diagrama UML de casos de uso do CoreMotiom: 17 casos, 5 atores e os limites do protótipo esportivo.',
};

export default function PresentationPage() {
  return <CaseStudyPresentation />;
}
