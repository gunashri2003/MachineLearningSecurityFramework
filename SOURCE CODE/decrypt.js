const express = require('express');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
const crypto = require('crypto');
const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3003;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/decryptData', (req, res) => {
  const encryptedZipPath = req.body.encryptedFilePath;
  const password = req.body.password;
  const algorithm = 'aes-256-cbc';

  // Step 1: Read the encrypted zip file
  const encryptedBuffer = fs.readFileSync(encryptedZipPath);
  console.log("EncryptedBuffer " + encryptedBuffer);
  console.log('Encrypted buffer length:', encryptedBuffer.length);

  // Step 2: Decrypt the zip file
  try {
    const decipher = crypto.createDecipher(algorithm, password);
    console.log("Decipher " + decipher)
    decipher.setAutoPadding(false);

    const partialDecryptedBuffer = decipher.update(encryptedBuffer);
    console.log('Partial decrypted buffer:', partialDecryptedBuffer);

    const finalDecryptedBuffer = decipher.final();
    console.log('Final decrypted buffer:', finalDecryptedBuffer);

    let decryptedBuffer = Buffer.concat([partialDecryptedBuffer, finalDecryptedBuffer]);

    // Step 3: Create an output stream for the decrypted zip file
    const decryptedZipPath = encryptedZipPath;
    console.log("decryptedZipPath " + decryptedZipPath);
    const outputDecryptedZip = fs.createWriteStream(decryptedZipPath);
    console.log("outputDecryptedZipPath " + outputDecryptedZip);

    // Step 4: Write the decrypted data back to the zip file
    outputDecryptedZip.write(decryptedBuffer);
    outputDecryptedZip.end();

    // Error handling during unzipping
    outputDecryptedZip.on('error', (error) => {
      console.error('Error during unzipping:', error);
      // Handle the error as needed
      res.status(500).send('Error during decryption');
    });

    // Inside the 'finish' event for 'outputDecryptedZip'
    outputDecryptedZip.on('finish', () => {
      console.log(`Folder decrypted successfully: ${decryptedZipPath}`);

  // Step 5: Extract the decrypted zip file
    const extractPath = process.env.EXTRACT_PATH;
    const unzipStream = unzipper.Extract({ path: extractPath });

    unzipStream.on('error', (error) => {
      console.error('Error during unzipping:', error);
    // Handle the error as needed
      res.status(500).send('Error during unzipping');
    });

    unzipStream.on('finish', () => {
      console.log(`Folder extracted successfully: ${extractPath}`);
      res.send('Success');
    });

    fs.createReadStream(decryptedZipPath).pipe(unzipStream);
  });

// Modify the catch block for better error logging
  } catch (error) {
    console.error('Decryption error:', error);
  // Respond with an error
    res.status(500).send(`Error during decryption: ${error.message}`);
  }

    

    /*outputDecryptedZip.on('finish', () => {
      console.log(`Folder decrypted successfully: ${decryptedZipPath}`);

      // Step 5: Extract the decrypted zip file
      const extractPath = process.env.EXTRACT_PATH;
      fs.createReadStream(decryptedZipPath)
        .pipe(unzipper.Extract({ path: extractPath }))
        .on('error', (error) => {
          console.error('Error during unzipping:', error);
          // Handle the error as needed
          res.status(500).send('Error during decryption');
        })
        .on('finish', () => {
          console.log(`Folder extracted successfully: ${extractPath}`);
          res.send('Success');
        });
    });
  } catch (error) {
    console.error('Decryption error:', error);
    // Respond with an error
    res.status(500).send('Error during decryption');
  }*/
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
