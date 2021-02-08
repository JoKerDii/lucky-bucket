# JoKer's Lucky Buckets



## Basis

Thanks to the plinko game panel provided by [StephenGrider](https://github.com/StephenGrider/MLkits), all my modifications were based on [it](https://github.com/StephenGrider/MLKits/tree/master/plinko).



## Added Features

1. Implemented k-Nearest-Neighbor algorithm (k = 10 as default) to
   * make predictions based on obtained data by dropping a bunch of balls.
   * evaluate accuracy by comparing the prediction with the actual bucket each ball's in.
2. Allowed splitting dataset into training set and testing set (the size of testing set = 50 as default).
3. Added 'Predict!' button / function to make prediction on a single ball drop or a final dropped ball.
4. Added a feature normalization function but not implemented.
5. Added a statistics board to display real-time Drop Position, Bounciness, Ball Size, My Guess, and My Accuracy.
6. Customized layout and color.



## How to play with it?

1. "Analyze!" button:

   * Use it when you have dropped a bunch of balls (> 100) since a large number of examples could make it more confidence to make predictions, thus higher performance.

2. "Predict!" button:

   * Use it after you drop a single ball, and the guessed / predicted bucket number will display on statistics board.
   * If you dropped a bunch of balls, this button will allow the prediction of the bucket of the final ball.

3. You can customize your dropping style by using other buttons. You can easily understand how to use them once you start to play with them.

   

**There are two options for users:**

* Option 1:
  * If you want to release your stress, click the panel as crazily as you can.
* Option 2:
  * If you want to be gentle and professional, use the buttons.



## Log

The development log is here.



## To Do

1. Allow the users to choose the k value.
2. Allow the users to choose the sample size of test set.
3. Make it responsive.

