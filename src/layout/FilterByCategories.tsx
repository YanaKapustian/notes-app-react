import './notes/Notes.css'
import { useSelector } from 'react-redux'
import Note from '../components/Note'
import { NavLink } from "react-router-dom";

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
interface Props {
   category: string
}

const FilterByCategories:React.FC<Props> = ({category}) => {
   const notes = useSelector((state: NotesInterface) => state.notes).filter(note => note.category === category)
   return (
      <div className="notes__block">
      <button className="btn__add-note"><NavLink className='add-note-link' to='/add-note'>+ Add new note</NavLink></button>
         {notes.map(note => <Note {...note} key={note.id}></Note>)}
      </div>
   )
}

export default FilterByCategories;