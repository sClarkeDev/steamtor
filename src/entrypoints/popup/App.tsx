import { useStorageItem } from '~/hooks/useStorageItem';
import { proxyItem } from '~/storage';

function App() {
  const [proxy, setProxy] = useStorageItem(proxyItem);

  return (
    <div className="container">
      <div className="brand">
        <a href="https://github.com/sclarkedev/steamtor">SteamTOR</a>
      </div>

      <div className="section-container">
        <div className="section-container_header">
          <p className="label">Proxy URL</p>
        </div>
        <input id="input" value={proxy} onChange={(e) => setProxy(e.target.value)} disabled />
      </div>
    </div>
  );
}

export default App;
