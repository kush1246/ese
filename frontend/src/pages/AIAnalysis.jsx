import React, { useState } from 'react';
import { aiAPI } from '../services/api';
import { Brain, AlertTriangle, CheckCircle, Clock, Building2, FileText, Sparkles } from 'lucide-react';

const AIAnalysis = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Water Supply'
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Water Supply', 'Electricity', 'Sanitation', 'Roads', 'Health', 'Education', 'Other'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');
    setAnalysis(null);
    setLoading(true);

    try {
      const response = await aiAPI.analyze(formData);
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError(err.response?.data?.message || 'AI analysis failed');
    } finally {
      setLoading(false);
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

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'Critical': return <AlertTriangle className="h-6 w-6 text-red-600" />;
      case 'High': return <AlertTriangle className="h-6 w-6 text-orange-600" />;
      case 'Medium': return <Clock className="h-6 w-6 text-yellow-600" />;
      case 'Low': return <CheckCircle className="h-6 w-6 text-green-600" />;
      default: return <Clock className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Brain className="h-8 w-8 text-primary-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">AI Complaint Analysis</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Complaint Details</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complaint Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Brief title of the complaint"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Provide detailed description of the complaint"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              {loading ? 'Analyzing...' : 'Analyze with AI'}
            </button>
          </form>
        </div>

        {analysis && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-white mr-3" />
                <h2 className="text-2xl font-bold text-white">AI Analysis Results</h2>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Priority */}
              <div className={`p-6 rounded-lg border-2 ${getPriorityColor(analysis.priority)}`}>
                <div className="flex items-center">
                  {getPriorityIcon(analysis.priority)}
                  <div className="ml-4">
                    <p className="text-sm font-medium uppercase tracking-wide">Priority Level</p>
                    <p className="text-3xl font-bold">{analysis.priority}</p>
                  </div>
                </div>
              </div>

              {/* Department */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-start">
                  <Building2 className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Recommended Department</p>
                    <p className="text-xl font-semibold text-gray-900">{analysis.department}</p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-start">
                  <FileText className="h-6 w-6 text-gray-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Complaint Summary</p>
                    <p className="text-gray-900">{analysis.summary}</p>
                  </div>
                </div>
              </div>

              {/* Auto-Response */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Auto-Generated Response</p>
                    <p className="text-gray-900">{analysis.response}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;
