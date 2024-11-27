import PermissionTable from './PermissionTable';

export default function PermissionsPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Permissions</h2>
      <PermissionTable />
    </div>
  );
}
