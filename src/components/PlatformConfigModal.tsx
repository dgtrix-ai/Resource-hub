import React, { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { Platform } from '../types';

interface PlatformConfigModalProps {
  onClose: () => void;
  onAddPlatform: (platform: Platform) => void;
}

const PlatformConfigModal: React.FC<PlatformConfigModalProps> = ({ onClose, onAddPlatform }) => {
  const [newPlatform, setNewPlatform] = useState<Platform>({
    id: '',
    name: '',
    apiUrl: '',
    searchParams: '',
    resultKey: '',
    itemTransform: (item: any) => ({
      id: item.id?.toString() || '',
      name: item.name || '',
      description: item.description || '',
      url: item.url || '',
    }),
  });
  const [testResult, setTestResult] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPlatform((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePlatform(newPlatform)) {
      onAddPlatform(newPlatform);
      onClose();
    } else {
      setTestResult('Please fill in all required fields correctly.');
    }
  };

  const handleTestConnection = async () => {
    if (!validatePlatform(newPlatform)) {
      setTestResult('Please fill in all required fields before testing.');
      return;
    }

    setTestResult('Testing connection...');
    try {
      const testUrl = `${newPlatform.apiUrl}?${newPlatform.searchParams
        .replace('{query}', 'test')
        .replace('{page}', '1')}`;
      const response = await fetch(testUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data[newPlatform.resultKey]) {
        setTestResult('Connection successful!');
      } else {
        setTestResult('Connection successful, but result key not found.');
      }
    } catch (error) {
      setTestResult(`Connection failed: ${error.message}`);
    }
  };

  const validatePlatform = (platform: Platform): boolean => {
    return (
      platform.id.trim() !== '' &&
      platform.name.trim() !== '' &&
      platform.apiUrl.trim() !== '' &&
      platform.searchParams.trim() !== '' &&
      platform.resultKey.trim() !== ''
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Platform</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">Platform ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={newPlatform.id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Platform Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newPlatform.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apiUrl" className="block text-sm font-medium text-gray-700">API URL</label>
            <input
              type="url"
              id="apiUrl"
              name="apiUrl"
              value={newPlatform.apiUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="searchParams" className="block text-sm font-medium text-gray-700">Search Parameters</label>
            <input
              type="text"
              id="searchParams"
              name="searchParams"
              value={newPlatform.searchParams}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="resultKey" className="block text-sm font-medium text-gray-700">Result Key</label>
            <input
              type="text"
              id="resultKey"
              name="resultKey"
              value={newPlatform.resultKey}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={handleTestConnection}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Zap className="w-4 h-4 mr-2" /> Test Connection
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Platform
            </button>
          </div>
        </form>
        {testResult && (
          <div className={`mt-4 p-2 rounded ${testResult.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {testResult}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformConfigModal;