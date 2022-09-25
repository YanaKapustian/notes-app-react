import React, { useState } from "react"
import uniqid from 'uniqid';
import { useDispatch } from 'react-redux'
import { addNote } from "../redux/NotesSlice";
import { useNavigate } from "react-router-dom";

interface Note {
   id: string,
   title: string,
   category: string,
   date: string,
   content: string,
   dates?: RegExpMatchArray | null,
}

const AddNote:React.FC = () => {
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
      e.preventDefault()
      const message = document.querySelector<HTMLElement>('.message')
      if (message !== null) message.innerText = ''
      if (title && content && category) {
         let today = new Date();
         let date = `${twoFigureNum(today.getDate())}.${twoFigureNum(today.getMonth() + 1)}.${today.getFullYear()}`
         let dates = findDate()
         let note: Note = {
            id: uniqid(),
            title,
            category,
            content,
            date,
            dates,
         }
         dispatch(addNote(note))
         navigate(-1)
      } else {
         if (message !== null) message.innerText = 'Please fill in all the inputs'
      }
   }

   function twoFigureNum(number: number): string {
      let num = number.toString()
      return num.length === 1 ? `0${num}` : num
   }

   function findDate(): RegExpMatchArray | null {
      let regexp = /[0-9]{1,2}.[0-9]{1,2}.[0-9]{0,4}/g;
      return content.match(regexp)
   }

   return (
      <div className="notes__add">
         <form>
         <p className="no-margin"><input onChange={handleTitle} name="title" placeholder="Title" className="title-input"></input></p>
         <p className="no-margin"><textarea onChange={handleContent} className="textarea" name="content" placeholder="Type the note here..."></textarea></p>
         <select className="select" onChange={handleCategory} required defaultValue="Choose an author" name="nickname">
            <option defaultValue="Choose a category" value='Choose a category' hidden>Choose a category</option>
            <option defaultValue='Task'>Task</option>
            <option defaultValue='Random thought'>Random thought</option>
            <option defaultValue='Idea'>Idea</option>
         </select>
         <p className="message"></p>
         <button type="submit" className="btn__create-note" onClick={handleSubmit}>Add note</button>
         </form>
      </div>
   )
}

export default AddNote