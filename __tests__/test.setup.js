import * as enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { JSDOM } from "jsdom"

enzyme.configure({ adapter: new ReactSixteenAdapter() });
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock;
global.sessionStorage = new LocalStorageMock;