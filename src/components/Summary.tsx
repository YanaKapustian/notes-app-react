import '../layout/notes/Notes.css'
import { useSelector } from 'react-redux'

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

const Summary = () => {
   const notes = useSelector((state: NotesInterface) => state.notes)
   const archivedNotes = useSelector((state: NotesInterface) => state.archivedNotes)

   let task = notes.filter(note => note.category === 'Task')
   let thought = notes.filter(note => note.category === 'Random thought')
   let idea = notes.filter(note => note.category === 'Idea')
   let taskArchived = archivedNotes.filter(note => note.category === 'Task')
   let thoughtArchived = archivedNotes.filter(note => note.category === 'Random thought')
   let ideaArchived = archivedNotes.filter(note => note.category === 'Idea')

   return (
      <div className="summary">
         <div className="summary__block">
            <div className="summary__categories">
               <span className="summary__title">Note category</span>
               <p className="summary__category">Task</p>
               <p className="summary__category">Random thought</p>
               <p className="summary__category">Idea</p>
            </div>
            <div className="summary__notes-number">
               <div className="summary__active">
                  <span className="summary__title-state">Active</span>
                  <p className="summary__task">{task.length}</p>
                  <p className="summary__thought">{thought.length}</p>
                  <p className="summary__idea">{idea.length}</p>
               </div>
               <div className="summary__archived">
                  <span className="summary__title-state">Archived</span>
                  <p className="summary__task-archived">{taskArchived.length}</p>
                  <p className="summary__thought-archived">{thoughtArchived.length}</p>
                  <p className="summary__idea-archived">{ideaArchived.length}</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Summary