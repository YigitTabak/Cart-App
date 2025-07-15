require('@testing-library/jest-dom');

// Add TextEncoder/TextDecoder mock
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;