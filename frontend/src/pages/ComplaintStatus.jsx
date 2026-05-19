import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { complaintAPI } from '../services/api';
import { ArrowLeft, Edit, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

const ComplaintStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const response = await complaintAPI.getById(id);
      setComplaint(response.data.complaint);
      setNewStatus(response.data.complaint.status);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch complaint');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      setUpdating(true);
      await complaintAPI.updateStatus(id, { status: newStatus });
      alert('Status updated successfully!');
      fetchComplaint();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="h-6 w-6 text-yellow-600" />;
      case 'In Progress': return <AlertCircle className="h-6 w-6 text-blue-600" />;
      case 'Resolved': return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'Rejected': return <XCircle className="h-6 w-6 text-red-600" />;
      default: return <Clock className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-300';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error || 'Complaint not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">{complaint.title}</h1>
            <p className="text-primary-100 mt-1">Complaint ID: {complaint._id}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Status and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className={`p-4 rounded-lg border-2 ${getStatusColor(complaint.status)}`}>
                <div className="flex items-center">
                  {getStatusIcon(complaint.status)}
                  <div className="ml-3">
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-lg font-bold">{complaint.status}</p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${getPriorityColor(complaint.priority)}`}>
                <div className="flex items-center">
                  <AlertCircle className="h-6 w-6" />
                  <div className="ml-3">
                    <p className="text-sm font-medium">Priority</p>
                    <p className="text-lg font-bold">{complaint.priority}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Complaint Details */}
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{complaint.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Category</h3>
                  <p className="text-gray-700">{complaint.category}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-700">{complaint.location}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Submitted By</h3>
                  <p className="text-gray-700">{complaint.name}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-700">{complaint.email}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Submitted On</h3>
                  <p className="text-gray-700">{new Date(complaint.createdAt).toLocaleString()}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Last Updated</h3>
                  <p className="text-gray-700">{new Date(complaint.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            {complaint.aiSummary && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-8 border border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Analysis</h3>
                
                {complaint.department && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Recommended Department:</p>
                    <p className="text-gray-900 font-semibold">{complaint.department}</p>
                  </div>
                )}

                {complaint.aiSummary && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Summary:</p>
                    <p className="text-gray-900">{complaint.aiSummary}</p>
                  </div>
                )}

                {complaint.aiResponse && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Auto-Generated Response:</p>
                    <p className="text-gray-900">{complaint.aiResponse}</p>
                  </div>
                )}
              </div>
            )}

            {/* Status Update */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
              
              <div className="flex items-center space-x-4">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <button
                  onClick={handleStatusUpdate}
                  disabled={updating || newStatus === complaint.status}
                  className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  {updating ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintStatus;
