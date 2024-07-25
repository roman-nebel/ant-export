import { createComponent, prepareComponentParameters } from './componentPresets';

figma.showUI(__html__);

function getComponents() {
  const selectedNodes = figma.currentPage.selection;
  const selectedInstances = selectedNodes.filter((el) => el.type === 'INSTANCE');

  const components = selectedInstances.map((component: InstanceNode) => {
    const { componentProperties, mainComponent } = component;
    const componentName = mainComponent.parent?.name;

    const componentParams = prepareComponentParameters(componentName.toLowerCase(), componentProperties);

    return {
      name: componentName,
      params: componentParams,
      component: createComponent(componentParams),
    };
  });

  return components;
}

figma.ui.onmessage = (msg) => {
  if (msg.type === 'get_component') {
    const components = getComponents();

    figma.ui.postMessage({
      type: 'send_component',
      message: {
        components,
      },
    });
  }
};
