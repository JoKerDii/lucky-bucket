
# Documentation and Tool

A good doc of javascript:
lodash.com/docs

A good tool to play around with lodash
stephengrider.github.io/JSPlaygrounds



# kNN

```javascript
const numbers = [
	[10,5],
  [17,2],
  [34,1],
  [60,-5]
];

// sort by
_.sortBy(numbers, function(row) {
	return row[1];
});

// same
_.sortBy(numbers, row=> row[1]);

const sorted = _.sortBy(numbers, row=> row[1]);

// extract just the second element
_.map(sorted, row => row[1]);

const mapped = _.map(sorted, row => row[1]);
// const variabale = _.function(mapped);

// chain on functions
_.chain(numbers)
	.sortBy(row => row[1])
 	.map(row=>row[1])
	// stop the chain and return the value
  .value();

const outputs = [
	[10, 0.5, 16, 1],
  [200, 0.5, 16, 4],
  [350, 0.5, 16, 4],
  [600, 0.5, 16, 5]
];

const predictionPoint = 300;
const k = 3;

function distance(point){
	return Math.abs(point - predictionPoint);
}

_.chain(outputs)
	.map(row=> [distance(row[0]), row[3]]) 
	.sortBy(row => row[0])
	.slice(0, k) //take first k (most similar points)
	.countBy(row => row[1]) // count the frequency of targets
	.toPairs()
	.sortBy(row => row[1]) // find the most frequent target
	.last()
	.first()
	.parseInt() // give the int number, not a string
	.value() // terminate the chain
```

# Improve the prediction accuracy

1. adjust the parameter k - by cross validation
2. add more features to explain the analysis
3. change the prediction point


## considering more features

```javascript
const pointA = [1,1];
const pointB = [4,5];
_.chain(pointA)
	.zip(pointB)
	.map(([a,b]) => (a - b) ** 2)
	.sum()
	.value() ** 0.5;
```

```javascript
const point = [350,.55,16,4];
_.initial(point); //exclude the last value
_.last(point); // the last value
point.pop(); // the last value
point; // the last value is excluded, the array has been mutated by .pop()

```

## Address the problem of uneven scales of features

1. Normalization: [0,1]
	min-max method: normalized dataset = (FeatureValue - minFeatureValue) / (maxFeatureValue - minFeatureValue)
2. standardization: N(0, 1)

```javascript
const points = [350,150,160,430];
const min = _.min(points);
const max = _.max(points);

// compute normalized value
_.map(points, point => {
	return (point - min) / (max - min)
});


```

