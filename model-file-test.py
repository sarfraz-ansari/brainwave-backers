import pickle
import pandas as pd 
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


# Example usage of the function
gender = 'F'  # Replace with the actual gender (F or M)
age = 70  # Replace with the actual age
educ = 12  # Replace with the actual education level
ses = 2.0  # Replace with the actual socioeconomic status
mmse = 28.0  # Replace with the actual MMSE score
cdr = 0.5  # Replace with the actual CDR score
etiv = 1600  # Replace with the actual eTIV value
nwbv = 0.7  # Replace with the actual nWBV value

probability, risk_category = predict_dementia(gender, age, educ, ses, mmse, cdr, etiv, nwbv)
print(f"The probability of being demented is: {probability} ({risk_category} Risk)")


 
