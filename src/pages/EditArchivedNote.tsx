import React, { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { editNote } from "../redux/NotesSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux'

interface Note {
   id: string,
   title: string,
   category: string,
   date: string,
   content: string,
   dates?: RegExpMatchArray | null,
}
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

const EditArchivedNote:React.FC = () => {
   const {id} = useParams()
   const notes = useSelector((state: NotesInterface) => state.archivedNotes)

   let [note, setNote] = useState<Note>()

   useEffect(() => {
      async function getNote() {
         let note = await notes.find(note => note.id === id)
         setNote(note)
      }
      getNote()
   }, [])
   
   let [title, setTitle] = useState('')
   let [content, setContent] = useState('')
   let [category, setCategory] = useState('')
   let dispatch = useDispatch()
   let navigate = useNavigate()

   function handleTitle(e: React.SyntheticEvent): void {
      let target = e.target as HTMLInputElement;
      if (target.value === '') return;
      setTitle(title = target.value)
   }

   function handleContent(e: React.SyntheticEvent): void{
      let target = e.target as HTMLInputElement;
      if (target.value === '') return;
      setContent(content = target.value)
   }

   function handleCategory(e: React.SyntheticEvent): void {
      let target = e.target as HTMLInputElement;
      if (target.value === '') return;
      setCategory(category = target.value)
   }

   function handleSubmit(e: React.SyntheticEvent): void {
      if (note !== undefined) {
         e.preventDefault()
         const message = document.querySelector<HTMLElement>('.message')
         if (message !== null) message.innerText = ''
         if (!title) title = note.title
         if (!content) content = note.content
         if (!category) category = note.category
         if (title && content && category) {
            let dates = findDate()
            let noteEdited: Note = {
               id: note.id,
               title,
               category,
               content,
               date: note.date,
               dates,
            }
            dispatch(editNote(noteEdited))
            navigate('/archived-notes')
         } else {
            if (message !== null) message.innerText = 'Please fill in all the inputs'
         }
      }
   }

   function findDate(): RegExpMatchArray | null  {
      let regexp = /[0-9]{1,2}.[0-9]{1,2}.[0-9]{0,4}/g;
      if (content !== undefined) {
         return content.match(regexp)
      } else {
         return null
      }
   }

   return (
      <div className="notes__add">
         <form>
         <p className="no-margin"><input onChange={handleTitle} defaultValue={note?.title} name="title" placeholder="Title" className="title-input"></input></p>
         <p className="no-margin"><textarea onChange={handleContent} defaultValue={note?.content} className="textarea" name="content" placeholder="Type the note here..."></textarea></p>
         <select className="select" onChange={handleCategory} required defaultValue={note?.category} name="nickname">
            <option defaultValue='Task'>Task</option>
            <option defaultValue='Random thought'>Random thought</option>
            <option defaultValue='Idea'>Idea</option>
         </select>
         <p className="message"></p>
         <button type="submit" className="btn__create-note" onClick={handleSubmit}>Edit note</button>
         </form>
      </div>
   )
}

export default EditArchivedNote