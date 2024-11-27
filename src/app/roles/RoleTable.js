import { useState } from 'react';

import CreateRoleForm from './CreateRoleForm';

const RoleTable = ({ roles, setRoles }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedRole) => {
    setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)));
    setIsEditModalOpen(false);
  };

  const handleDelete = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div>
      <table className="min-w-full border border-gray-200">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Role Modal */}
      {isEditModalOpen && selectedRole && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <CreateRoleForm
              role={selectedRole}
              onCancel={() => setIsEditModalOpen(false)}
              onSave={handleSaveEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleTable;
