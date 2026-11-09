import React from 'react';
import { CompanyPhilosophy, CompanyPhilosophyProps } from './CompanyPhilosophy';

export type MasterPersonaProps = CompanyPhilosophyProps;

export const MasterPersona: React.FC<MasterPersonaProps> = (props) => {
  return <CompanyPhilosophy {...props} />;
};
