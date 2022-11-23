import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Hooks
// Components
import { Home } from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
