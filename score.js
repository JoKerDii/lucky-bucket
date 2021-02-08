const outputs = [];
// const predictionPoint = 300; // an input point, useless when applying cross validation


function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a ball drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
  // console.log('The length of outputs: ', outputs.length);
}

function runAnalysis() {
  // Write code here to analyze stuff
  const testSetSize = 50; // random test points
  // const k = 10;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);
  _.range(10, 11).forEach(k => {

    const accuracy = _.chain(testSet) //filter function
      .filter(testPoint => knn(trainingSet, _.initial(testPoint), k) === _.last(testPoint)) // compare predictions and actual values
      .size() // count the correct prediction
      .divide(testSetSize)
      .value();

    document.querySelector('.x-acc').innerHTML = `My Accuracy: ${accuracy}`;
    console.log('Using k of ', k, ', my accuracy is ', accuracy, '. Drop more!');
  })
}

function runPrediction() {
  // Write code here to analyze stuff
  console.log(outputs.length)
  const testSet = outputs[outputs.length - 1]; // final row
  console.log(testSet)
  const trainingSet = outputs.slice(0, outputs.length - 1); // previous row
  console.log(trainingSet.length)
  // const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

  const preds = knn(trainingSet, _.initial(testSet), 10);
  document.querySelector('.x-guess').innerHTML = `My Guess: ${preds}`;
  console.log('I guess the ball was dropped in Bucket ', preds);
}


function knn(data, point, k) {
  // point has no label
  return _.chain(data)
    .map(row => {
      return [
        distance(_.initial(row), point), _.last(row)
      ];
    })
    .sortBy(row => row[0])
    .slice(0, k) //take first k (most similar points)
    .countBy(row => row[1]) // count the frequency of targets
    .toPairs()
    .sortBy(row => row[1]) // find the most frequent target
    .last()
    .first()
    .parseInt() // give the int number, not a string
    .value(); // terminate the chain
}

function distance(pointA, pointB) {
  // pointA = [ , , ..., ], pointB = [ , , ..., ]
  return _.chain(pointA)
    .zip(pointB)
    .map(([a, b]) => (a - b) ** 2)
    .sum()
    .value() ** 0.5;
}

function splitDataset(data, testCount) {
  // shuffle the data
  const shuffled = _.shuffle(data);
  // split the data
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}

function minMax(data, featureCount) {
  const clonedData = _.cloneDeep(data);

  // loop each column / feature
  for (let i = 0; i < featureCount; i++) {
    const column = clonedData.map(row => row[i])
    const min = _.min(column);
    const max = _.max(column);

    // loop each row
    for (let j = 0; j < clonedData.length; j++) {
      clonedData[j][i] = (clonedData[j][i] - min) / (max - min)
    }
  }
  return clonedData
}