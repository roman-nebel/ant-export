import * as components from './components';

function keyExtractor(str) {
  return str.split('#', 1)[0];
}

function stringToBoolean(str) {
  if (!str) return null;
  if (str === 'true') {
    return true;
  } else if (str === 'false') {
    return false;
  }

  return str;
}

function initComponent(name: string) {
  if (!name) return null;
  return Object.assign({}, components[name.toLowerCase()] || null);
}

export function prepareComponentParameters(name: string, data: Object) {
  const newComponent = initComponent(name);

  if (!newComponent) return;

  Object.entries(data).forEach(([key, value]) => {
    key = keyExtractor(key.toLowerCase());

    if (key === 'label') {
      newComponent[key] = value?.value;
    } else if (newComponent.attr.hasOwnProperty(key)) {
      newComponent.attr[key] = stringToBoolean(value?.value?.toLowerCase());
    }
  });

  Object.entries(newComponent.attr).forEach(([key, value]) => {
    if (!value) delete newComponent.attr[key];
  });

  return newComponent;
}

export function createComponent({ el, label, children, attr = {} }) {
  const attrString = Object.entries(attr)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  return `<${el}${attrString.length > 0 ? ' ' + attrString : ''}${
    label ? `>${label}</${el}>` : children ? `>{${children}}</${el}>` : ' />'
  }`;
}
