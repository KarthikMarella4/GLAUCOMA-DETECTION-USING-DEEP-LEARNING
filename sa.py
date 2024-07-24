from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

import tensorflow as tf
from tensorflow.keras.applications.vgg19 import preprocess_input
from tensorflow.keras.preprocessing.image import load_img, img_to_array


# Load the model
model = load_model('combine_cnn.h5')


#load the image using keras
img = load_img('Normal.jpg', target_size=(256,256))

img_array = img_to_array(img)
img_array = preprocess_input(img_array)
img_array = img_array.reshape(-1, 256, 256, 3)
predict = model.predict(img_array)

result = np.argmax(predict)

if result == 0:
 print("Glaucoma")
else:
 print("Not Glaucoma")