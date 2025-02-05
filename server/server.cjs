const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');
const e = require('express');

const app = express();

app.use(express.json());
app.use(cors());
mongoose.set('strictQuery', false)

const url = process.env.MONGO_URL;

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const JobSchema = new mongoose.Schema({
  title: String,
  type: String,
  location: String,
  description: String,
  salary: String,
  company: {
    name: String,
    description: String,
    contactEmail: String,
    contactPhone: String,
  },
});

JobSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const Job = mongoose.model('Job', JobSchema);

fs.readFile('./sample-data/jobs.json', 'utf-8', async (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error("File not found:", err);
    } else {
      console.error("Error reading file:", err);
    }
    return;
  }

  const existingJobs = await Job.find({});
  if (existingJobs.length === 0) {
    const jsonData = JSON.parse(data);

    const promises = jsonData.jobs.map((jobData) => {
      const job = new Job(jobData);
      return job.save();
    });

    try {
      await Promise.allSettled(promises);
      console.log(`Data saved to DB`);
    } catch (error) {
      console.log(`Error in saving data to DB`, error)
    }
  }
})

app.get('/api/jobs', (req, res) => {
  Job.find({}).then(jobs => {
    res.json(jobs);
  })
});

app.get('/api/jobs/:id', (req, res) => {
  const jobId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).send({ error: 'Invalid ID format' });
  }

  Job.findById(jobId).then(job => {
    if (job) {
      res.json(job)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => {
    console.log(error)
    res.status(400).send({ error: 'malformatted id' })
  })
});

app.post('/api/jobs', (req, res) => {
  const body = req.body;

  if (!body.title || !body.type || !body.location) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  const job = new Job({
    title: body.title,
    type: body.type,
    location: body.location,
    description: body.description,
    salary: body.salary,
    company: body.company,
  });
  
  job.save().then(savedJob => {
    res.json(savedJob);
  })
});

app.delete('/api/jobs/:id', (req, res, next) => {
  const jobId = req.params.id;

  Job.findByIdAndDelete(jobId)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

app.put('/api/jobs/:id', (req, res, next) => {
  const jobId = req.params.id;
  const body = req.body;
  const updatedJob = new Job({
    title: body.title,
    type: body.type,
    location: body.location,
    description: body.description,
    salary: body.salary,
    company: body.company,
  });

  Job.findByIdAndUpdate(jobId, updatedJob, { new: true })
  .then(updatedJob => res.json(updatedJob))
  .catch(err => next(err))
})

const path = require('path');

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})