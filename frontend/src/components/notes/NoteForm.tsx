import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface NoteFormProps {
  openForm: () => void;
  closeForm: () => void;
  editing: boolean;
  setEditing: any;
  setNotes: any;
  onUpdate: (id: any, title: string, content: string) => void;
  id: any;
  note: any;
}

const NoteForm: React.FC<NoteFormProps> = ({
  editing,
  onUpdate,
  id,
  closeForm,
  setNotes,
  note
}) => {
  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);

  useEffect(() => {
    console.log(note.title)
    if(editing === true) {
      setTitle(note.title)
      setContent(note.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [editing, note])

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (editing) {
      onUpdate(id, title, content);
      closeForm()
    } else {
      createNote();
      closeForm()
    }
  };

  const createNote = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/notes`,
        { title: title, content: content },
        {
          headers: {
            token: token,
          },
        }
      );
      const res = await axios.get('http://localhost:5000/notes', { headers: { token: token } })
      setTitle('');
      setContent('');
      setNotes(res.data)
      
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='mb-3'>
        <label htmlFor='title' className='form-label fs-4'>
          {editing ? 'Update Title' : 'Title'}
        </label>
        <input
          type='text'
          id='title'
          className='form-control'
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='content' className='form-label fs-4'>
        {editing ? 'Update Content' : 'Content'}
        </label>
        <textarea
          id='content'
          className='form-control'
          value={content}
          onChange={handleContentChange}
          required
        ></textarea>
      </div>
      <button type='submit' className='btn btn-primary'>
        {editing ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;
