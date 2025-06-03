import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Layout from './components/Layout';
import GpuPage from './pages/products/GpuPage';
import StoragePage from './pages/products/StoragePage';
import ProductDetailsPage from './pages/products/ProductDetailsPage';
import { CustomThemeProvider } from './theme/ThemeContext';
import PCBuilderPage from './pages/PCBuilder';
import LoginPage from './pages/authentication/login';
import Register from './pages/authentication/register';
import CpuPage from './pages/products/CpuPage';
import MotherboardPage from './pages/products/MotherboardPage';
import CoolerPage from './pages/products/CoolerPage';
import CasePage from './pages/products/CasePage';
import MemoryPage from './pages/products/MemoryPage';
import PowerSupplyPage from './pages/products/PowerSupply';

function App() {
  return (
     <CustomThemeProvider>
  <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />   
        <Route path='gpu'  element={<GpuPage/>} />
        <Route path='cpu'  element={<CpuPage/>} />
        <Route path='motherboard'  element={<MotherboardPage/>} />
        <Route path='cooler'  element={<CoolerPage/>} />
        <Route path='hard-drive'  element={<StoragePage/>} />
         <Route path='case'  element={<CasePage/>} />
          <Route path='ram'  element={<MemoryPage/>} />
          <Route path='power-supply'  element={<PowerSupplyPage/>} />
         <Route path='/pcbuilder' element={<PCBuilderPage/>}/>
         <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Route>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </CustomThemeProvider>
  )
}

export default App
