export default (title: string) =>
  title
    .replace(/[^a-z|A-Z|0-9]/g, '-')
    .replace(/-{2,}/g, '-')
    .toLowerCase();
