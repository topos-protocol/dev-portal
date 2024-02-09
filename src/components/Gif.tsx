import React from 'react';
import toposZkEvmDemoInstall from '../../content/images/topos-zkevm-demo-install.gif';
import toposZkEvmDemoExecute from '../../content/images/topos-zkevm-demo-execute.gif';
import toposZkEvmDemoGenerateMerkleProof from '../../content/images/topos-zkevm-demo-generate-merkle-proof.gif';
import toposZkEvmDemoGenerateZkProof from '../../content/images/topos-zkevm-demo-generate-zk-proof.gif';
import toposZkEvmDemoVerifyMerkleProof from '../../content/images/topos-zkevm-demo-verify-merkle-proof.gif';
import toposZkEvmDemoVerifyZkProof from '../../content/images/topos-zkevm-demo-verify-zk-proof.gif';
import transparent from '../../content/images/transparent.gif';

interface GifProps {
  image: string;
  description?: string;
  style?: React.CSSProperties;
}

const imageSrc = (label) => {
  switch (label) {
    case 'topos-zkevm-demo-install':
      return toposZkEvmDemoInstall;
    case 'topos-zkevm-demo-execute':
      return toposZkEvmDemoExecute;
    case 'topos-zkevm-demo-generate-merkle-proof':
      return toposZkEvmDemoGenerateMerkleProof;
    case 'topos-zkevm-demo-generate-zk-proof':
      return toposZkEvmDemoGenerateZkProof;
    case 'topos-zkevm-demo-verify-merkle-proof':
      return toposZkEvmDemoVerifyMerkleProof;
    case 'topos-zkevm-demo-verify-zk-proof':
      return toposZkEvmDemoVerifyZkProof;
    default:
      return transparent;
  }
};

export const Gif: React.FC<GifProps> = ({ image, description, style }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={imageSrc(image)} alt={description} style={style} />
    </div>
  );
};
