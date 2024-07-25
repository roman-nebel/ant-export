import React, { useState } from 'react';
import '../styles/ui.css';

function App() {
  const [components, setComponents] = useState<any>();

  const onGetComponent = () => {
    parent.postMessage({ pluginMessage: { type: 'get_component' } }, '*');
  };

  React.useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'send_component') {
        setComponents(message.components);
      }
    };
  }, []);
  return (
    <div>
      <h2>Ant Export</h2>
      <button id="get_component" onClick={onGetComponent}>
        Get component
      </button>
      <p>Components:</p>
      <div>
        {components &&
          components.map((component) => (
            <pre>
              <code>{component.component}</code>
            </pre>
          ))}
      </div>
    </div>
  );
}

export default App;
