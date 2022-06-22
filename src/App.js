import logo from './logo.svg';
import './App.css';
import Register from './components/register/register';
import Login from './components/login/login';
import Upload from './components/upload/upload';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
// import ProtectedRoute from './components/register/ProtectedRoute';
import { UserAuthContextProvider } from './components/register/userAuthContext';
function App() {
  return (
    <>
      <BrowserRouter>
      <UserAuthContextProvider>
      <Routes>
        <Route exact path='/' element={<Register/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/uploadImages' element={<Upload/>}></Route>
      </Routes>
      </UserAuthContextProvider>
   
      </BrowserRouter>
    </>

  );
}

export default App;
