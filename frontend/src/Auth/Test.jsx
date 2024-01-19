import  { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
  const [generatedImage, setGeneratedImage] = useState('');

  useEffect(() => {
    const generateImage = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci-codex/completions',
          {
            prompt: 'User Sign up Images',
            max_tokens: 100,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer YOUR_API_KEY`,
            },
          }
        );

        // Extract the generated image from the API response
        const generatedImage = response.data.choices[0].text;
        console.log("generatedImage",generatedImage)
        setGeneratedImage(generatedImage);
      } catch (error) {
        console.error('Error generating image:', error);
      }
    };

    generateImage();
  }, []); // Run once on component mount

  return(
    <div>
         <img src={generatedImage} alt="Generated AI Imag" />

    </div>
  )
};

export default ImageGenerator;
