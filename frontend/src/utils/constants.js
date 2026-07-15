export const SYSTEMS = ['Instagram', 'Netflix', 'WhatsApp', 'YouTube', 'Uber', 'Amazon', 'Spotify', 'Twitter', 'Custom'];
export const USER_SCALES = ['10K', '100K', '1 Million', '10 Million', '100 Million'];
export const TRAFFIC_LEVELS = ['Low', 'Medium', 'High'];
export const ARCHITECTURES = ['Monolith', 'Microservices', 'Serverless', 'Hybrid'];
export const FEATURES = ['Authentication', 'Chat', 'Notifications', 'Media Upload', 'Search', 'Payment', 'Recommendation System', 'Live Streaming', 'Comments', 'Likes', 'Follow'];
export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/app', icon: 'LayoutDashboard' }, { label: 'New Design', path: '/app/new', icon: 'Plus' },
  { label: 'Saved Designs', path: '/app/designs', icon: 'Star' }, { label: 'Templates', path: '/app/templates', icon: 'Boxes' },
  { label: 'Compare Systems', path: '/app/compare', icon: 'GitCompareArrows' }, { label: 'Learning Center', path: '/app/learn', icon: 'BookOpen' },
  { label: 'Quiz Mode', path: '/app/quiz', icon: 'GraduationCap' }, { label: 'Profile', path: '/app/profile', icon: 'UserRound' },
  { label: 'Settings', path: '/app/settings', icon: 'Settings' },
];
export const TEMPLATES = [
  { name: 'Netflix', description: 'Global adaptive video streaming with encoding pipelines and multi-CDN delivery.', scale: '100 Million', traffic: 'High', architectureType: 'Microservices', features: ['Authentication', 'Media Upload', 'Search', 'Recommendation System'] },
  { name: 'WhatsApp', description: 'Low-latency messaging, presence, fan-out, and durable offline delivery.', scale: '100 Million', traffic: 'High', architectureType: 'Hybrid', features: ['Authentication', 'Chat', 'Notifications', 'Media Upload'] },
  { name: 'Uber', description: 'Real-time geospatial matching, trip state, pricing, and event processing.', scale: '10 Million', traffic: 'High', architectureType: 'Microservices', features: ['Authentication', 'Notifications', 'Payment', 'Search'] },
  { name: 'Spotify', description: 'Audio catalog, playlists, personalization, and edge media distribution.', scale: '100 Million', traffic: 'High', architectureType: 'Microservices', features: ['Authentication', 'Search', 'Recommendation System', 'Follow'] },
];
