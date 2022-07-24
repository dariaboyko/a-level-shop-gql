import NavigationCategory from './components/NavigationCategory';
import MainContentWrapper from './components/MainContentWrapper';
import SamsungProducts from "./components/SamsungProducts";
import IphoneProducts from "./components/IphoneProducts";
import AllProducts from './components/AllProducts';
import './App.css';
import { Route, Routes } from "react-router-dom";
function App({valueCurrency}) {
  return (
    <MainContentWrapper>
      <NavigationCategory valueCurrency={valueCurrency} />
      <Routes>
        <Route path="/all/*" element={<AllProducts/>}/>
        <Route path="/samsung/*" element={<SamsungProducts />} />
        <Route path="/iphone/*" element={<IphoneProducts />} />
      </Routes>
    </MainContentWrapper>
  );
}

export default App;
