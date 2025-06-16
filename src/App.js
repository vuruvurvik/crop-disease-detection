import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import CropDiseaseBlog from "./components/Blog";
import Casestudies from "./components/Casestudies";
import CropDiseaseDetection from "./components/User";
import CropDiseaseManagement from "./components/CropDiseaseManagement";

function App() {
  return (
    <Routes>
      <Route path="/casestudies" element={<Casestudies />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/' element={<Home/>}/>
      <Route path="/blog" element={<CropDiseaseBlog />} />
      <Route path="/user" element={<CropDiseaseDetection/>}/>
      <Route path="/crop-disease-management" element={<CropDiseaseManagement />} />
    </Routes>
  );
}

export default App;
