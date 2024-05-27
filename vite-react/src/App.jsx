import './styles/App.css';
import Form from './components/Form.jsx';
import WelcomeModal from './components/WelcomeModal.jsx';
import { useState } from 'react';


function App() {
  const [uniStyle, setUniStyle] = useState(null)
  return (
    <div
      className=
        { "App " + (uniStyle ? uniStyle : null) }
    >
      <header
        className=
          { "App-header " + (uniStyle ? uniStyle + "-header" : null) }
      >
        <img className="mt-3 hero" src="./calends512.png" alt="logo" />
      </header>
      <div
        className=
          { "fade-border " +
            (uniStyle ? "fade-border-" + uniStyle : null) }
      >
        <h1>Calends Online</h1>
      </div>
      <main>
        <button
          type="button"
          className=
            { "btn btn-primary " + (uniStyle ? "btn-" + uniStyle : null) }
          data-bs-toggle="modal"
          data-bs-target="#welcomeModal">
            About
        </button>
        <WelcomeModal uniStyle={uniStyle} />
        <div id="App-box" className="container mx-auto col m-3">
          <Form uniStyle={uniStyle} setUniStyle={setUniStyle} />
        </div>

      </main>
      <footer>
        <a href="https://github.com/jonalfarlinga/calends-lite">Calends Github Project</a>
        <a href="https://commons.wikimedia.org/wiki/File:Museo_del_Teatro_Romano_de_Caesaraugusta.43.jpg">Museo del Teatro Romano de Caesaraugusta.43.jpg</a> from Wikipedia.org
      </footer>
    </div>
  );
}

export default App;
