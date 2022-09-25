import { createSlice } from "@reduxjs/toolkit";
import uniqid from 'uniqid';
import type { PayloadAction } from "@reduxjs/toolkit";

interface NotesInterface {
   [notes: string]: {
      id: string,
      title: string,
      category: string,
      date: string,
      content: string,
      dates?: RegExpMatchArray | null,
   }[],
}
interface Note {
   id: string,
   title: string,
   category: string,
   date: string,
   content: string,
   dates?: RegExpMatchArray | null,
}

const initialState: NotesInterface = {
   notes: [
      {
         id: uniqid(),
         title: 'Shopping list',
         category: 'Task',
         date: '11.09.2022',
         content: 'Bread, eggs, tomatoes, carrots, milk'
      },
      {
         id: uniqid(),
         title: 'B-day',
         category: 'Task',
         date: '10.09.2022',
         content: "Don't forget to congratulate Mark on his birthday 23.09",
         dates: ['23.09']
      },
      {
         id: uniqid(),
         title: 'Reading list',
         category: 'Idea',
         date: '10.09.2022',
         content: "Pride and Prejudice, To All the Boys I've Loved Before, Emma"
      },
      {
         id: uniqid(),
         title: "Driver's license",
         category: 'Random thought',
         date: '08.09.2022',
         content: "I got my driver's license last week 04/09/22, just like we always talked about...",
         dates: ['04/09/22']
      },
      {
         id: uniqid(),
         title: 'New movie',
         category: 'Random thought',
         date: '05.09.2022',
         content: "The movie will be released 15/09, should I go?",
         dates: ['15/09']
      },
   ],
   archivedNotes: [
      {
         id: uniqid(),
         title: 'I miss summer days...',
         category: "Random thought",
         date: '02.09.2022',
         content: "Especially hot summer nights, mid July, you and I, we're forever young",
      },
   ]
}

const NotesSlice = createSlice({
   name: 'notes',
   initialState,
   reducers: {
     addNote(state, action: PayloadAction<Note>) {
      state.notes.unshift(action.payload)
      return state
     },
     deleteNote(state, action: PayloadAction<string>) {
      let arr = state.notes.filter(note => note.id !== action.payload)
      if (arr.length === state.notes.length) {
         arr = state.archivedNotes.filter(note => note.id !== action.payload)
         state.archivedNotes = [...arr]
         return state
      }
      state.notes = [...arr]
      return state
     },
     archiveNote(state, action: PayloadAction<string>) {
      let archivedNotes: Note[] = []
      let arr: Note[] = []
      state.notes.forEach(note => {
         note.id === action.payload ? archivedNotes.push(note) : arr.push(note)
      })
      state.notes = [...arr]
      state.archivedNotes = [...archivedNotes, ...state.archivedNotes]
      return state
     },
     unarchiveNote(state, action: PayloadAction<string>) {
      let archivedNotes: Note[] = []
      state.archivedNotes.forEach(note => {
         note.id === action.payload ? state.notes.unshift(note) : archivedNotes.push(note)
      })
      state.archivedNotes = [...archivedNotes]
      return state
     },
     editNote(state, action: PayloadAction<Note>) {
      let index = state.notes.findIndex(note => note.id === action.payload.id)
      if (index === -1) {
         index = state.archivedNotes.findIndex(note => note.id === action.payload.id)
         state.archivedNotes[index] = action.payload
         return state
      }
      state.notes[index] = action.payload
      return state
     }
   },
 })

export const { addNote, deleteNote, archiveNote, editNote, unarchiveNote } = NotesSlice.actions
export default NotesSlice.reducer