import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Dashboard1 = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('https://newsdata.io/api/1/news?apikey=pub_273555d0d6f13e01db9dfcb835a48541d1104&q=textile%20manufacturing%20news')
      .then(response => {
        if (response.data && response.data.results) {
          setNewsData(response.data.results);
        }
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % newsData.length);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [newsData]);
  return (
    <div>
      <div className="infoPart">
  <div class="cardDiv row row-cols-1 row-cols-md-3 g-4" grid>
    <div class="card col" style={{ width: '84%', height: 'auto', minHeight: '350px' , backgroundColor:'#ffffff59' }}  >
      <div class="card-body">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/YzaJ1D2w2jc?autoplay=1&controls=0&mute=1&loop=1&playlist=YzaJ1D2w2jc"
                title="YouTube video player"
        frameborder="0"
        allowfullscreen
        style={{ border: 'none', pointerEvents: 'none', padding: '0', margin: '0' }}
      ></iframe>
      
      </div>
    </div>
  </div>
</div>
      <div className="Firstpart">
        
      <div class="cardDiv row row-cols-1 row-cols-md-3 g-4" >
        <div class="card col" style={{ width:'94%' ,height:'350px ' }}  id='news'>
          <div class="card-body "   style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, transparent, black)',
              borderRadius:'6px'
            }}>
                 
                 
                 <div className="scrolling-text-container" >
                      <h5 className="card-title scrolling-text" id='newsTitle'>{newsData[currentIndex]?.title}</h5>
                      </div>
                  <div id='newsMaindiv'>
                      <div className="country" style={{ fontWeight:'bold' }}>
                        {newsData[currentIndex]?.country}:
                      </div>    
                      
                      <div style={{ color: 'white', maxHeight: '10em', overflow: 'hidden' }}>
                      {newsData[currentIndex]?.content}
                    </div>
                  
                  </div>
                  <a href={newsData[currentIndex]?.link} target="_blank" rel="noopener noreferrer" style={{ color:'#2ca593' }}>
                        Read More
                      </a>
          </div>
        </div>
      </div>
      </div>
      
    </div>

  )
}

export default Dashboard1