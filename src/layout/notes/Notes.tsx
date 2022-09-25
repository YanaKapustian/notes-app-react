import './Notes.css'
import { useSelector } from 'react-redux'
import Note from '../../components/Note'
import { NavLink } from "react-router-dom";
import Summary from '../../components/Summary';

interface NotesInterface {
   [notes: string]: {
      id: string,
      title: string,
      category: string,
      date: string,
      content: string,
      dates?: string[],
   }[]
}

const Notes:React.FC = () => {
   const notes = useSelector((state: NotesInterface) => state.notes)
   return (
      <div className="notes__block">
      <button className="btn__add-note"><NavLink className='add-note-link' to='/add-note'>+ Add new note</NavLink></button>
         {notes.map(note => <Note {...note} key={note.id}></Note>)}
         <Summary />
      </div>
   )
}

export default Notes;