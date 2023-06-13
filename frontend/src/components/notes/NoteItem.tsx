import React, { useEffect, useState } from 'react';
import moment from 'moment';

interface Note {
  id: number;
  title: string;
  content: string;
  _id: any;
  createdAt: any;
}

interface NoteItemProps {
  note: Note;
  onDelete: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
    const updateInterval = setInterval(() => {
      const now = moment();
      const createdAt = moment(note.createdAt);
      const duration = moment.duration(now.diff(createdAt));
      const years = Math.floor(duration.asYears());
      const months = Math.floor(duration.asMonths());
      const days = Math.floor(duration.asDays());
      const hours = Math.floor(duration.asHours());
      const minutes = Math.floor(duration.asMinutes());
      const seconds = Math.floor(duration.asSeconds());

      if (years > 0) {
        setTimeAgo(`${years} years ago`);
      } else if (months > 0) {
        setTimeAgo(`${months} months ago`);
      } else if (days > 0) {
        setTimeAgo(`${days} days ago`);
      } else if (hours > 0) {
        setTimeAgo(`${hours} hours ago`);
      } else if (minutes > 0) {
        setTimeAgo(`${minutes} minutes ago`);
      } else {
        setTimeAgo(`${seconds} seconds ago`);
      }
    }, 1000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [note.createdAt]);

  const formattedDate = moment(note.createdAt).format('hh:mm:ss A');

  return (
    <div className='container mt-3'>
      <div className='row justify-content-center'>
        <div className='col-4'>
          <div className='card mb-3 bg-secondary text-white'>
            <div className='card-body'>
              <h3 className='card-title'>Title: {note.title}</h3>
              <p className='card-text'>Content: {note.content}</p>
              <p className='card-text'>Created: {timeAgo} at {formattedDate}</p>
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
