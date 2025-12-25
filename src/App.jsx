import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  return (
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail-produk/:id" element={<Detail />} />
        </Routes>
      </div>
  );
}

export default App;