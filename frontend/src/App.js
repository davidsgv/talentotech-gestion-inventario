import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Registro</Link>
            </nav>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
