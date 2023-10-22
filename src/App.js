import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

// componentes
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";

// paginas
import Login from "./components/pages/Auth/Login";
import Home from "./components/pages/Home";
import Registrar from "./components/pages/Auth/Registrar";
import HomeAdministrador from "./components/pages/Administrador/HomeAdministrador";
import HomeGarcon from "./components/pages/Garcon/HomeGarcon";
import HomeCaixa from "./components/pages/Caixa/HomeCaixa";
import HomeCozinha from "./components/pages/Cozinha/HomeCozinha";
import Funcionarios from "./components/pages/Administrador/Funcionarios";
import Vendas from "./components/pages/Administrador/Vendas";
import Cardapio from "./components/pages/Administrador/Cardapio";
import AdicionarAoCardapio from "./components/pages/Administrador/AdicionarAoCardapio"
import ItensCardapio from "./components/pages/Administrador/ItensCardapio";

// contextos
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
        <Message/>
      <Container>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registrar" element={<Registrar/>}/>
          <Route path="/funcionarios" element={<Funcionarios/>}/>
          <Route path="/home-administrador" element={<HomeAdministrador/>}/>
          <Route path="/home-garcon" element={<HomeGarcon/>}/>
          <Route path="/home-caixa" element={<HomeCaixa/>}/>
          <Route path="/home-cozinha" element={<HomeCozinha/>}/>
          <Route path="/vendas" element={<Vendas/>}/>
          <Route path="/cardapio" element={<Cardapio/>}/>
          <Route path="/adicionar-ao-cardapio" element={<AdicionarAoCardapio/>}/>
          <Route path="/itens-cardapio" element={<ItensCardapio/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Container>
      <Footer/>
      </UserProvider>
    </Router>
  );
}

export default App;
