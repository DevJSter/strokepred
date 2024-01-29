from flask import Flask, request
import numpy as np
import pickle

app = Flask(__name__)

# Load the pickled model
with open('rf.pkl', 'rb') as file:
    heartstroke_model = pickle.load(file)


@app.route('/heartstrokepredict', methods=['POST'])
def heartstrokepredict():
    try:
        data = request.json

        age = float(data.get('age', 26))
        heartRate = float(data.get('heartRate', 82.6))
        sleep = float(data.get('sleep', 6))
        height = float(data.get('height', 170))
        weight = float(data.get('weight', 75))
        body_fat_in_percent = float(data.get('body_fat_in_percent', 2.3))

        # Create a NumPy array for prediction
        arr = np.array([[age, heartRate, sleep, height, weight, body_fat_in_percent]])

        # Make the prediction using your heartstroke model
        pred = heartstroke_model.predict(arr)

        # Map the prediction to a result string
        result = "Heartstroke" if pred == 1 else "No Heartstroke"

        return result

    except ValueError as e:
        print('Error:', e)
        return str(e), 400

if __name__ == '__main__':
    app.run(debug=True)
