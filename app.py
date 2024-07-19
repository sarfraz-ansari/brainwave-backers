from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Load the model
filename = 'dementia.pkl'
with open(filename, 'rb') as file:
    loaded_model = pickle.load(file)

def predict_dementia(gender, age, educ, ses, mmse, cdr, etiv, nwbv):
    # Encoding gender using LabelEncoder
    gender_encoded = 0  # Default value for Male
    if gender.lower() == 'f':
        gender_encoded = 1  # Set to 1 for Female

    # Creating a DataFrame with the input details
    input_data = pd.DataFrame({
        'Gender': [gender_encoded],
        'Age': [age],
        'EDUC': [educ],
        'SES': [ses],
        'MMSE': [mmse],
        'CDR': [cdr],
        'eTIV': [etiv],
        'nWBV': [nwbv]
    })

    # Predicting dementia group using the trained model
    probability_demented = loaded_model.predict_proba(input_data)[:, 1][0]
    probability_percentage = probability_demented * 100

    # Categorizing into Low, Mild, and High risk categories
    if probability_demented < 0.33:
        risk_category = "Low"
    elif probability_demented < 0.66:
        risk_category = "Mild"
    else:
        risk_category = "High"

    # Formatting the probability as a percentage
    probability_formatted = f"{probability_percentage:.2f}%"

    return probability_formatted, risk_category

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)

    gender = data['gender']
    age = data['age']
    educ = data['educ']
    ses = data['ses']
    mmse = data['mmse']
    cdr = data['cdr']
    etiv = data['etiv']
    nwbv = data['nwbv']

    probability, risk_category = predict_dementia(gender, age, educ, ses, mmse, cdr, etiv, nwbv)

    response = {
        'probability': probability,
        'risk_category': risk_category
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
