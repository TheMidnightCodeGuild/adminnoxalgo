import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const InfoField = ({ label, value, isEditing, onChange, name }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
    {isEditing ? (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full p-2 border rounded-md"
      />
    ) : (
      <p className="text-gray-600">{value}</p>
    )}
  </div>
);

export default function InternDetails() {
  const [intern, setIntern] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedIntern, setEditedIntern] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchInternDetails();
    }
  }, [id]);

  const fetchInternDetails = async () => {
    try {
      const response = await fetch(`/api/auth/intern/${id}`);
      const data = await response.json();
      setIntern(data);
      setEditedIntern(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching intern details:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedIntern(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/auth/intern/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedIntern),
      });

      if (response.ok) {
        setIntern(editedIntern);
        setIsEditing(false);
      } else {
        throw new Error('Failed to update intern');
      }
    } catch (error) {
      console.error('Error updating intern:', error);
      alert('Failed to update intern details');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!intern) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
        <div className="text-2xl text-gray-600">Intern not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        {isEditing ? (
          <input
            type="text"
            value={editedIntern.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="text-4xl font-bold text-gray-900 mb-6 w-full p-2 border rounded-md"
          />
        ) : (
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{intern.name}</h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Basic Information</h2>
            <InfoField 
              label="Username" 
              value={isEditing ? editedIntern.username : intern.username}
              isEditing={isEditing}
              onChange={handleInputChange}
              name="username"
            />
            <InfoField 
              label="Email" 
              value={isEditing ? editedIntern.email : intern.email}
              isEditing={isEditing}
              onChange={handleInputChange}
              name="email"
            />
            <InfoField 
              label="Phone" 
              value={isEditing ? editedIntern.mobile : intern.mobile}
              isEditing={isEditing}
              onChange={handleInputChange}
              name="mobile"
            />
            <InfoField 
              label="Team Name" 
              value={isEditing ? editedIntern.TeamName : intern.TeamName}
              isEditing={isEditing}
              onChange={handleInputChange}
              name="TeamName"
            />
            <InfoField 
              label="Team Leader" 
              value={isEditing ? editedIntern.teamLeader : intern.teamLeader}
              isEditing={isEditing}
              onChange={handleInputChange}
              name="teamLeader"
            />
            <InfoField 
              label="Referral Code" 
              value={isEditing ? editedIntern.referalCode : (intern.referalCode || 'N/A')}
              isEditing={isEditing}
              onChange={handleInputChange}
              name="referalCode"
            />
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Performance Metrics</h2>
            <InfoField 
              label="Deals Closed (Personal)" 
              value={isEditing ? editedIntern.dealsClosedPersonally : intern.dealsClosedPersonally}
              isEditing={isEditing}
              onChange={handleInputChange}
              name="dealsClosedPersonally"
            />
            <InfoField 
              label="Deals Closed (Team)" 
              value={isEditing ? editedIntern.dealsClosedByTeam : intern.dealsClosedByTeam}
              isEditing={isEditing}
              onChange={handleInputChange}
              name="dealsClosedByTeam"
            />
            <InfoField 
              label="Commission Earned" 
              value={isEditing ? editedIntern.comissionEarned : intern.comissionEarned}
              isEditing={isEditing}
              onChange={handleInputChange}
              name="comissionEarned"
            />
            <InfoField 
              label="Commission Released" 
              value={isEditing ? editedIntern.comissionReleased : intern.comissionReleased}
              isEditing={isEditing}
              onChange={handleInputChange}
              name="comissionReleased"
            />
          </div>

          {/* Data Assigned Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Assigned Data</h2>
            <InfoField 
              label="Data Assigned"
              value={isEditing ? editedIntern.DataAssigned : (intern.DataAssigned || 'No data assigned')}
              isEditing={isEditing}
              onChange={handleInputChange}
              name="DataAssigned"
            />
          </div>

          {/* Call History */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Call History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Clients Called</th>
                    <th className="px-4 py-2 border">Meetings Scheduled</th>
                  </tr>
                </thead>
                <tbody>
                  {intern.calls && intern.calls.map((call, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">{new Date(call.Date).toLocaleDateString()}</td>
                      <td className="px-4 py-2 border text-center">{call.NoOfClients}</td>
                      <td className="px-4 py-2 border text-center">{call.MeetingsScheduled}</td>
                    </tr>
                  ))}
                  {(!intern.calls || intern.calls.length === 0) && (
                    <tr>
                      <td colSpan="3" className="px-4 py-2 border text-center text-gray-500">No call history available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.back()}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all"
          >
            Back to List
          </button>
          
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditedIntern(intern);
                  setIsEditing(false);
                }}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}