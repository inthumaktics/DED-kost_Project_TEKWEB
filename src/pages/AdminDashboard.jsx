import AdminDashboardComponent from '@/components/admin/AdminDashboard';
import useAdminKosts from "@/hooks/useAdminKosts";

const AdminDashboard = () => {
  const {
    kosts,
    loading,
    addKost,
    deleteKost,
    updateKost,  // Tambahkan ini
    logout,
  } = useAdminKosts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  
  return (
    <AdminDashboardComponent
      kosts={kosts}
      onAddKost={addKost}
      onDeleteKost={deleteKost}
      onEditKost={updateKost}  // Tambahkan ini
      onLogout={logout}
    />
  );
};
    
export default AdminDashboard;