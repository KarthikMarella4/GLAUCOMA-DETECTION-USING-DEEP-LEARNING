document.getElementById('predictionBtn').addEventListener('click', function() {
    document.getElementById('prediction').scrollIntoView({ behavior: 'smooth' });
});


const mainTextElement = document.getElementById('mainText');
const mainText = "Welcome to Glaucoma Prediction";
let index = 0;

function typeEffect() {
    if (index < mainText.length) {
        mainTextElement.textContent += mainText.charAt(index);
        index++;
        setTimeout(typeEffect, 100); // Adjust typing speed (milliseconds)
    }
}

typeEffect();



// Show the abstract section by default
document.getElementById('abstract').style.display = 'block';

// Add event listeners to the buttons
document.getElementById('abstractBtn').addEventListener('click', function() {
    document.getElementById('abstract').style.display = 'block';
    document.getElementById('team').style.display = 'none';
    document.getElementById('abstractBtn').classList.add('active');
    document.getElementById('teamBtn').classList.remove('active');
});

document.getElementById('teamBtn').addEventListener('click', function() {
    document.getElementById('team').style.display = 'block';
    document.getElementById('abstract').style.display = 'none';
    document.getElementById('teamBtn').classList.add('active');
    document.getElementById('abstractBtn').classList.remove('active');
});


// document.getElementById('imageInput').addEventListener('change', function(e) {
//     const file = e.target.files[0];
//     if (file) {
//         // You can add logic here to process the uploaded image
//         alert('Image uploaded: ' + file.name);
//         // Clear the input field after processing
//         document.getElementById('imageInput').value = '';
//     }
// });


document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    document.getElementById('positive-card').style.display="none";
    document.getElementById('negative-card').style.display="none"
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;

            // Remove previous uploaded image, if any
            const existingImage = document.querySelector('.uploaded-image');
            if (existingImage) {
                existingImage.remove();
            }

            // Create and add new image
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.classList.add('uploaded-image');
            document.getElementById('uploded-img').appendChild(imageElement);
        };
        reader.readAsDataURL(file);
    }
});



function predictImage() {
    var formData = new FormData();
    var imageFile = document.getElementById('imageInput').files[0];
    
    var btn_change=document.getElementById('pred-btn')
    btn_change.innerText="Predicting ..."
    btn_change.disabled=true;
    btn_change.style.backgroundColor="gray"

    formData.append('image', imageFile);

    fetch('prediction', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': document.querySelector('input[name=csrfmiddlewaretoken]').value
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.prediction=="Normal Eye"){

            document.getElementById('predictionResult').innerHTML = 'Prediction: ' + `<b style="color:green">${data.prediction}</b>`;
        }
        else{
            document.getElementById('predictionResult').innerHTML = 'Prediction: ' + `<b style="color:red">${data.prediction}</b>`;
        }
        btn_change.innerText="Predict"
        btn_change.disabled=false;
        btn_change.style.backgroundColor="#26df35"
        if( data.prediction!='Normal Eye'){
            document.getElementById('positive-card').style.display="block"
        }
        else{
            document.getElementById('negative-card').style.display="block"
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



// image show

const fileInput = document.getElementById('imageInput');
const imageContainer = document.getElementById('imageContainer');

fileInput.addEventListener('change', function(event) {
    document.getElementById('predictionResult').innerText = 'Prediction: '
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.classList.add('uploaded-image');
      imageContainer.innerHTML = ''; // Clear previous image if any
      imageContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

