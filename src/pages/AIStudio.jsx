import React, { useState } from 'react';

const AIStudio = () => {
  const [activeTab, setActiveTab] = useState('resume');
  const [formData, setFormData] = useState({ name: '', role: '', skills: '' });
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    try {
      const endpoint = activeTab === 'resume' ? 'build-resume' : 'build-portfolio';
      // Render wala Live Backend URL
      const res = await fetch(`https://careerbridge-backend-1bd5.onrender.com/api/auth/users)`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.resume || data.code);
      } else {
        throw new Error();
      }
    } catch (err) {
      if (activeTab === 'resume') {
        setResult(`# ${formData.name || 'User'}\n**Target Role:** ${formData.role}\n\n## Technical Skills\n${formData.skills}`);
      } else {
        setResult(`<!DOCTYPE html><html><head><title>${formData.name} - Portfolio</title></head><body style="background:#0f172a; color:#fff; padding:40px;"><h1>${formData.name}</h1><p>${formData.role}</p></body></html>`);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI Studio</h2>
      <button onClick={handleGenerate}>Generate</button>
      <pre>{result}</pre>
    </div>
  );
};

export default AIStudio;
