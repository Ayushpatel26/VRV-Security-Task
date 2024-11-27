import { useState } from 'react';

const CreateRoleForm = ({ role = null, onCancel, onSave }) => {
  const [formData, setFormData] = useState(
    role || { name: '', permissions: [] }
  );
  const [permissionInput, setPermissionInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPermission = () => {
    if (permissionInput && !formData.permissions.includes(permissionInput)) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionInput],
      });
      setPermissionInput('');
    }
  };

  const handleRemovePermission = (permission) => {
    setFormData({
      ...formData,
      permissions: formData.permissions.filter((perm) => perm !== permission),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='text-black'>
      <h2 className="text-lg font-semibold mb-4">
        {role ? 'Edit Role' : 'Create New Role'}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">Role Name:</label>
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
        <label className="block text-gray-700">Permissions:</label>
        <div className="flex items-center">
          <input
            type="text"
            value={permissionInput}
            onChange={(e) => setPermissionInput(e.target.value)}
            placeholder="Add permission"
            className="border border-gray-300 rounded w-full p-2 mr-2"
          />
          <button
            type="button"
            onClick={handleAddPermission}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="mt-2">
          {formData.permissions.map((permission, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded mr-2 mb-2"
            >
              {permission}
              <button
                type="button"
                onClick={() => handleRemovePermission(permission)}
                className="ml-2 text-red-500"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
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

export default CreateRoleForm;
