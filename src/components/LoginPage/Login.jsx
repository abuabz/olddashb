import '../../index.css';
import './Login.css';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../Darktheme/DarkModeContext';
import logoo from '../../assets/images/logoVstarMain.svg'
function LoginPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarClosed, setSidebarClosed] = useState(false);
  const [sidebarHide, setSidebarHide] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const toggleFullscreen = () => {
    
    if (!isFullscreen) {
      const docEl = document.documentElement;

      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    setIsFullscreen(!isFullscreen);
  };
  const toggleSidebar = () => {
    setSidebarClosed(!sidebarClosed);
  };
const toggleSidebarHide =()=>{
    setSidebarHide(!sidebarHide);
}


  const toggleNav = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);



  return (
    <div className={`App ${sidebarClosed ? 'sidebar-closed' : ''} ${isDarkMode ? 'dark' : ''}`}>

  <section class="Lhome"  >
    <div class="mainDiv"  >
     
  

      <div className="bodyMain">
     
      <div className="background">
    <div className="shape" />
    <div className="shape" />
  </div>
  <Link to="/">
        <i className="bx bx-arrow-back" id="back-icon"></i>
      </Link>
  <form className="Lform" action='/DSR'>
    <img src={logoo} alt=""  style={{ paddingBottom:'17px' }}/>
    <h3>Login</h3>
    <label className="Llabel" htmlFor="username">
      Username
    </label>
    <input
      className="Linput"
      type="text"
      placeholder="Email or Phone"
      id="username"
    required/>
    <label htmlFor="password">Password</label>
    <input
      className="Linput"
      type="name"
      placeholder="Password"
      id="password"
     required/>
     
     
    
    <button className="Lbutton">Log In</button>

   
  </form>

       
              
      </div>
    

      
    </div>

  </section>
  <div  id='settingsTabLanding' onClick={toggleNav}>
      <i class='bx bx-cog' id="settingsicon" ></i>
    </div>

    <div className={`navigation ${isNavigationOpen ? 'open' : ''}`} id="navigation">

      <div class="themehead">
          <span >Theme Settings</span>
          <span className="close-icon" onClick={toggleNav}>
          <i className='bx bx-x'></i>
        </span>
         
      </div>
      <div class="theme">
          <span >Theme </span>
          <div class="lightdarkbox">
          <div className="lightmode" onClick={() => toggleDarkMode(false)}>
          <i class='bx bx-sun lightt' ></i>
            
             
            </div>
            <div className="darkmode" onClick={() => toggleDarkMode(true)}>
              <i class='bx bx-moon darkk' ></i>
              
            </div>
          </div>
      </div>
      <div class="theme">
          <span >Full Screen</span>
          <div class="sidenavbox">
                
                <div className="navhide" onClick={toggleFullscreen}>


                    
                {isFullscreen ? <i class='bx bx-exit-fullscreen'></i> : <i class='bx bx-fullscreen '></i>}
               
                </div>
                
                {isFullscreen ? <span>Exit</span>: <span></span>}

               
            </div> 
          </div>
      </div>

      {isNavigationOpen && (
      <div className="overlay" onClick={toggleNav}>
        {/* Content of the overlay */}
        <p>This is the overlay content.</p>
      </div>
    )}
    
    </div>
    
  );
}

export default LoginPage;
