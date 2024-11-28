import { useState } from 'react';

import CreateRoleForm from './CreateRoleForm';
import { toast } from 'react-toastify';

const RoleTable = ({ roles, setRoles, availableRoles, setAvailableRoles }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (role) => {
    setSelectedRole(role);
    setAvailableRoles([...availableRoles, role.name]);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedRole) => {
    try {
      const response = await fetch(`http://localhost:3001/roles/${updatedRole.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRole)
      });
      
      if (!response.ok) throw new Error('Failed to update new role');
      toast.success('Role updated successfully!');
      setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role))); // updating locally
    } catch (error) {
      toast.error('Error updating role.');
      console.log('Error updating role:', error);
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    setRoles(roles.filter((role) => role.id !== id));
    
    try {
      const response = await fetch(`http://localhost:3001/roles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Failed to create new role');
      toast.success('Role deleted successfully!');
    } catch (error) {
      toast.error('Error deleting role.');
      console.log('Error deleting role:', error);
    }
  };

  return (
    <div>
      <table className="min-w-full border border-gray-200 rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Role Name</th>
            <th className="py-2 px-4 border-b">Permissions</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="py-2 px-4 border-b text-center">{role.name}</td>
              <td className="py-2 px-4 border-b text-center">{role.permissions.join(', ')}</td>
              <td className="py-2 px-4 border-b text-center">
                <div className="flex justify-center sm:gap-2">
                  <button
                    onClick={() => handleEdit(role)}
                    className="bg-green-100 text-white rounded mr-2"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/exymduqj.json"
                      trigger="hover"
                    >
                    </lord-icon>
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="bg-green-100 text-white rounded"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/hwjcdycb.json"
                      trigger="hover"
                    >
                    </lord-icon>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && selectedRole && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <CreateRoleForm
              role={selectedRole}
              onCancel={() => {
                setIsEditModalOpen(false);
                setAvailableRoles(availableRoles.filter((role) => role != selectedRole.name))
              }}
              onSave={handleSaveEdit}
              availableRoles={availableRoles}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleTable;
