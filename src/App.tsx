import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Layout from './components/Layout';
import CpuPage from './pages/products/CpuPage';
import GpuPage from './pages/products/GpuPage';
import MotherboardPage from './pages/products/MotherboardPage';
import CoolerPage from './pages/products/CoolerPage';
import CasePage from './pages/products/CasePage';
import MemoryPage from './pages/products/MemoryPage';
import StoragePage from './pages/products/StoragePage';
import PowerSupplyPage from './pages/products/PowerSupplyPage';

function App() {
  return (
  <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='cpus'  element={<CpuPage/>} />
        <Route path='gpus'  element={<GpuPage/>} />
        <Route path='coolers'  element={<CoolerPage/>} />
        <Route path='cases'  element={<CasePage/>} />
        <Route path='memory'  element={<MemoryPage/>} />
        <Route path='storage'  element={<StoragePage/>} />
        <Route path='motherboards'  element={<MotherboardPage/>} />
         <Route path='powersupply'  element={<PowerSupplyPage/>} />
      </Route>
    </Routes>
  )
}

export default App
