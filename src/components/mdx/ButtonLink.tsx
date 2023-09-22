import React from 'react';
import { navigate } from 'gatsby';
import { Button } from '../Button';

interface ButtonLinkProps {
  to: string;
  label: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ to, label }) => {
  return (
    <Button type="button" role="link" onClick={() => navigate(to)}>
      {label}
    </Button>
  );
};
