const axios = require('axios');

// @desc    Analyze complaint using AI
// @route   POST /api/ai/analyze
// @access  Private
const analyzeComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide title and description' 
      });
    }

    // AI Analysis Logic (Simulated - Replace with actual AI API call)
    const analysis = await performAIAnalysis(title, description, category);

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// AI Analysis Function (Simulated)
const performAIAnalysis = async (title, description, category) => {
  // This is a simulated AI analysis. In production, replace with actual AI API calls
  // You can use OpenAI API, Google Cloud AI, or any other AI service
  
  const complaintText = `${title} ${description}`.toLowerCase();
  
  // Priority Detection
  let priority = 'Medium';
  const urgentKeywords = ['emergency', 'urgent', 'critical', 'danger', 'life-threatening', 'immediate'];
  const highKeywords = ['broken', 'damaged', 'leak', 'no water', 'no electricity', 'blocked'];
  
  if (urgentKeywords.some(keyword => complaintText.includes(keyword))) {
    priority = 'Critical';
  } else if (highKeywords.some(keyword => complaintText.includes(keyword))) {
    priority = 'High';
  } else {
    priority = 'Low';
  }

  // Department Recommendation
  const departmentMap = {
    'Water Supply': 'Water Department',
    'Electricity': 'Electricity Department',
    'Sanitation': 'Sanitation Department',
    'Roads': 'Public Works Department',
    'Health': 'Health Department',
    'Education': 'Education Department',
    'Other': 'General Administration'
  };

  const department = departmentMap[category] || 'General Administration';

  // Complaint Summary
  const summary = generateSummary(title, description);

  // Auto-generated Response
  const response = generateAutoResponse(title, priority, department);

  return {
    priority,
    department,
    summary,
    response
  };
};

// Generate Complaint Summary
const generateSummary = (title, description) => {
  // Simple summary generation (in production, use AI API)
  const words = description.split(' ');
  const summaryLength = Math.min(30, words.length);
  const summary = words.slice(0, summaryLength).join(' ') + (words.length > summaryLength ? '...' : '');
  return summary;
};

// Generate Auto Response
const generateAutoResponse = (title, priority, department) => {
  const responses = {
    'Critical': `Thank you for reporting "${title}". This has been marked as ${priority} priority and has been escalated to the ${department} for immediate action. Our team will contact you within 24 hours.`,
    'High': `Thank you for reporting "${title}". This has been marked as ${priority} priority and forwarded to the ${department}. We aim to resolve this within 48 hours.`,
    'Medium': `Thank you for reporting "${title}". Your complaint has been registered and forwarded to the ${department}. We will process it within 5-7 working days.`,
    'Low': `Thank you for reporting "${title}". Your complaint has been registered with the ${department}. We will address it as per our standard procedure.`
  };

  return responses[priority] || responses['Medium'];
};

module.exports = {
  analyzeComplaint
};
