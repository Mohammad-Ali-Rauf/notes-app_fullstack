import React, { useEffect, useState } from 'react';
import NoteItem from './NoteItem';
import axios from 'axios';
import NoteForm from './NoteForm';

interface Note {
  title: string;
  content: string;
  id: any;
  _id: any;
  createdAt: any;
}

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(false)
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/notes', {
        headers: {
          token: token,
        },
      });
      setNotes(response.data);
    } catch (err) {
      console.error('Error: ', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  const onDelete = async (id: any) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/notes/${id}`, {
        headers: {
          token: token,
        },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error: ', err);
    }
  };
  const onUpdate = async (id: any, title: string, content: string) => {
    try {
      setEditing(true)
      openForm()
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/notes/${id}`, { title: title, content: content }, {
        headers: {
          token: token,
        },
      });
      fetchNotes()
    } catch (err) {
      console.error('Error: ', err);
    }
  };
  return (
    <div className='text-center'>
      <h2 className='mt-4'>My Notes</h2>
      <button className='btn btn-primary btn-lg' onClick={openForm}>
        Add Note
      </button>

      {showForm && (
        <div
          className='modal'
          tabIndex={-1}
          role='dialog'
          style={{ display: 'block' }}
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>{editing ? 'Update Note' : 'Add Note'}</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={closeForm}
                ></button>
              </div>
              <div className='modal-body'>
                <NoteForm id={selectedNote?._id} note={selectedNote} openForm={openForm} closeForm={closeForm} setNotes={setNotes} editing={editing} setEditing={setEditing} onUpdate={onUpdate} />
              </div>
            </div>
          </div>
        </div>
      )}
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={() => onDelete(note._id)}
          onUpdate={() => {
            onUpdate(note._id, note.title, note.content)
            setSelectedNote(note)
          }}
        />
      ))}
    </div>
  );
};

export default NoteList;
