import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import TaskList from './views/TaskList';
import TaskDetails from './views/TaskDetails';
import NotFound from './views/NotFound';
import './App.css'

function App() {
  return (
  <div className="App">
      <Header />
      <main className="container">
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/tasks' element={<TaskList />} />
          <Route path='/tasks/:id' element={<TaskDetails />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </main>
      <Footer />
  </div>
  );
}

export default App
