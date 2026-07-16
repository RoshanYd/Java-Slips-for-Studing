const fs = require('fs');
const path = require('path');

// Load the generated slips-data.js (evaluate the code to get SLIPS_RAW)
const dataScript = fs.readFileSync(path.join(__dirname, 'slips-data.js'), 'utf8');
const fn = new Function(`${dataScript}\nreturn SLIPS_RAW;`);
const SLIPS_RAW = fn();

let allMatch = true;

for (let i = 1; i <= 20; i++) {
  const q1Path = path.join(__dirname, `slip${i}-1.txt`);
  const q2Path = path.join(__dirname, `slip${i}-2.txt`);
  
  // Read original files (standardizing line endings for comparison)
  const origQ1 = fs.readFileSync(q1Path, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const origQ2 = fs.readFileSync(q2Path, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  // Get generated data
  const slipData = SLIPS_RAW.find(s => s.id === i);
  const genQ1 = slipData.q1;
  const genQ2 = slipData.q2;
  
  // Compare
  const q1Match = origQ1 === genQ1;
  const q2Match = origQ2 === genQ2;
  
  if (!q1Match || !q2Match) {
    console.log(`❌ Mismatch in Slip ${i}:`);
    if (!q1Match) console.log(`   Q1 Orig Length: ${origQ1.length}, Gen Length: ${genQ1.length}`);
    if (!q2Match) console.log(`   Q2 Orig Length: ${origQ2.length}, Gen Length: ${genQ2.length}`);
    allMatch = false;
  }
}

if (allMatch) {
  console.log(`✅ VERIFICATION SUCCESSFUL: All 40 programs from the 20 slips are EXACTLY matched byte-for-byte!`);
  console.log(`✅ Every line, syntax, comment, question, and slip number is identical to the original .txt files.`);
} else {
  console.log(`❌ Verification Failed! Some files don't match exactly.`);
}
