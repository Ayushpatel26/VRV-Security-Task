'use client';

import { useState } from 'react';
import RoleTable from '@/app/roles/RoleTable';
import CreateRoleForm from '@/app/roles/CreateRoleForm';

export default function RolesPage() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'User', permissions: ['Read'] },
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleAddRole = (newRole) => {
    setRoles([...roles, { ...newRole, id: Date.now() }]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Roles</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Role
        </button>
      </div>

      <RoleTable roles={roles} setRoles={setRoles} />

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <CreateRoleForm
              onCancel={() => setIsCreateModalOpen(false)}
              onSave={handleAddRole}
            />
          </div>
        </div>
      )}
    </div>
  );
}
