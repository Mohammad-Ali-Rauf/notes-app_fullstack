import axios from 'axios';
import React from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  _id: any;
}

interface NoteItemProps {
  note: Note;
  onDelete: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
  return (
    <div className='container mt-3'>
      <div className='row justify-content-center'>
        <div className='col-4'>
          <div className='card mb-3 bg-secondary text-white'>
            <div className='card-body'>
              <h3 className='card-title'>Title: {note.title}</h3>
              <p className='card-text'>Content: {note.content}</p>
              <div className='mb-3'>
                <button className='btn btn-danger me-2' onClick={onDelete}>
                  Delete
                </button>
                <button className='btn btn-warning'>Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
