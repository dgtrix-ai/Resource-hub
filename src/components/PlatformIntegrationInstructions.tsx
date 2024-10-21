import React from 'react';
import { HelpCircle } from 'lucide-react';

const PlatformIntegrationInstructions: React.FC = () => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
      <h4 className="text-lg font-semibold mb-2 flex items-center">
        <HelpCircle className="w-5 h-5 mr-2" />
        How to Add a Custom Platform
      </h4>
      <ol className="list-decimal list-inside space-y-2">
        <li>Provide a unique <strong>Platform ID</strong> (e.g., "arxiv") and <strong>Name</strong> (e.g., "arXiv").</li>
        <li>Enter the <strong>API URL</strong> for the platform's search endpoint (e.g., "https://export.arxiv.org/api/query").</li>
        <li>Specify the <strong>Search Parameters</strong>:
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>Use <code>{'{query}'}</code> as a placeholder for the search term.</li>
            <li>Use <code>{'{page}'}</code> as a placeholder for the page number.</li>
            <li>Example: <code>search_query={'{query}'}&start={'{page}'}&max_results=10&sortBy=relevance&sortOrder=descending</code></li>
          </ul>
        </li>
        <li>Enter the <strong>Result Key</strong>, which is the key in the API response that contains the array of results:
          <ul className="list-disc list-inside ml-4 mt-1">
            <li>For JSON responses, this is typically a key like "items" or "results".</li>
            <li>For XML responses (like arXiv), you can use "entry" to parse individual entries.</li>
          </ul>
        </li>
        <li>Click "Test Connection" to verify your configuration before saving.</li>
        <li>Click "Add Platform" to save your custom platform configuration.</li>
      </ol>
      <p className="mt-2 text-sm text-gray-600">
        Note: Ensure you have the necessary permissions to access and use the API of the platform you're integrating.
      </p>
    </div>
  );
};

export default PlatformIntegrationInstructions;