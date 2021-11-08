
import './App.css';
import{BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Nevbar from './components/Nevbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Nevbar/>
    <hr/>
  
     <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <PrivateRoute path='/login' element={<Home/>}></PrivateRoute>
        <PrivateRoute path='/profile' element={<Profile/>}></PrivateRoute>
      
    </Routes>
       
    </BrowserRouter>
    </AuthProvider>
    // <div>home </div>
  );
}

export default App;
