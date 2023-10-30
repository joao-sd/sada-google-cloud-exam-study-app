# GCLOUD Exam Practice

## Getting started

- Install dependencies

```
yarn install
```

- Run the app
  
  ```
  yarn start
  ```

## Adding more questions

Generate your questions using GPT4, for better results, using the following prompt:

```
Please create a set of 20 multiple-choice questions focusing on the topic 'EXAM_TOPIC' The questions should be similar in style and difficulty to those on the EXAM_TYPE exam. The choices should be lettered, and please don't provide the answers initially; I'll answer them myself and then ask for an evaluation. Choices should be letters, not numbers. High probability questions.

Please convert the following questions to this JSON format: Example:

{
   "question":"Which of the following machine types does Google Compute Engine offer?",
   "choices":{
      "A":"Normal",
      "B":"Limited",
      "C":"Predefined",
      "D":"Custom"
   },
   "topic":"Zones and Regions",
   "exam":"Associate Cloud Engineer",
   "provider":"Google Cloud",
   "correct":"C",
   "quick_explanation":"Explain here why the option above is correct"
}

```

- Ex:
  - EXAM_TOPIC: `Block and file storage iN GCP`
  - EXAM_TYPE: `Google Cloud Associate`

- Then save it on `./src/data/questions-database.json` file.
