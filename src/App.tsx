import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Layout from './components/Layout';
import GpuPage from './pages/products/GpuPage';
import StoragePage from './pages/products/StoragePage';
import ProductDetailsPage from './pages/products/ProductDetailsPage';
import { CustomThemeProvider } from './theme/ThemeContext';
import PCBuilderPage from './pages/PCBuilder';
import LoginPage from './pages/login';
import Register from './pages/register';

function App() {
  return (
     <CustomThemeProvider>
  <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />   
        <Route path='gpus'  element={<GpuPage/>} />
        <Route path='storage'  element={<StoragePage/>} />
         <Route path='pcbuilder' element={<PCBuilderPage/>}/>
         <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Route>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='register' element={<Register/>}/>
    </Routes>
    </CustomThemeProvider>
  )
}

export default App
