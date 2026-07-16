// Build script: Reads all slip .txt files and generates slips-data.js
// Run with: node build-data.js

const fs = require('fs');
const path = require('path');

const slips = [];

for (let i = 1; i <= 20; i++) {
  const q1Path = path.join(__dirname, `slip${i}-1.txt`);
  const q2Path = path.join(__dirname, `slip${i}-2.txt`);

  let q1Content = '';
  let q2Content = '';

  try {
    q1Content = fs.readFileSync(q1Path, 'utf-8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  } catch (e) {
    console.error(`Missing file: slip${i}-1.txt`);
  }

  try {
    q2Content = fs.readFileSync(q2Path, 'utf-8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  } catch (e) {
    console.error(`Missing file: slip${i}-2.txt`);
  }

  slips.push({
    id: i,
    q1: q1Content,
    q2: q2Content
  });
}

// Generate JavaScript file with JSON data
const extraFiles = ['MCAAdmissionFormWithPassword.txt', 'SpringBoot.txt', 'MysqlInstallation.txt', 'small-file-handling.txt'];
const extras = [];

extraFiles.forEach((fileName, idx) => {
  try {
    let fileContent = fs.readFileSync(path.join(__dirname, fileName), 'utf-8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    extras.push({ id: 'extra-' + idx, fileName: fileName, content: fileContent });
  } catch(e) {
    console.error("Missing extra file: " + fileName);
  }
});

const output = `// Auto-generated from slip text files — DO NOT EDIT MANUALLY\nconst SLIPS_RAW = ${JSON.stringify(slips)};\nconst EXTRAS_RAW = ${JSON.stringify(extras)};\n`;
fs.writeFileSync(path.join(__dirname, 'slips-data.js'), output, 'utf-8');
console.log('✅ Generated slips-data.js with ' + slips.length + ' slips.');
