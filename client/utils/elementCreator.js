export function createAnElement(type, attrs, children) {
  const el = document.createElement(type);
  if (attrs) Object.keys(attrs).forEach((attr) => (el[attr] = attrs[attr]));
  if (children) children.forEach((child) => el.append(child));
  return el;
}
