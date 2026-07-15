const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedUsers = ['10K', '100K', '1 Million', '10 Million', '100 Million'];
const allowedTraffic = ['Low', 'Medium', 'High'];
const allowedArchitecture = ['Monolith', 'Microservices', 'Serverless', 'Hybrid'];
const clean = (value) => typeof value === 'string' ? value.trim() : '';

export const registerValidator = ({ body = {} }) => {
  const errors = [];
  if (clean(body.name).length < 2) errors.push({ field: 'name', message: 'Name must contain at least 2 characters' });
  if (!emailPattern.test(clean(body.email))) errors.push({ field: 'email', message: 'Enter a valid email address' });
  if (typeof body.password !== 'string' || body.password.length < 8 || !/[A-Za-z]/.test(body.password) || !/\d/.test(body.password)) errors.push({ field: 'password', message: 'Password must be 8+ characters and include a letter and number' });
  return errors;
};
export const loginValidator = ({ body = {} }) => !emailPattern.test(clean(body.email)) || !body.password ? [{ field: 'credentials', message: 'Valid email and password are required' }] : [];
export const designValidator = ({ body = {} }) => {
  const errors = [];
  if (!clean(body.systemName) || clean(body.systemName).length > 100) errors.push({ field: 'systemName', message: 'System name is required and must be under 100 characters' });
  if (!allowedUsers.includes(body.expectedUsers)) errors.push({ field: 'expectedUsers', message: 'Choose a supported user scale' });
  if (!allowedTraffic.includes(body.traffic)) errors.push({ field: 'traffic', message: 'Choose Low, Medium, or High traffic' });
  if (!allowedArchitecture.includes(body.architectureType)) errors.push({ field: 'architectureType', message: 'Choose a supported architecture type' });
  if (!Array.isArray(body.features) || body.features.length < 1 || body.features.length > 20) errors.push({ field: 'features', message: 'Choose between 1 and 20 features' });
  return errors;
};
export const saveDesignValidator = ({ body = {} }) => {
  const errors = [];
  if (!clean(body.name) || clean(body.name).length > 120) errors.push({ field: 'name', message: 'A design name under 120 characters is required' });
  if (!body.report || typeof body.report !== 'object' || Array.isArray(body.report)) errors.push({ field: 'report', message: 'A structured architecture report is required' });
  return errors;
};
export const compareValidator = ({ body = {} }) => clean(body.systemA) && clean(body.systemB) && clean(body.systemA).toLowerCase() !== clean(body.systemB).toLowerCase() ? [] : [{ field: 'systems', message: 'Choose two different systems' }];
export const quizSubmitValidator = ({ body = {} }) => Array.isArray(body.answers) && body.answers.length ? [] : [{ field: 'answers', message: 'At least one answer is required' }];
