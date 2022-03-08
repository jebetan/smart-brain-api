const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const knex = require('knex');

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 929ba1f9eb194f9096feb3936765591a");


const handleApiCall = (req, res) => {
stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: "face-detection",
        version_id: "6dc7e46bc9124c5c8824be4822abe105",
        inputs: [{data: {image: {url: req.body.input}}}]
    },
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error: " + err);
            return;
        }

        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return;
        }
        for (const c of response.outputs[0].data.regions) {
        res.json(response) 
        }
      }
	);
}

const handleImage = (req, res) => {
	const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
        console.log(entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = { handleApiCall, handleImage }