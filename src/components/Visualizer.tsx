import React from 'react';

const Visualizer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              StokeVision AI Visualizer
            </h1>
            <p className="text-lg text-gray-600">
              See your dream deck come to life with AI-powered visualization
            </p>
          </div>
        </div>
      </div>

      {/* Visualizer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div style={{ position: 'relative', width: '100%', height: 'min(100vh, 1000px)' }}>
            <iframe
              src="https://vision.stokeleads.com/#/embed"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
                borderRadius: '8px'
              }}
              allow="camera"
              title="StokeVision AI Visualizer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
