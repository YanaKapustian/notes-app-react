import './Notes.css'
import { useSelector } from 'react-redux'
import ArchivedNote from '../../components/ArchivedNote'
import { NavLink } from "react-router-dom";

interface ArchivedNotesInterface {
   [archivedNotes: string]: {
      id: string,
      title: string,
      category: string,
      date: string,
      content: string,
      dates?: string[],
   }[]
}

const ArchivedNotes: React.FC = () => {
   const archivedNotes = useSelector((state: ArchivedNotesInterface) => state.archivedNotes)
   return (
      <div className="notes__block">
      <button className="btn__add-note"><NavLink className='add-note-link' to='/add-note'>+ Add new note</NavLink></button>
         {archivedNotes.map(note => <ArchivedNote {...note} key={note.id}></ArchivedNote>)}
      </div>
   )
}

export default ArchivedNotes