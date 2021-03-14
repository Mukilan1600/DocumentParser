import sys
import pytesseract
import skimage
from skimage import io
from skimage.filters import threshold_otsu
from PIL import Image
import numpy as np

pytesseract.pytesseract.tesseract_cmd = "G:/Apps/Tesseract/tesseract.exe"

foldername =  sys.argv[1]
filename = sys.argv[2]

image = io.imread('./uploads/'+foldername+'/'+filename, as_gray=True)
threshold = threshold_otsu(image)
binary = image > threshold

im = np.array(image * 255, dtype = np.uint8)
a = np.asarray(im)
img = Image.fromarray(a)

print(pytesseract.image_to_string(img, config=" --psm 6"))
sys.stdout.flush()