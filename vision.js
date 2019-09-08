// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

const projectId = 'project-2-252203'
const keyFilename = '../../../project-2-252203-1471c144fb64.json'
// Creates a client
const client = new vision.ImageAnnotatorClient({projectId, keyFilename});

// Performs label detection on the image file
client
  .labelDetection('./DSC_3498.jpg')
  .then(results => {
    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });