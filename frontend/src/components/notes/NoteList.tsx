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

  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const onAdd = async (title: string, content: string) => {
    try {
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:5000/notes',
        { title: title, content: content },
        {
          headers: {
            token: token,
          },
        }
      );

      const response = await axios.get('http://localhost:5000/notes', {
        headers: {
          token: token,
        },
      });
      setNotes(response.data);
      closeForm();
    } catch (err) {
      console.error('Error: ', err);
    }
  };

  useEffect(() => {
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
                <h5 className='modal-title'>Add Note</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={closeForm}
                ></button>
              </div>
              <div className='modal-body'>
                <NoteForm onAdd={onAdd} />
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
        />
      ))}
    </div>
  );
};

export default NoteList;
