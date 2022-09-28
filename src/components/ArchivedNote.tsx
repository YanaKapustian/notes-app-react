import React from 'react'
import '../layout/notes/Notes.css'
import { useDispatch } from 'react-redux'
import { deleteNote, unarchiveNote } from "../redux/NotesSlice";
import { useNavigate } from "react-router-dom";

interface Props {
      key?: string,
      id: string,
      title: string,
      category: string,
      date: string,
      content: string,
      dates?: string[],
}

const ArchivedNote: React.FC<Props> = ({id, title, category, content, date, dates}) => {
   let dispatch = useDispatch()
   let navigate = useNavigate()

   function handleDelete(e: React.SyntheticEvent): void {
      let target = e.currentTarget as HTMLElement;
      let [id] = target.id.split('_')
      dispatch(deleteNote(id))
   }

   function handleArchive(e: React.SyntheticEvent): void {
      let target = e.currentTarget as HTMLElement;
      let [id] = target.id.split('_')
      dispatch(unarchiveNote(id))
   }

   function handleEdit(e: React.SyntheticEvent): void {
      let target = e.currentTarget as HTMLElement;
      let [id] = target.id.split('_') 
      navigate(`/archived-notes/${id}`)
   }
    
   return (
      <div className="note">
         <div className="note__header">
            <span className="note__title">{title}</span>
            <div className="note__info">
               <span className="note__category">{category}</span>
               <span className="note__date">{date}</span>
            </div>
         </div>
         <div className="note__main">
            <p className="note__content">{content}</p>
            <span className="note__dates">{dates && dates.map(date => date + ' ')}</span>
         </div>
         <div className="note__actions">
            <div className="note__icon" id={`${id}_edit`} onClick={handleEdit}><img src="https://i.ibb.co/nsLCy8Z/pencil.png" alt="edit"></img></div>
            <div className="note__icon" id={`${id}_archive`} onClick={handleArchive}><img src="https://i.ibb.co/9hhtybQ/download-button.png" alt="archive"></img></div>
            <div className="note__icon" id={`${id}_delete`} onClick={handleDelete}><img src="https://i.ibb.co/x5LYfH7/garbage.png" alt="delete"></img></div>
         </div>
      </div>
   )
}

export default ArchivedNote