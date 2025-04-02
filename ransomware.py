from flask import Flask, request, jsonify
from flask_cors import CORS
import pefile
import joblib
import numpy as np
from sklearn.preprocessing import MinMaxScaler

import pandas as pd
import pickle 
scaler = MinMaxScaler()

X_train=pd.read_csv('./training.csv')
scaler.fit(X_train)

app = Flask(__name__)
CORS(app)

file = None
model = joblib.load('./etc')


def extract_features_from_file(file_data):
    try:
        # Call a function to extract features directly from the file data
        extracted_features = extract_features(file_data)

        # Print or use the extracted features as needed
        for key, value in extracted_features.items():
            print(f'{key}: {value}')

        return {"message": "File processed successfully", "features": extracted_features}

    except Exception as e:
        return {"error": str(e)}, 500

@app.route('/receiveFile', methods=['POST'])
def receive_file():
    try:
        # Check if the POST request has the file part
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400

        global file
        file = request.files['file']

        # Call a function to extract features directly from the file data
        response = extract_features_from_file(file.read())

        # Return a response to the React app
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Your existing functions...

def extract_features(file_data):
    pe = pefile.PE(data=file_data)
    if pe:
        characteristics = pe.FILE_HEADER.Characteristics
        major_linker_version = pe.OPTIONAL_HEADER.MajorLinkerVersion
        size_of_code = pe.OPTIONAL_HEADER.SizeOfCode
        size_of_initialized_data = pe.OPTIONAL_HEADER.SizeOfInitializedData
        image_base = pe.OPTIONAL_HEADER.ImageBase
        major_os_version = pe.OPTIONAL_HEADER.MajorOperatingSystemVersion
        minor_os_version = pe.OPTIONAL_HEADER.MinorOperatingSystemVersion
        major_image_version = pe.OPTIONAL_HEADER.MajorImageVersion
        check_sum = pe.OPTIONAL_HEADER.CheckSum
        dll_characteristics = pe.OPTIONAL_HEADER.DllCharacteristics
        sections_nb = len(pe.sections)
        sections_mean_entropy = sum(section.get_entropy() for section in pe.sections) / len(pe.sections)
        sections_max_entropy = max(section.get_entropy() for section in pe.sections)
        imports_nb_dll = len(pe.DIRECTORY_ENTRY_IMPORT)
        imports_nb_ordinal = sum(len(x.imports) for x in pe.DIRECTORY_ENTRY_IMPORT)
        resources_nb = len(pe.DIRECTORY_ENTRY_RESOURCE.entries)
        ResourcesMeanEntropy= 3.904
        ResourcesMinEntropy= 2.49 
        ResourcesMeanSize= 4794.61
        load_configuration_size = pe.OPTIONAL_HEADER.DATA_DIRECTORY[pefile.DIRECTORY_ENTRY['IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG']].Size
        VersionInformationSize= 14.108
       # resources = pe.DIRECTORY_ENTRY_RESOURCE.entries
        
       #arr=[characteristics,major_linker_version,size_of_code,size_of_initialized_data,image_base,major_os_version,minor_os_version,major_image_version,
            #check_sum,dll_characteristics,sections_nb,sections_mean_entropy,sections_max_entropy,imports_nb_dll,imports_nb_ordinal,resources_nb,
             #ResourcesMeanEntropy,ResourcesMinEntropy,ResourcesMeanSize,load_configuration_size,VersionInformationSize]
        # ... (other features)
        #arr = np.array(characteristics, major_linker_version, size_of_code,size_of_initialized_data, image_base, major_os_version,minor_os_version, major_image_version, check_sum,dll_characteristics, sections_nb, sections_mean_entropy,sections_max_entropy, imports_nb_dll, imports_nb_ordinal, resources_nb,ResourcesMeanEntropy, ResourcesMinEntropy, ResourcesMeanSize,load_configuration_size)        
        #arr = [characteristics, major_linker_version, size_of_code, ...]
        #loaded_min_values = np.load('original_min_values.npy')
        #loaded_max_values = np.load('original_max_values.npy')
        #scaler = MinMaxScaler(feature_range=(loaded_min_values, loaded_max_values))
        
        # Use reshape to convert the 1D array to a 2D array
        #X_new_scaled = scaler.transform(arr)
        
        # Make prediction
        #output = model.predict(X_new_scaled)
        #print(output.tolist())
# Load the original min and max values
        arr = np.array([[characteristics, major_linker_version, size_of_code, size_of_initialized_data, image_base, major_os_version, minor_os_version, major_image_version, check_sum, dll_characteristics, sections_nb, sections_mean_entropy, sections_max_entropy, imports_nb_dll, imports_nb_ordinal, resources_nb, ResourcesMeanEntropy, ResourcesMinEntropy, ResourcesMeanSize, load_configuration_size, VersionInformationSize]])
        print(arr)
        loaded_min_values = np.load('original_min_values.npy')
        loaded_max_values = np.load('original_max_values.npy')

# Set the parameters of the existing scaler
        scaler.set_params(feature_range=(loaded_min_values, loaded_max_values))

# Use reshape to convert the 1D array to a 2D array
        X_new_scaled = scaler.transform(arr)

# Make prediction
        output = model.predict(X_new_scaled)
        print(output.tolist())

        

        return ({"status":output.tolist()})  # Convert NumPy array to a list

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5006, debug=True)
