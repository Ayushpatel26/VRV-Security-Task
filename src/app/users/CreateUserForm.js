'use client';
import { useState } from 'react';

const CreateUserForm = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'Active',
    role: 'User',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='text-black'>
      <h2 className="text-lg font-semibold mb-4">Create New User</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full p-2"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full p-2"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;
