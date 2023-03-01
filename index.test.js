const process = require('process');
const cp = require('child_process');
const path = require('path');

const csvString = `
Name,Position,Wanted
"Andromedus, Darrow au",Leader,Yes
"Augustus, Victoria au",Accomplice,Yes
`.trim();

const expectedTable = `
| Name                  | Position   | Wanted |
| --------------------- | ---------- | ------ |
| Andromedus, Darrow au | Leader     | Yes    |
| Augustus, Victoria au | Accomplice | Yes    |
`;

// shows how the runner will run a javascript action with env / stdout protocol
test('parses csv and converts to valid markdown table', () => {
  process.env.INPUT_CSVINPUT = csvString;
  const markdownTable = path.join(__dirname, 'index.js');
  const actionLog = cp.execSync(`node ${markdownTable}`, { env: process.env }).toString();
  console.log(actionLog);
  expect(actionLog).toMatch(expectedTable);
});
