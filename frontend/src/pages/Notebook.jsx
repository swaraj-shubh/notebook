import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notebook = () => {
  const { id } = useParams();
  const [notebook, setNotebook] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ title: "", content: "", tags: [] });
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", tags: [] });
  const navigate = useNavigate();
  // Fetch notebook details
  useEffect(() => {
    const fetchNotebook = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/notebooks/${id}`);
        setNotebook(res.data);
      } catch (err) {
        console.error("Error fetching notebook:", err);
      }
    };
    fetchNotebook();
  }, [id]);

  // Handle note click
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setEditMode(false);
    setEditData({
      title: note.title,
      content: note.content,
      tags: note.tags || [],
    });
  };

  // Handle edit button
  const handleEdit = () => {
    setEditMode(true);
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Handle tag editing
  const handleTagChange = (e) => {
    setEditData({ ...editData, tags: e.target.value.split(",").map((t) => t.trim()) });
  };

  // Handle save (PATCH - CORRECTED)
  const handleSave = async () => {
    try {
      // Create payload with only changed fields (PATCH style)
      const payload = {};
      if (editData.title !== selectedNote.title) payload.title = editData.title;
      if (editData.content !== selectedNote.content) payload.content = editData.content;
      if (JSON.stringify(editData.tags) !== JSON.stringify(selectedNote.tags || [])) {
        payload.tags = editData.tags;
      }

      // If nothing changed, just exit edit mode
      if (Object.keys(payload).length === 0) {
        setEditMode(false);
        return;
      }

      await axios.patch(
        `http://127.0.0.1:8000/api/notebooks/${id}/notes/${selectedNote._id}`,
        payload
      );

      // Update local state - refetch the notebook to get updated data
      const res = await axios.get(`http://127.0.0.1:8000/api/notebooks/${id}`);
      setNotebook(res.data);
      
      // Update selected note with new data
      const updatedNote = res.data.notes.find(note => note._id === selectedNote._id);
      setSelectedNote(updatedNote);
      setEditMode(false);
      alert("✅ Note updated successfully!");
    } catch (err) {
      console.error("Error updating note:", err);
      alert("❌ Failed to update note: " + (err.response?.data?.detail || err.message));
    }
  };

  // Handle delete note
  const handleDeleteNote = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/notebooks/${id}/notes/${selectedNote._id}`
      );
      
      // Refetch notebook to get updated list
      const res = await axios.get(`http://127.0.0.1:8000/api/notebooks/${id}`);
      setNotebook(res.data);
      setSelectedNote(null);
      alert("🗑️ Note deleted successfully!");
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("❌ Failed to delete note: " + (err.response?.data?.detail || err.message));
    }
  };

  const createNote = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/notebooks/${id}/notes/`, {
        title: newNote.title,
        content: newNote.content,
        tags: newNote.tags
      });
      setShowCreateNoteModal(false);
      setNewNote({ title: "", content: "", tags: [] });
      // Refresh notebook data
      const res = await axios.get(`http://127.0.0.1:8000/api/notebooks/${id}`);
      setNotebook(res.data);
      alert("✅ Note created successfully!");
    } catch (err) {
      console.error("Error creating note:", err);
      alert("❌ Failed to create note: " + (err.response?.data?.detail || err.message));
    }
  };

  if (!notebook) return <p className="p-6 text-gray-600">Loading...</p>;

  return (
    <div className="p-6">
      <button 
        onClick={() => navigate(`/`)}
        className="flex items-center gap-2 text-gray-600 hover:text-black hover:cursor-pointer transition-colors mb-6 group"
      >
        <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
        <span className="font-medium">All Notebooks</span>
      </button>     
      <h1 className="text-2xl font-bold mb-2">{notebook.title}</h1>
      <p className="text-gray-600 mb-2">{notebook.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Created on: {new Date(notebook.created_at).toLocaleString("en-IN")}
      </p>
      <h2 className="text-2xl font-semibold mb-3">🗒️ Notes</h2>
      <button 
        onClick={() => setShowCreateNoteModal(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        + Add New Note
      </button>
      {/* Notes List */}
      {notebook.notes && notebook.notes.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          
          {notebook.notes.map((note) => (
            <div
              key={note._id}
              onClick={() => handleNoteClick(note)}
              className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <h3 className="text-lg font-semibold mb-1">{note.title}</h3>

              {/* Tags */}
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta info */}
              <div className="text-xs text-gray-500">
                <p>Created: {new Date(note.created_at).toLocaleString("en-IN")}</p>
                {note.updated_at && (
                  <p>
                    Updated: {new Date(note.updated_at).toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No notes in this notebook yet.</p>
      )}

      {/* Full Page Note View */}
      {selectedNote && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-6">
          <button
            onClick={() => setSelectedNote(null)}
            className="absolute top-4 right-6 text-gray-600 hover:text-black hover:cursor-pointer text-xl font-bold"
          >
            ✕
          </button>

          {!editMode ? (
            <>
              <div className="max-w-3xl mx-auto mt-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-3xl font-bold">{selectedNote.title}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDeleteNote}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Tags */}
                {selectedNote.tags && selectedNote.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedNote.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed">
                  {selectedNote.content}
                </p>

                <div className="text-xs text-gray-500 mt-4">
                  <p>
                    Created: {new Date(selectedNote.created_at).toLocaleString("en-IN")}
                  </p>
                  {selectedNote.updated_at && (
                    <p>
                      Updated: {new Date(selectedNote.updated_at).toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="max-w-3xl mx-auto mt-10">
                <h2 className="text-2xl font-bold mb-4">✏️ Edit Note</h2>

                <label className="block mb-2 font-semibold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mb-4"
                />

                <label className="block mb-2 font-semibold">Content</label>
                <textarea
                  name="content"
                  value={editData.content}
                  onChange={handleChange}
                  rows="8"
                  className="w-full border p-2 rounded mb-4"
                />

                <label className="block mb-2 font-semibold">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={editData.tags.join(", ")}
                  onChange={handleTagChange}
                  className="w-full border p-2 rounded mb-6"
                  placeholder="tag1, tag2, tag3"
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {showCreateNoteModal && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-6">
          <button
            onClick={() => setShowCreateNoteModal(false)}
            className="absolute top-4 right-6 text-gray-600 hover:text-black text-xl font-bold"
          >
            ✕
          </button>
          
          <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6">Create New Note</h2>
            
            <label className="block mb-2 font-semibold text-lg">Title</label>
            <input
              type="text"
              value={newNote.title}
              onChange={(e) => setNewNote({...newNote, title: e.target.value})}
              className="w-full border p-3 rounded mb-6 text-lg"
              placeholder="Note title"
            />

            <label className="block mb-2 font-semibold text-lg">Content</label>
            <textarea
              value={newNote.content}
              onChange={(e) => setNewNote({...newNote, content: e.target.value})}
              rows="12"
              className="w-full border p-3 rounded mb-6 text-lg"
              placeholder="Note content"
            />

            <label className="block mb-2 font-semibold text-lg">Tags (comma separated)</label>
            <input
              type="text"
              value={newNote.tags.join(", ")}
              onChange={(e) => setNewNote({...newNote, tags: e.target.value.split(",").map(t => t.trim())})}
              className="w-full border p-3 rounded mb-8 text-lg"
              placeholder="tag1, tag2, tag3"
            />

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowCreateNoteModal(false)}
                className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 text-lg"
              >
                Cancel
              </button>
              <button 
                onClick={createNote}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg"
              >
                Create Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notebook;