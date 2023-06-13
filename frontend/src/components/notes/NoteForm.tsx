import React, { useState } from 'react';

interface NoteFormProps {
  onAdd: (title: string, content: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label fs-4">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label fs-4">
          Content
        </label>
        <textarea
          id="content"
          className="form-control"
          value={content}
          onChange={handleContentChange}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
