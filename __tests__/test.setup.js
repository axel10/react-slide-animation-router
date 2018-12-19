import * as enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { JSDOM } from "jsdom"

enzyme.configure({ adapter: new ReactSixteenAdapter() });
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window
