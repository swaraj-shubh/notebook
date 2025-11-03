// In Home.js - Add proper error handling
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNotebook, setNewNotebook] = useState({ title: "", description: "" });

  const createNotebook = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/notebooks/", newNotebook);
      setShowCreateModal(false);
      setNewNotebook({ title: "", description: "" });
      fetchNotebooks(); // Refresh the list
    } catch (error) {
      console.error("Error creating notebook:", error);
    }
  };

  const fetchNotebooks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/notebooks");
        setData(response.data);
        console.log("Fetched notebooks:", response.data);
      } catch (error) {
        console.error("Error fetching notebooks:", error);
      }
  };

  const deleteNotebook = async (notebookId, e) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    if (window.confirm("Are you sure you want to delete this notebook?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/notebooks/${notebookId}`);
        fetchNotebooks(); // Refresh the list
      } catch (error) {
        console.error("Error deleting notebook:", error);
      }
    }
  };

  useEffect(() => {
    fetchNotebooks();
  }, []);



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📒 All Notebooks</h1>
      {/* <p>{JSON.stringify(data)}</p> */}
      <button 
        onClick={() => setShowCreateModal(true)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        + Create Notebook
      </button>
      {data.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data.map((notebook) => (
            <div
              key={notebook._id}
              onClick={() => navigate(`/notebook/${notebook._id}`)}
              className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all bg-white cursor-pointer relative"
            >
              <h2 className="text-xl font-semibold mb-1">{notebook.title}</h2>
              <p className="text-gray-600 mb-2">
                {notebook.description || "No description provided."}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Created on:{" "}
                {new Date(notebook.created_at).toLocaleString("en-IN")}
              </p>

              <button 
                onClick={(e) => deleteNotebook(notebook._id, e)}
                className="absolute top-2 right-2 mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              >
                Delete
              </button>


            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No notebooks found.</p>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-6">
          <button
            onClick={() => setShowCreateModal(false)}
            className="absolute top-4 right-6 text-gray-600 hover:text-black text-xl font-bold"
          >
            ✕
          </button>
          
          <div className="max-w-2xl mx-auto mt-20">
            <h2 className="text-3xl font-bold mb-6">Create New Notebook</h2>
            
            <label className="block mb-2 font-semibold text-lg">Notebook Title</label>
            <input
              type="text"
              placeholder="Enter notebook title"
              value={newNotebook.title}
              onChange={(e) => setNewNotebook({...newNotebook, title: e.target.value})}
              className="w-full border p-3 rounded mb-6 text-lg"
            />
            
            <label className="block mb-2 font-semibold text-lg">Description (optional)</label>
            <textarea
              placeholder="Enter notebook description"
              value={newNotebook.description}
              onChange={(e) => setNewNotebook({...newNotebook, description: e.target.value})}
              className="w-full border p-3 rounded mb-8 text-lg"
              rows="4"
            />
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 text-lg"
              >
                Cancel
              </button>
              <button 
                onClick={createNotebook}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg"
              >
                Create Notebook
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );


};

export default Home;