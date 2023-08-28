import './App.css';
import { useState,useEffect } from 'react';
import './LandingPage.css'
import Dashboard1 from './components/dashboard1/dashboard1';
import { Link } from 'react-router-dom';
import { BiMenu,BiX } from 'react-icons/bi';
import { useDarkMode } from './components/Darktheme/DarkModeContext';
import logoo from './assets/images/logoVstarMain.svg'


function Landingpage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarClosed, setSidebarClosed] = useState(false);
  const [sidebarHide, setSidebarHide] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarClosed(!sidebarClosed);
  };

  
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
  const handleResize = () => {
    const newNavbarVisible = window.innerWidth >= 950;
    if (newNavbarVisible !== navbarVisible) {
      setNavbarVisible(newNavbarVisible);
      const screenWidth = window.innerWidth;
      if (screenWidth <= 600) {
        setSidebarClosed(true);
      } else {
        setSidebarClosed(false);
      }
    }
  };

  window.addEventListener('resize', handleResize);
  window.removeEventListener('resize', handleResize);
    handleResize();

 
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
      <div className="logodiv">
        <img src={logoo} alt="" />
      </div>

  <section class="Lhome"  >
    <div class="mainDiv" id='LandMain'>
     
      {/* <Dashboard2/> */}

      <div className="bodyMain">
          <Dashboard1/>


          <div  className='dashboard-navbar'>
    
 
                  <a href="http://vstarweb.in/" style={{ textDecoration:"none" }}>
                          <div className="nav-item">
                          <i class='bx bxs-factory'></i>
                            <span className='nav-item-name'>Forecast</span>
                          </div>
                  </a>
                  <Link to='/Login' style={{ textDecoration:'none' }}>
                     <div className="nav-item">
                      <i class='bx bxs-report'></i>
                        <span  className='nav-item-name'>MIS</span>
                      </div>
                  </Link>
                  <Link to='/Login' style={{ textDecoration:'none' }}>
            <div className="nav-item">
              <i className='bx bx-bell'></i>
              <span  className='nav-item-name'>Forecast</span>
            </div>
            </Link>
        
           
           
            </div>
    
              
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
      <div class="theme">
          <span >Right Navbar</span>
          <div class="sidenavbox">
          
          
               
            </div> 
          </div>
      </div>

      {isNavigationOpen && (
      <div className="overlay" onClick={toggleNav}>
        {/* Content of the overlay */}
        <p>This is the overlay content.</p>
      </div>
    )}
     {sidebarClosed && (
        <div className="sidebar-toggle-button" onClick={handleToggleSidebar}>
          <BiMenu size={24}  />
        </div>
      )}

     {!sidebarClosed && (
        <div className="dashboard-navbar-close-button" onClick={toggleSidebar}>
          <BiX size={24} />
        </div>
      )}
    </div>
    
  );
}

export default Landingpage;
