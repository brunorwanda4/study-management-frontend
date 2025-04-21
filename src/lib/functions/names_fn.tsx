export const formatCollectionName = (name: string) => {
  if (name.endsWith(".role")) {
    return name;
  }
  if (name.startsWith("--")) {
    name = name.slice(2);
  }
  return name.replace(/_/g, " ");
};

export const formatCollectionNameLink = (name: string) => {
  if (name.startsWith("--")) {
    name = name.slice(2);
  }
  return name;
};
