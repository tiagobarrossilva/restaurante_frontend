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
import HomeGarcom from "./components/pages/Garcom/HomeGarcom";
import HomeCaixa from "./components/pages/Caixa/HomeCaixa";
import HomeCozinha from "./components/pages/Cozinha/HomeCozinha";
import Funcionarios from "./components/pages/Administrador/Funcionarios";
import Vendas from "./components/pages/Administrador/Vendas";
import AdicionarAoCardapio from "./components/pages/Administrador/AdicionarAoCardapio"
import ItensCardapio from "./components/pages/Administrador/ItensCardapio";
import EditarItem from "./components/pages/Administrador/EditarItem";
import EditarFuncionario from "./components/pages/Administrador/EditarFuncionario";
import ItensCardapioGarcom from "./components/pages/Garcom/ItensCardapioGarcom";
import AbrirVenda from "./components/pages/Garcom/AbrirVenda";
import VendasAbertas from "./components/pages/Garcom/VendasAbertas";
import VendasFechadas from "./components/pages/Garcom/VendasFechadas";
import AdicionarItemVenda from "./components/pages/Garcom/AdicionarItemVenda";
import DetalhesVenda from "./components/pages/Garcom/DetalhesVenda";

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
          <Route path="/home-garcom" element={<HomeGarcom/>}/>
          <Route path="/home-caixa" element={<HomeCaixa/>}/>
          <Route path="/home-cozinha" element={<HomeCozinha/>}/>
          <Route path="/vendas" element={<Vendas/>}/>
          <Route path="/adicionar-ao-cardapio" element={<AdicionarAoCardapio/>}/>
          <Route path="/itens-cardapio" element={<ItensCardapio/>}/>
          <Route path="/editar-item/:id/:nome/:descricao/:preco/:tipo" element={<EditarItem/>}/>
          <Route path="/editar-funcionario/:id/:nome/:tipo" element={<EditarFuncionario/>}/>
          <Route path="/cardapio-garcom" element={<ItensCardapioGarcom/>}/>
          <Route path="/abrir-venda" element={<AbrirVenda/>}/>
          <Route path="/vendas-abertas" element={<VendasAbertas/>}/>
          <Route path="/vendas-fechadas" element={<VendasFechadas/>}/>
          <Route path="/adicionar-item-venda/:mesa" element={<AdicionarItemVenda/>}/>
          <Route path="/detalhes-venda/:mesa" element={<DetalhesVenda/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Container>
      <Footer/>
      </UserProvider>
    </Router>
  );
}

export default App;
