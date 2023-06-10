import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import mongoose from 'mongoose';

// Create a deep mock
const mockMongoose = mockDeep<mongoose.Mongoose>();

// Mock the import
jest.mock('mongoose', () => mockMongoose);
