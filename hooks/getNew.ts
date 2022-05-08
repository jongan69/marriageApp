
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const news = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=dc14c13985ee4a90a845cc21cf087198', {
            
        })
        
      
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}