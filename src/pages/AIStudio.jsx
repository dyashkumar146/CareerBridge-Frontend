const handleGenerate = async () => {
    try {
      const endpoint = activeTab === 'resume' ? 'build-resume' : 'build-portfolio';
      const res = await fetch(`http://localhost:5000/api/ai/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success) {
        setResult(data.resume || data.code);
      } else {
        throw new Error();
      }
    } catch (err) {
      // Local Instant Generation Fallback
      if(activeTab === 'resume') {
        setResult(`# ${formData.name || 'Chandresh'}\n**Target Role:** ${formData.role}\n\n## Technical Skills\n${formData.skills}\n\n## Key Projects\n${formData.projects || '- CareerBridge Platform: MERN Stack Web App'}`);
      } else {
        setResult(`<!DOCTYPE html>\n<html>\n<head><title>${formData.name} - Portfolio</title></head>\n<body style="background:#0f172a; color:#fff; padding:40px;">\n  <h1 style="color:#22d3ee;">${formData.name}</h1>\n  <h3>${formData.role}</h3>\n  <p>Skills: ${formData.skills}</p>\n</body>\n</html>`);
      }
    }
  };