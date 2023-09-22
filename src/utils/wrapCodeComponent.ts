const wrapCodeComponent: () => void = () => {
  const codeComponents: NodeListOf<Element> = document.querySelectorAll(
    '.gatsby-highlight, .gatsby-code-button-container'
  );
  codeComponents.forEach((node: Element) => {
    node.parentElement?.classList.add('code-component-container');
  });
};

export default wrapCodeComponent;
