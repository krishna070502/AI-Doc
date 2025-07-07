import React, { useState, useRef, useEffect } from 'react';
import { Upload, AlertTriangle, Bot, Loader, HeartPulse, Zap, Pill, Bed, ShieldCheck, Info, Sparkles, BookOpen, ListChecks, Globe, Mic, MicOff, Volume2 } from 'lucide-react';

// Translations object for English and Telugu
const translations = {
  en: {
    title: "AI-DOC",
    subtitle: "Your AI-powered poultry health assistant",
    companyName: "by SHIVA AGROVET PVT LTD",
    inputInfo: "Input Information",
    symptomsLabel: "Describe Symptoms",
    symptomsPlaceholder: "e.g., Ruffled feathers, lethargy, coughing, pale comb, unusual droppings...",
    uploadLabel: "Upload Image (Recommended)",
    uploadText: "Upload a file",
    dragDropText: "or drag and drop",
    fileSize: "PNG, JPG up to 10MB",
    analyzeButton: "Get AI Analysis",
    analyzing: "Analyzing...",
    error: "Error",
    readyForAnalysis: "Ready for Analysis",
    readyText: "Enter symptoms and/or upload an image to get started.",
    analysisComplete: "Analysis Complete!",
    analysisReady: "Your AI analysis is ready to view.",
    viewResults: "View Analysis Results",
    analysisResults: "AI Analysis Results",
    accuracyTip: "For a more accurate analysis, consider providing an image next time.",
    nextSteps: "Next Steps",
    nutritionPlan: "✨ Generate Nutrition Plan",
    biosecurityChecklist: "✨ Create Biosecurity Checklist",
    close: "Close",
    disclaimer: "Important Disclaimer",
    disclaimerText: "This tool provides AI-generated information, not professional veterinary advice. Always consult a qualified veterinarian for a definitive diagnosis and treatment plan for your flock.",
    nutritionPlanTitle: "Supportive Nutrition Plan",
    biosecurityTitle: "Biosecurity Checklist",
    voiceInput: "Voice Input",
    startRecording: "Start Recording",
    stopRecording: "Stop Recording",
    listening: "Listening...",
    voiceNotSupported: "Voice input not supported in this browser",
    speakSymptoms: "Click and speak your symptoms",
    readAnalysis: "Read Analysis",
    stopReading: "Stop Reading",
    speechNotSupported: "Text-to-speech not supported in this browser",
    voiceInfo: "Voice may use English pronunciation for Telugu text if Telugu voice is not available",
    testVoice: "Test Voice",
    voiceTestText: "This is a voice test for poultry health analysis."
  },
  te: {
    title: "AI-DOC",
    subtitle: "మీ AI-పవర్డ్ కోడి ఆరోగ్య సహాయకుడు",
    companyName: "by శివ అగ్రోవెట్ ప్రైవేట్ లిమిటెడ్",
    inputInfo: "ఇన్‌పుట్ సమాచారం",
    symptomsLabel: "లక్షణాలను వివరించండి",
    symptomsPlaceholder: "ఉదా., చిందిన ఈకలు, బలహీనత, దగ్గు, పాలిపోయిన చుక్క, అసాధారణ విసర్జనలు...",
    uploadLabel: "చిత్రం అప్‌లోడ్ చేయండి (సిఫార్సు చేయబడింది)",
    uploadText: "ఫైల్ అప్‌లోడ్ చేయండి",
    dragDropText: "లేదా డ్రాగ్ మరియు డ్రాప్ చేయండి",
    fileSize: "PNG, JPG 10MB వరకు",
    analyzeButton: "AI విశ్లేషణ పొందండి",
    analyzing: "విశ్లేషిస్తోంది...",
    error: "Error",
    readyForAnalysis: "విశ్లేషణకు సిద్ధం",
    readyText: "ప్రారంభించడానికి లక్షణాలు మరియు/లేదా చిత్రాన్ని నమోదు చేయండి.",
    analysisComplete: "విశ్లేషణ పూర్తయింది!",
    analysisReady: "మీ AI విశ్లేషణ చూడటానికి సిద్ధంగా ఉంది.",
    viewResults: "విశ్లేషణ ఫలితాలను చూడండి",
    analysisResults: "AI విశ్లేషణ ఫలితాలు",
    accuracyTip: "మరింత ఖచ్చితమైన విశ్లేషణ కోసం, తదుపరిసారి చిత్రాన్ని అందించడాన్ని పరిగణించండి.",
    nextSteps: "తదుపరి దశలు",
    nutritionPlan: "✨ పోషకాహార ప్రణాళిక రూపొందించండి",
    biosecurityChecklist: "✨ బయోసెక్యూరిటి చెక్‌లిస్ట్ సృష్టించండి",
    close: "మూసివేయండి",
    disclaimer: "ముఖ్యమైన నిరాకరణ",
    disclaimerText: "ఈ సాధనం AI-జనరేటెడ్ సమాచారాన్ని అందిస్తుంది, వృత్తిపరమైన పశు వైద్య సలహా కాదు. మీ మందకు ఖచ్చితమైన రోగ నిర్ధారణ మరియు చికిత్స ప్రణాళిక కోసం ఎల్లప్పుడూ అర్హత కలిగిన పశు వైద్యుడిని సంప్రదించండి.",
    nutritionPlanTitle: "సహాయక పోషకాహార ప్రణాళిక",
    biosecurityTitle: "బయోసెక్యూరిటి చెక్‌లిస్ట్",
    voiceInput: "వాయిస్ ఇన్‌పుట్",
    startRecording: "రికార్డింగ్ ప్రారంభించండి",
    stopRecording: "రికార్డింగ్ ఆపండి",
    listening: "వింటోంది...",
    voiceNotSupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ మద్దతు లేదు",
    speakSymptoms: "క్లిక్ చేసి మీ లక్షణాలను మాట్లాడండి",
    readAnalysis: "విశ్లేషణను చదవండి",
    stopReading: "చదవడం ఆపండి",
    speechNotSupported: "ఈ బ్రౌజర్‌లో టెక్స్ట్-టు-స్పీచ్ మద్దతు లేదు",
    voiceInfo: "తెలుగు వాయిస్ అందుబాటులో లేకపోతే ఆంగ్ల ఉచ్ఛారణతో చదవవచ్చు",
    testVoice: "వాయిస్ టెస్ట్",
    voiceTestText: "ఇది కోడి ఆరోగ్య విశ్లేషణ కోసం వాయిస్ టెస్ట్."
  }
};

// Modal Component for displaying additional AI content
const Modal = ({ title, content, onClose, icon, show, t }) => {
  if (!content || !show) return null;
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center p-2 sm:p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative group">
        {/* Glowing border effect */}
        <div className="absolute -inset-1 bg-neon-gradient rounded-2xl opacity-30 blur group-hover:opacity-50 transition duration-500"></div>
        <div className="relative bg-glass-white backdrop-blur-xl rounded-2xl border border-white/20 shadow-glass w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col mx-2 sm:mx-4 overflow-hidden">
          {/* Scanning line effect */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50 animate-scan"></div>
          
          <header className="flex justify-between items-center p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-cyber-gray/50 to-cyber-dark/50">
            <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center">
              <span className="text-neon-blue mr-2">{icon}</span>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white text-2xl sm:text-3xl font-bold w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-neon-blue/30"
            >
              &times;
            </button>
          </header>
          <main 
            className="p-4 sm:p-8 overflow-y-auto flex-grow text-sm sm:text-base text-gray-200 bg-gradient-to-br from-cyber-dark/30 to-cyber-gray/30" 
            dangerouslySetInnerHTML={{ __html: content }} 
          />
          <footer className="p-4 sm:p-6 border-t border-white/10 bg-gradient-to-r from-cyber-gray/50 to-cyber-dark/50 text-right">
            <button 
              onClick={onClose} 
              className="relative px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl hover:from-neon-purple hover:to-neon-pink font-semibold text-sm sm:text-base shadow-cyber transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
              <span className="relative z-10">{t.close}</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};


// Main App Component
const App = () => {
  // State Management
  const [symptoms, setSymptoms] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingExtra, setIsGeneratingExtra] = useState(false);
  const [error, setError] = useState('');
  const [wasImageUsed, setWasImageUsed] = useState(false);
  const [lang, setLang] = useState('en'); // Language state
  
  // Voice input states
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const recognitionRef = useRef(null);
  
  // Text-to-speech states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastSpokenText, setLastSpokenText] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  
  // New states for Gemini-powered features
  const [nutritionPlan, setNutritionPlan] = useState('');
  const [biosecurityChecklist, setBiosecurityChecklist] = useState('');
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [showBiosecurityModal, setShowBiosecurityModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  // Get current translations
  const t = translations[lang];

  // Check for voice input support and initialize
  useEffect(() => {
    // Check for speech recognition support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsVoiceSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Configure speech recognition
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      // Set language based on current language selection
      recognitionRef.current.lang = lang === 'te' ? 'te-IN' : 'en-IN';
      
      // Handle speech recognition results
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setSymptoms(prev => prev + (prev ? ' ' : '') + finalTranscript);
        }
      };

      // Handle speech recognition errors
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone access and try again.');
        }
      };

      // Handle speech recognition end
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    // Check for text-to-speech support
    if ('speechSynthesis' in window) {
      setIsSpeechSupported(true);
      
      // Load voices - sometimes they load asynchronously
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => ({name: v.name, lang: v.lang})));
      };
      
      // Load voices immediately if available
      loadVoices();
      
      // Also load when voices change (for browsers that load them async)
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Cleanup function
    return () => {
      if (recognitionRef.current && isRecording) {
        recognitionRef.current.stop();
      }
      if (window.speechSynthesis && isSpeaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lang]);

  // Update speech recognition language when language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang === 'te' ? 'te-IN' : 'en-IN';
    }
  }, [lang]);

  // Start voice recording
  const startVoiceRecording = () => {
    if (recognitionRef.current && !isRecording) {
      try {
        setError('');
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setError('Failed to start voice recording. Please try again.');
      }
    }
  };

  // Stop voice recording
  const stopVoiceRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  // Function to convert Telugu text to phonetic English for better pronunciation
  const teluguToPhonetic = (text) => {
    // Comprehensive Telugu to phonetic mapping for medical/farming terms
    const teluguPhoneticMap = {
      // Basic terms
      'కోడి': 'kodi',
      'కోళ్లు': 'kollu',
      'ఆరోగ్య': 'arogya',
      'లక్షణాలు': 'lakshanalu',
      'వైద్యుడు': 'vaidyudu',
      'మందు': 'mandu',
      'మందులు': 'mandulu',
      'చికిత్స': 'chikitsa',
      'సమస్య': 'samasya',
      'విశ్లేషణ': 'vishleshana',
      
      // Symptoms
      'ఈకలు': 'ekalu',
      'బలహీనత': 'balaheenata',
      'దగ్గు': 'daggu',
      'జ్వరం': 'jvaram',
      'విసర్జనలు': 'visarjanalu',
      'డయేరియా': 'diarrhea',
      'వాంతులు': 'vantulu',
      'నిర్జలీకరణ': 'nirjalikarana',
      'తలనొప్పి': 'talanoppi',
      'కళ్ళ': 'kallu',
      'ముఖం': 'mukham',
      'చుక్క': 'chukka',
      
      // Actions
      'తక్షణ': 'takshana',
      'చర్యలు': 'charyalu',
      'చర్య': 'charya',
      'చేయండి': 'cheyandi',
      'ఇవ్వండి': 'ivvandi',
      'తీసుకోండి': 'tisukôndi',
      'ఉపయోగించండి': 'upayoginchaandi',
      
      // Care and treatment
      'పోషకాహారం': 'poshakahaaram',
      'ఆహారం': 'aahaaram',
      'నీరు': 'neeru',
      'నివారణ': 'nivarana',
      'సంరక్షణ': 'sanrakshana',
      'ప్రణాళిక': 'pranaaleeka',
      'వైద్య': 'vaidya',
      'సలహా': 'salaha',
      'పరీక్ష': 'pareeksha',
      
      // Numbers
      'ఒకటి': 'okati',
      'రెండు': 'rendu',
      'మూడు': 'moodu',
      'నాలుగు': 'naalugu',
      'ఐదు': 'aidu',
      'ఆరు': 'aaru',
      'ఏడు': 'edu',
      
      // Time
      'రోజు': 'roju',
      'రోజులు': 'rojulu',
      'వారం': 'vaaram',
      'నెల': 'nela',
      'గంట': 'ganta',
      'గంటలు': 'gantalu',
      
      // Common words
      'మరియు': 'mariyu',
      'లేదా': 'leda',
      'కోసం': 'kosam',
      'తర్వాత': 'tarvata',
      'ముందు': 'mundu',
      'అవుతుంది': 'avutundi',
      'అవసరం': 'avasaram',
      'ముఖ్యమైన': 'mukhyamaina',
      'సాధారణ': 'sadharana',
      
      // Additional farm and medical terms
      'కోడిగాడు': 'kodigadu',
      'కోడిపిల్ల': 'kodipilla',
      'గుడ్డు': 'guddu',
      'గుడ్లు': 'guddalu',
      'రైతు': 'raitu',
      'వ్యవసాయ': 'vyavasaya',
      'పశువులు': 'paشuvulu',
      'స్వాస్థ్యం': 'svaasthyam',
      'అనారోగ్యం': 'anaarogyam',
      'ఆరోగ్యం': 'aarogyam',
      'మరణం': 'maranam',
      'బతుకు': 'batuku',
      'జీవితం': 'jeevitam',
      'ప్రాణం': 'praanam',
      'శ్వాస': 'shvaasa',
      'ఊపిరి': 'oopiri',
      'హృదయం': 'hrudayam',
      'కడుపు': 'kadupu',
      'పేగులు': 'pegulu',
      'కాలేయం': 'kaleyam',
      'మూత్రపిండాలు': 'mootrapindaalu',
      'రక్తం': 'raktam',
      'శరీరం': 'shareram',
      'ఎముకలు': 'emukalu',
      'కండరాలు': 'kandaraalu',
      'చర్మం': 'charmam',
      'కేంద్రం': 'kendram',
      'ఆసుపత్రి': 'aasupatri',
      'డాక్టర్': 'doctor',
      'నర్సు': 'nurse',
      'ఇంజెక్షన్': 'injection',
      'మాత్రలు': 'maatralu',
      'సిరప్': 'syrup',
      'పరీక్షలు': 'pareekshalu',
      'రిపోర్టు': 'report',
      'వైద్యం': 'vaidyam',
      'శుశ్రూష': 'shushroosha',
      'జాగ్రత్త': 'jaagratta'
    };

    let phoneticText = text;
    
    // Sort by length (longest first) to avoid partial replacements
    const sortedKeys = Object.keys(teluguPhoneticMap).sort((a, b) => b.length - a.length);
    
    sortedKeys.forEach(telugu => {
      const phonetic = teluguPhoneticMap[telugu];
      phoneticText = phoneticText.replace(new RegExp(telugu, 'g'), phonetic);
    });

    return phoneticText;
  };

  // Function to convert markdown text to plain text for speech
  const markdownToPlainText = (markdown) => {
    return markdown
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
      .replace(/\*(.*?)\*/g, '$1') // Remove italic formatting
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
      .replace(/`(.*?)`/g, '$1') // Remove code formatting
      .replace(/\n\s*\n/g, '\n') // Remove extra line breaks
      .replace(/\n/g, ' ') // Convert line breaks to spaces
      .trim();
  };

  // Start text-to-speech with enhanced Telugu support
  const startSpeech = (text) => {
    if (!isSpeechSupported) {
      setError(t.speechNotSupported);
      return;
    }

    // Stop any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const plainText = markdownToPlainText(text);
    setLastSpokenText(plainText); // Store for repeat functionality
    
    if (lang === 'te') {
      // Try multiple approaches for Telugu text-to-speech
      speakTeluguText(plainText);
    } else {
      speakEnglishText(plainText);
    }
  };

  // Function to speak Telugu text with multiple fallback strategies
  const speakTeluguText = (text) => {
    const voices = window.speechSynthesis.getVoices();
    console.log('Available voices for Telugu:', voices.map(v => ({name: v.name, lang: v.lang})));
    
    // Strategy 1: Try to find a proper Telugu voice
    const teluguVoice = voices.find(voice => 
      voice.lang.includes('te') || 
      voice.lang.includes('Telugu') ||
      voice.name.toLowerCase().includes('telugu')
    );

    if (teluguVoice) {
      console.log('Using Telugu voice:', teluguVoice.name);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = teluguVoice;
      utterance.lang = 'te-IN';
      utterance.rate = 0.5; // Extra slow for Telugu farmers
      utterance.pitch = 1;
      utterance.volume = 1;
      
      setupSpeechEvents(utterance);
      window.speechSynthesis.speak(utterance);
      return;
    }

    // Strategy 2: Try Hindi voice (better for Indian languages)
    const hindiVoice = voices.find(voice => 
      voice.lang.includes('hi') || 
      voice.lang.includes('Hindi') ||
      voice.name.toLowerCase().includes('hindi')
    );

    if (hindiVoice) {
      console.log('Using Hindi voice for Telugu text:', hindiVoice.name);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = hindiVoice;
      utterance.lang = 'hi-IN';
      utterance.rate = 0.5; // Extra slow for better comprehension
      utterance.pitch = 1;
      utterance.volume = 1;
      
      setupSpeechEvents(utterance);
      window.speechSynthesis.speak(utterance);
      return;
    }

    // Strategy 3: Use phonetic transliteration with English voice
    console.log('Using phonetic transliteration approach');
    const phoneticText = teluguToPhonetic(text);
    const englishVoice = voices.find(voice => 
      voice.lang.includes('en-IN') || 
      (voice.lang.includes('en') && voice.name.toLowerCase().includes('india'))
    ) || voices.find(voice => voice.lang.includes('en'));

    if (englishVoice) {
      const utterance = new SpeechSynthesisUtterance(phoneticText);
      utterance.voice = englishVoice;
      utterance.lang = 'en-IN';
      utterance.rate = 0.4; // Extra slow for phonetic pronunciation
      utterance.pitch = 0.9;
      utterance.volume = 1;
      
      setupSpeechEvents(utterance);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Function to speak English text
  const speakEnglishText = (text) => {
    const voices = window.speechSynthesis.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find an English (India) voice for better pronunciation of Indian terms
    const englishIndiaVoice = voices.find(voice => 
      voice.lang.includes('en-IN') || 
      (voice.lang.includes('en') && voice.name.toLowerCase().includes('india'))
    );
    
    if (englishIndiaVoice) {
      utterance.voice = englishIndiaVoice;
      utterance.lang = 'en-IN';
    } else {
      utterance.lang = 'en-US';
    }
    
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    setupSpeechEvents(utterance);
    window.speechSynthesis.speak(utterance);
  };

  // Setup common speech events
  const setupSpeechEvents = (utterance) => {
    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setIsSpeaking(false);
      
      if (lang === 'te') {
        setError('Telugu text-to-speech encountered an issue. The system tried multiple voice options. Please try again or switch to English for better audio support.');
      } else {
        setError('Failed to read the text. Please try again.');
      }
    };
  };

  // Stop text-to-speech
  const stopSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Repeat the last spoken text
  const repeatSpeech = () => {
    if (lastSpokenText) {
      if (lang === 'te') {
        speakTeluguText(lastSpokenText);
      } else {
        speakEnglishText(lastSpokenText);
      }
    }
  };

  // Test voice function for users to check audio
  const testVoice = () => {
    const testText = t.voiceTestText;
    startSpeech(testText);
  };


  // Handles image selection and creates a preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Converts image file to base64 for the API call
  const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
  });

  // Generic function to call Gemini API
  const callGemini = async (prompt, imageData = null) => {
      const parts = [{ text: prompt }];
      if (imageData) {
        parts.push({
          inlineData: {
            mimeType: imageData.type,
            data: await toBase64(imageData.file)
          }
        });
      }

      const payload = {
        contents: [{ role: "user", parts: parts }],
      };
      
      const apiKey = "AIzaSyBjFm7qIGGO96AoKgfIa4Gv1K_R_teaF9A"; // API key will be automatically handled by the environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API error: ${response.statusText}. Details: ${errorBody}`);
      }

      const result = await response.json();
      
      if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts[0].text) {
        return result.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected API response structure:", result);
        throw new Error("No content received from the AI. The response might be empty or blocked.");
      }
  };


  // Main function to get analysis from Gemini API
  const getAnalysis = async () => {
    if (!symptoms && !image) {
      setError(t.error + ': Please provide symptoms or an image.');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis(null);
    setNutritionPlan('');
    setBiosecurityChecklist('');
    setWasImageUsed(!!image);

    try {
      const isTeluguMode = lang === 'te';
      const languageInstruction = isTeluguMode 
        ? 'Respond in Telugu language. All medical terms should be explained in Telugu with English equivalents in parentheses where helpful.'
        : 'Respond in English language.';
      
      const prompt = `
        You are an expert AI Poultry Health Assistant. ${languageInstruction}
        Your primary goal is to provide a detailed, actionable, and safe analysis based on user-provided information.
        **IMPORTANT SAFETY NOTICE:** You must include a section advising the user to consult a qualified veterinarian. Under a "Medicines to use" section, you can suggest common over-the-counter treatments but MUST state that prescription medications require a veterinarian's diagnosis and prescription.
        **Your Task:** Analyze the user's description ${image ? 'and the accompanying image' : ''} of the poultry. Provide a detailed, structured response in Markdown format using the following headings EXACTLY:
        ${isTeluguMode ? `
        ### సమస్యకు సంభావ్య మూల కారణం
        ### తక్షణ చర్యలు
        ### ఉపయోగించవలసిన మందులు (భారతదేశంలో అందుబాటులో లేకపోయినా సమస్యకు అన్ని మందుల పేర్లు ఇవ్వండి)
        ### తీసుకోవాలసిన ఇతర సహాయక సంరక్షణ
        ### నివారణ చర్యలు
        ` : `
        ### Possible root cause for the problem
        ### Immediate Actions
        ### Medicines to use(Even if they are not available over-the-counter give all the medicine names available in india for the problem)
        ### Other supportive care to be taken
        ### Preventive Measures
        `}
        ---
        **USER'S DESCRIPTION:** "${symptoms}"
        ---
        ${!image ? `\n**Analysis Context:** Base your analysis solely on the text description provided. Do not mention the lack of an image.` : ""}
      `;
      const result = await callGemini(prompt, image ? { file: image, type: image.type } : null);
      setAnalysis(result);
      setShowAnalysisModal(true); // Show modal when analysis is complete
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // ✨ Function to generate Nutrition Plan
  const getNutritionPlan = async () => {
      setIsGeneratingExtra(true);
      setError('');
      try {
          const isTeluguMode = lang === 'te';
          const languageInstruction = isTeluguMode 
            ? 'Respond in Telugu language. Format the output as clean HTML with Telugu headings, lists, and bold text for emphasis.'
            : 'Respond in English language. Format the output as clean HTML with headings, lists, and bold text for emphasis.';
          
          const prompt = `
            Based on the following user-provided symptoms and the initial AI analysis, create a detailed, supportive 7-day feeding and nutrition plan for the affected poultry.
            The plan should be practical for a small-scale poultry keeper.
            ${languageInstruction} Do not include \`\`\`html.
            
            **Original Symptoms:** "${symptoms}"
            
            **Initial AI Analysis Summary:**
            ${analysis}
          `;
          const result = await callGemini(prompt);
          setNutritionPlan(result);
          setShowNutritionModal(true);
      } catch (err) {
          setError("Failed to generate nutrition plan. " + err.message);
      } finally {
          setIsGeneratingExtra(false);
      }
  };

  // ✨ Function to generate Biosecurity Checklist
  const getBiosecurityChecklist = async () => {
      setIsGeneratingExtra(true);
      setError('');
      try {
          const isTeluguMode = lang === 'te';
          const languageInstruction = isTeluguMode 
            ? 'Respond in Telugu language. Format the output as clean HTML with Telugu headings and unordered lists.'
            : 'Respond in English language. Format the output as clean HTML with headings and unordered lists.';
          
          const prompt = `
            Based on the following user-provided symptoms and initial AI analysis, create a comprehensive biosecurity checklist for a small-scale poultry keeper.
            The checklist should include daily, weekly, and monthly tasks.
            Make it practical and easy to follow.
            ${languageInstruction} Use headings (\`<h3>\`), and unordered lists (\`<ul><li>\`). Do not include \`\`\`html.

            **Original Symptoms:** "${symptoms}"
            
            **Initial AI Analysis Summary:**
            ${analysis}
          `;
          const result = await callGemini(prompt);
          setBiosecurityChecklist(result);
          setShowBiosecurityModal(true);
      } catch (err) {
          setError("Failed to generate biosecurity checklist. " + err.message);
      } finally {
          setIsGeneratingExtra(false);
      }
  };

  // Component to render the formatted analysis from Markdown
  const RenderAnalysis = ({ markdownText }) => {
    const formattedHtml = markdownText
      // English headings
      .replace(/### Possible root cause for the problem/g, '<h3 class="text-xl font-bold text-white mt-6 mb-4 flex items-center border-b border-neon-blue/30 pb-2"><span class="inline-block mr-3 text-red-400">❤️‍🩹</span>Possible Root Cause</h3>')
      .replace(/### Immediate Actions/g, '<h3 class="text-xl font-bold text-white mt-6 mb-4 flex items-center border-b border-neon-blue/30 pb-2"><span class="inline-block mr-3 text-yellow-400">⚡</span>Immediate Actions</h3>')
      .replace(/### Medicines to use\(Even if they are not available over-the-counter give all the medicine names available in india for the problem\)/g, '<h3 class="text-xl font-bold text-white mt-6 mb-4 flex items-center border-b border-neon-blue/30 pb-2"><span class="inline-block mr-3 text-green-400">💊</span>Medicines to Use</h3>')
      .replace(/### Other supportive care to be taken/g, '<h3 class="text-xl font-bold text-white mt-6 mb-4 flex items-center border-b border-neon-blue/30 pb-2"><span class="inline-block mr-3 text-blue-400">🛏️</span>Supportive Care</h3>')
      .replace(/### Preventive Measures/g, '<h3 class="text-xl font-bold text-white mt-6 mb-4 flex items-center border-b border-neon-blue/30 pb-2"><span class="inline-block mr-3 text-indigo-400">🛡️</span>Preventive Measures</h3>')
      // Telugu headings
      .replace(/### సమస్యకు సంభావ్య మూల కారణం/g, '<h3 class="text-xl font-bold text-white mt-6 mb-4 flex items-center border-b border-neon-blue/30 pb-2"><span class="inline-block mr-3 text-red-400">❤️‍🩹</span>సమస్యకు సంభావ్య మూల కారణం</h3>')
      .replace(/### తక్షణ చర్యలు/g, '<h3 class="text-xl font-bold text-white mt-6 mb-4 flex items-center border-b border-neon-blue/30 pb-2"><span class="inline-block mr-3 text-yellow-400">⚡</span>తక్షణ చర్యలు</h3>')
      .replace(/### ఉపయోగించవలసిన మందులు \(భారతదేశంలో అందుబాటులో లేకపోయినా సమస్యకు అన్ని మందుల పేర్లు ఇవ్వండి\)/g, '<h3 class="text-xl font-bold text-white mt-6 mb-4 flex items-center border-b border-neon-blue/30 pb-2"><span class="inline-block mr-3 text-green-400">💊</span>ఉపయోగించవలసిన మందులు</h3>')
      .replace(/### తీసుకోవాలసిన ఇతర సహాయక సంరక్షణ/g, '<h3 class="text-xl font-bold text-white mt-6 mb-4 flex items-center border-b border-neon-blue/30 pb-2"><span class="inline-block mr-3 text-blue-400">🛏️</span>తీసుకోవాలసిన ఇతర సహాయక సంరక్షణ</h3>')
      .replace(/### నివారణ చర్యలు/g, '<h3 class="text-xl font-bold text-white mt-6 mb-4 flex items-center border-b border-neon-blue/30 pb-2"><span class="inline-block mr-3 text-indigo-400">🛡️</span>నివారణ చర్యలు</h3>')
      // General formatting
      .replace(/\*\*(.*?):\*\*/g, '<strong class="font-semibold text-neon-blue">$1:</strong>')
      .replace(/\* \*\*(.*?):\*\* (.*)/g, '<p class="mt-3 mb-2 p-3 bg-glass-white backdrop-blur-md rounded-xl border border-white/10"><strong class="font-semibold text-neon-blue">$1:</strong> <span class="text-gray-300">$2</span></p>')
      .replace(/• (.*?)(?:\n|$)/g, '<li class="ml-6 list-disc text-gray-300 mb-2 text-base">$1</li>')
      .replace(/\* (.*?)(?:\n|$)/g, '<li class="ml-6 list-disc text-gray-300 mb-2 text-base">$1</li>')
      .replace(/\n\n/g, '<br /><br />')
      .replace(/\n/g, '<br />');
      
    return <div className="prose max-w-none text-gray-300 space-y-3 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
  };

  // Analysis Modal Component
  const AnalysisModal = ({ analysis, onClose, wasImageUsed, show }) => {
    if (!analysis || !show) return null;
    
    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    };

    // Stop speech when modal is closed
    const handleClose = () => {
      if (isSpeaking) {
        stopSpeech();
      }
      onClose();
    };
    
    return (
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center p-2 sm:p-4 z-50" 
        onClick={handleBackdropClick}
      >
        <div className="relative group">
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-neon-gradient rounded-2xl opacity-30 blur group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-glass-white backdrop-blur-xl rounded-2xl border border-white/20 shadow-glass w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] flex flex-col mx-2 sm:mx-4 overflow-hidden">
            {/* Scanning line effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50 animate-scan"></div>
            
            <header className="flex justify-between items-center p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-cyber-gray/50 to-cyber-dark/50">
              <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center">
                <Bot className="mr-2 sm:mr-3 text-neon-blue h-5 w-5 sm:h-6 sm:w-6 animate-pulse"/>
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t.analysisResults}
                </span>
              </h2>
              <div className="flex items-center space-x-2">
                {isSpeechSupported && (
                  <>
                    <button
                      onClick={testVoice}
                      className="flex items-center space-x-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-400/50 hover:shadow-neon-purple backdrop-blur-md"
                      title={t.testVoice}
                      disabled={isSpeaking}
                    >
                      <Volume2 className="h-4 w-4" />
                      <span className="hidden sm:inline">{t.testVoice}</span>
                    </button>
                    <button
                      onClick={isSpeaking ? stopSpeech : () => startSpeech(analysis)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-md ${
                        isSpeaking 
                          ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-400/50 shadow-neon-purple' 
                          : 'bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-400/50 hover:shadow-neon'
                      }`}
                      title={isSpeaking ? t.stopReading : t.readAnalysis}
                    >
                      {isSpeaking ? (
                        <>
                          <Volume2 className="h-4 w-4 animate-pulse" />
                          <span className="hidden sm:inline">{t.stopReading}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-4 w-4" />
                          <span className="hidden sm:inline">{t.readAnalysis}</span>
                        </>
                      )}
                    </button>
                  </>
                )}
                <button 
                  onClick={handleClose} 
                  className="text-gray-400 hover:text-white text-2xl sm:text-3xl font-bold w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-neon-blue/30"
                >
                  &times;
                </button>
              </div>
            </header>
            <main className="p-4 sm:p-8 overflow-y-auto flex-grow bg-gradient-to-br from-cyber-dark/30 to-cyber-gray/30">
              {isSpeaking && (
                <div className="mb-4 p-3 bg-green-500/10 border border-green-400/30 text-green-300 rounded-xl text-sm flex items-center backdrop-blur-md">
                  <Volume2 className="h-4 w-4 mr-2 animate-pulse" />
                  <span>{lang === 'te' ? 'విశ్లేషణను చదువుతోంది...' : 'Reading analysis...'}</span>
                </div>
              )}
              {isSpeechSupported && lang === 'te' && (
                <div className="mb-4 p-3 bg-blue-500/10 border border-blue-400/30 text-blue-300 rounded-xl text-sm flex items-center backdrop-blur-md">
                  <Info className="h-4 w-4 mr-2 shrink-0" />
                  <span>{t.voiceInfo}</span>
                </div>
              )}
              {wasImageUsed === false && (
                <div className="p-3 sm:p-4 mb-4 sm:mb-6 bg-blue-500/10 border border-blue-400/30 text-blue-300 rounded-xl text-sm sm:text-base flex items-center backdrop-blur-md">
                    <Info className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 shrink-0" />
                    {t.accuracyTip}
                </div>
              )}
              <RenderAnalysis markdownText={analysis} />
              
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20 space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                  <Sparkles className="mr-2 sm:mr-3 text-neon-purple h-5 w-5 sm:h-6 sm:w-6 animate-pulse"/>{t.nextSteps}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <button onClick={getNutritionPlan} disabled={isGeneratingExtra} className="relative w-full text-sm sm:text-base bg-green-500/20 text-green-300 font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-xl hover:bg-green-500/30 disabled:bg-gray-500/20 disabled:text-gray-500 flex items-center justify-center transition-all duration-300 border border-green-400/30 hover:border-green-400/50 backdrop-blur-md group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent -skew-x-12 animate-shimmer"></div>
                      <span className="relative z-10 flex items-center">
                        {isGeneratingExtra ? <Loader className="animate-spin mr-2 h-4 w-4 sm:h-5 sm:w-5"/> : <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce"/>}
                        {t.nutritionPlan}
                      </span>
                  </button>
                  <button onClick={getBiosecurityChecklist} disabled={isGeneratingExtra} className="relative w-full text-sm sm:text-base bg-indigo-500/20 text-indigo-300 font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-xl hover:bg-indigo-500/30 disabled:bg-gray-500/20 disabled:text-gray-500 flex items-center justify-center transition-all duration-300 border border-indigo-400/30 hover:border-indigo-400/50 backdrop-blur-md group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/10 to-transparent -skew-x-12 animate-shimmer"></div>
                      <span className="relative z-10 flex items-center">
                        {isGeneratingExtra ? <Loader className="animate-spin mr-2 h-4 w-4 sm:h-5 sm:w-5"/> : <ListChecks className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce"/>}
                        {t.biosecurityChecklist}
                      </span>
                  </button>
                </div>
              </div>
            </main>
            <footer className="p-4 sm:p-6 border-t border-white/10 bg-gradient-to-r from-cyber-gray/50 to-cyber-dark/50 text-right">
              <button 
                onClick={handleClose} 
                className="relative px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl hover:from-neon-purple hover:to-neon-pink font-semibold text-sm sm:text-base shadow-cyber transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                <span className="relative z-10">{t.close}</span>
              </button>
            </footer>
          </div>
        </div>
      </div>
    );
  };


  return (
    <>
      <div className="relative bg-gradient-to-br from-cyber-dark via-slate-900 to-cyber-gray min-h-screen font-cyber overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-neon-blue opacity-20 blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-neon-purple opacity-20 blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-neon-pink opacity-10 blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="relative container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
          
          <header className="text-center mb-6 sm:mb-8 relative">
            {/* Language Switcher */}
            <div className="absolute top-0 right-0 flex items-center space-x-2">
              <button
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                className="flex items-center space-x-2 px-4 py-2 bg-glass-white backdrop-blur-md rounded-xl border border-white/20 hover:border-neon-blue/50 transition-all duration-300 text-white hover:shadow-neon group"
                title={lang === 'en' ? 'Switch to Telugu' : 'Switch to English'}
              >
                <Globe className="h-4 w-4 text-neon-blue group-hover:animate-spin transition-all" />
                <span className="text-sm font-medium">
                  {lang === 'en' ? 'తెలుగు' : 'English'}
                </span>
              </button>
            </div>
            
            <div className="relative inline-block">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent mb-2 sm:mb-3 animate-glow">
                {t.title}
              </h1>
              <div className="absolute -inset-1 bg-neon-gradient opacity-30 blur-xl rounded-lg animate-pulse-neon"></div>
            </div>
            <p className="text-base sm:text-lg text-gray-300 mb-2 sm:mb-3 px-2 font-light tracking-wide">{t.subtitle}</p>
            <div className="relative inline-block">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-neon-blue animate-pulse">{t.companyName}</p>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Input Section */}
            <div className="relative group">
              {/* Glowing border effect */}
              <div className="absolute -inset-0.5 bg-neon-gradient rounded-2xl opacity-30 blur group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-glass-white backdrop-blur-md rounded-2xl border border-white/20 shadow-glass p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                {/* Scanning line effect */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50 animate-scan"></div>
                
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center group">
                  <Upload className="mr-2 sm:mr-3 text-neon-blue h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-bounce transition-all" />
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {t.inputInfo}
                  </span>
                </h2>
              
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <label htmlFor="symptoms" className="block text-base sm:text-lg font-semibold text-gray-200">
                    {t.symptomsLabel}
                  </label>
                  {isVoiceSupported && (
                    <button
                      onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                      className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-md border ${
                        isRecording 
                          ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30 border-red-400/50 shadow-neon-purple' 
                          : 'bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 border-neon-blue/50 hover:shadow-neon'
                      }`}
                      disabled={isLoading}
                      title={isRecording ? t.stopRecording : t.startRecording}
                    >
                      {/* Pulse effect for recording */}
                      {isRecording && (
                        <div className="absolute inset-0 rounded-xl bg-red-400 opacity-20 animate-ping"></div>
                      )}
                      {isRecording ? (
                        <>
                          <MicOff className="h-4 w-4 relative z-10" />
                          <span className="hidden sm:inline relative z-10">{t.listening}</span>
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 relative z-10" />
                          <span className="hidden sm:inline relative z-10">{t.voiceInput}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    id="symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder={isVoiceSupported ? 
                      `${t.symptomsPlaceholder}\n\n💡 ${t.speakSymptoms}` : 
                      t.symptomsPlaceholder
                    }
                    className={`w-full h-32 sm:h-40 md:h-48 p-3 sm:p-4 bg-glass-white backdrop-blur-md border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-blue focus:border-neon-blue transition-all duration-300 text-sm sm:text-base resize-none ${
                      isRecording ? 'ring-2 ring-red-400 border-red-400 bg-red-500/10 shadow-neon-purple' : 'border-white/20 hover:border-neon-blue/50'
                    }`}
                  />
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 pointer-events-none"></div>
                </div>
                {isRecording && (
                  <div className="mt-3 flex items-center space-x-3 text-red-300 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-neon-purple"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-neon-purple" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-neon-purple" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="font-medium tracking-wide">{t.listening}</span>
                    <div className="flex-1 h-1 bg-red-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full animate-scan"></div>
                    </div>
                  </div>
                )}
                {!isVoiceSupported && (
                  <p className="mt-2 text-sm text-gray-400">{t.voiceNotSupported}</p>
                )}
              </div>

              <div>
                <label className="block text-base sm:text-lg font-semibold text-gray-200 mb-2 sm:mb-3">
                  {t.uploadLabel}
                </label>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-xl opacity-20 group-hover:opacity-40 transition duration-300 blur"></div>
                  <div className="relative mt-2 flex justify-center px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-8 border-2 border-dashed border-white/20 rounded-xl backdrop-blur-md bg-glass-white hover:border-neon-blue/50 transition-all duration-300 group-hover:shadow-cyber">
                    <div className="space-y-2 text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt="Poultry preview" className="mx-auto h-32 sm:h-40 md:h-48 w-auto rounded-lg object-cover shadow-cyber border border-neon-blue/30"/>
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-blue/10 to-neon-purple/10"></div>
                        </div>
                      ) : (
                        <div className="relative">
                          <Upload className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 group-hover:text-neon-blue transition-colors duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 border-2 border-neon-blue/20 rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row text-xs sm:text-sm text-gray-300 justify-center items-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent rounded-md font-medium hover:from-neon-purple hover:to-neon-pink focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-neon-blue transition-all duration-300">
                          <span className="text-sm sm:text-base font-semibold">{t.uploadText}</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                        </label>
                        <p className="sm:pl-1 text-sm sm:text-base">{t.dragDropText}</p>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400">{t.fileSize}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button
                  onClick={getAnalysis}
                  disabled={isLoading}
                  className="relative w-full bg-gradient-to-r from-neon-blue via-blue-500 to-neon-purple text-white font-bold py-4 sm:py-5 px-4 sm:px-6 rounded-xl hover:from-neon-purple hover:via-purple-500 hover:to-neon-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 flex items-center justify-center text-base sm:text-lg shadow-cyber overflow-hidden group-hover:shadow-glow-lg"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                  
                  {/* Button content */}
                  <div className="relative z-10 flex items-center">
                    {isLoading ? (
                      <>
                        <Loader className="animate-spin mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                        <span className="tracking-wide">{t.analyzing}</span>
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-bounce" />
                        <span className="tracking-wide">{t.analyzeButton}</span>
                      </>
                    )}
                  </div>
                  
                  {/* Pulsing border */}
                  <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
                </button>
              </div>
              
              {error && (
                  <div className="relative bg-red-500/10 backdrop-blur-md border border-red-400/30 text-red-300 p-3 sm:p-4 mt-4 rounded-xl shadow-neon-purple" role="alert">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5 rounded-xl"></div>
                      <div className="relative">
                        <p className="font-bold text-base sm:text-lg flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                          {t.error}
                        </p>
                        <p className="text-sm sm:text-base mt-1">{error}</p>
                      </div>
                  </div>
              )}
            </div>
          </div>

            {/* Status Section */}
            <div className="relative group">
              {/* Glowing border effect */}
              <div className="absolute -inset-0.5 bg-neon-gradient rounded-2xl opacity-30 blur group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-glass-white backdrop-blur-md rounded-2xl border border-white/20 shadow-glass p-4 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col justify-center items-center overflow-hidden">
                {/* Animated background grid */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
                
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center text-gray-300 px-4 relative z-10">
                    <div className="relative">
                      <Loader className="h-16 w-16 sm:h-20 sm:w-20 animate-spin mb-4 sm:mb-6 text-neon-blue" />
                      <div className="absolute inset-0 h-16 w-16 sm:h-20 sm:w-20 border-2 border-neon-purple/30 rounded-full animate-ping"></div>
                    </div>
                    <p className="text-lg sm:text-xl font-semibold mb-2 text-center bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">{t.analyzing}</p>
                    <p className="text-base sm:text-lg text-center text-gray-400">
                      <span className="inline-block animate-pulse">Please wait</span>
                      <span className="animate-pulse" style={{animationDelay: '0.5s'}}>.</span>
                      <span className="animate-pulse" style={{animationDelay: '1s'}}>.</span>
                      <span className="animate-pulse" style={{animationDelay: '1.5s'}}>.</span>
                    </p>
                  </div>
                ) : analysis ? (
                  <div className="text-center space-y-4 sm:space-y-6 px-4 relative z-10">
                    <div className="relative">
                      <Bot className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 text-green-400 animate-float" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-green-400/30 rounded-full animate-ping"></div>
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">{t.analysisComplete}</h3>
                    <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6">{t.analysisReady}</p>
                    <button 
                      onClick={() => setShowAnalysisModal(true)}
                      className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:from-emerald-500 hover:to-green-500 transition-all duration-300 text-base sm:text-lg shadow-cyber group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                      <span className="relative z-10 flex items-center">
                        <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                        {t.viewResults}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 px-4 relative z-10">
                    <div className="relative">
                      <Bot className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 text-gray-500 opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 border border-gray-600/30 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2">{t.readyForAnalysis}</h3>
                    <p className="text-base sm:text-lg text-gray-500">{t.readyText}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl opacity-20 group-hover:opacity-30 transition duration-500 blur"></div>
            <div className="relative bg-glass-white backdrop-blur-md rounded-2xl border border-yellow-400/20 shadow-glass p-4 sm:p-6 md:p-8">
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-l-4 border-yellow-400 text-yellow-200 rounded-lg p-4 sm:p-6 backdrop-blur-md">
                  <div className="flex">
                      <div className="py-1">
                        <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mr-3 sm:mr-4 shrink-0 animate-pulse" />
                      </div>
                      <div>
                          <p className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-yellow-300">{t.disclaimer}</p>
                          <p className="text-sm sm:text-base text-gray-300">{t.disclaimerText}</p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnalysisModal 
        analysis={analysis}
        wasImageUsed={wasImageUsed}
        show={showAnalysisModal}
        onClose={() => setShowAnalysisModal(false)}
      />
      <Modal 
        title={t.nutritionPlanTitle}
        icon={<BookOpen className="mr-2 text-green-500"/>}
        content={nutritionPlan}
        show={showNutritionModal}
        onClose={() => setShowNutritionModal(false)}
        t={t}
      />
      <Modal 
        title={t.biosecurityTitle}
        icon={<ListChecks className="mr-2 text-indigo-500"/>}
        content={biosecurityChecklist}
        show={showBiosecurityModal}
        onClose={() => setShowBiosecurityModal(false)}
        t={t}
      />
    </>
  );
};

export default App;
