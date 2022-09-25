import './App.css';
import { HashRouter, Routes, Route, Navigate} from "react-router-dom";
import Navbar from './layout/navbar/Navbar';
import Notes from './layout/notes/Notes';
import AddNote from './pages/AddNote';
import ArchivedNotes from './layout/notes/ArchivedNotes';
import EditNote from './pages/EditNote';
import EditArchivedNote from './pages/EditArchivedNote';
import FilterByCategories from './layout/FilterByCategories';

function App() {
  return (
    <HashRouter basename='/'>
      <div className='content'>
      <Navbar />
      <div className="notes">
        <div className="container">
          <Routes>
            <Route path='/notes' element={<Notes></Notes>}></Route>
            <Route path='/' element={ <Navigate to='/notes'/> }></Route>
            <Route path='/add-note' element={<AddNote></AddNote>}></Route>
            <Route path='/archived-notes' element={<ArchivedNotes></ArchivedNotes>}></Route>
            <Route path='/notes/:id' element={<EditNote></EditNote>}></Route>
            <Route path='/archived-notes/:id' element={<EditArchivedNote></EditArchivedNote>}></Route>
            <Route path='/task' element={<FilterByCategories category="Task"></FilterByCategories>}></Route>
            <Route path='/thought' element={<FilterByCategories category="Random thought"></FilterByCategories>}></Route>
            <Route path='/idea' element={<FilterByCategories category="Idea"></FilterByCategories>}></Route>
          </Routes>
        </div>
      </div>
      
      </div>
    </HashRouter>
  );
}

export default App;
