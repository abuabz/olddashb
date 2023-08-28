import { useState,useEffect } from 'react';
import imageLogo from '../../assets/images/vstarLogo.svg'
import { Link } from 'react-router-dom';
import { useDarkMode } from '../Darktheme/DarkModeContext';
import MainTable from '../Tables/MainTable';
import Dashboard2 from '../dashboard2/dashboard2';
import IndiaTable from '../Tables/IndiaTable/indiatable';
import KeralaTable from '../Tables/IndiaTable/KeralaTable/KerlaTable';


function Demo2(){
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarClosed, setSidebarClosed] = useState(false);
  const [sidebarHide, setSidebarHide] = useState(true);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showGraph, setShowGraph] = useState(false);
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
      
  <header id="headNav" class="nav fixed-top ">
    <nav class="navbar navbar-expand-lg " id="headnav">
      <div class="container-fluid">
      {sidebarHide && (
              <div className="nav-toggle" onClick={toggleSidebar}><i class='bx'></i>
                <i className={`bx ${sidebarClosed ? 'bxs-chevrons-right ' : ' bxs-chevrons-right'}`} onClick={toggleSidebarHide} />
              </div>
            )}
        <a class="navbar-brand" href="#">ProSevo</a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse flex-row-reverse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0" id="ulnav">
            <li class="nav-item" style={{ fontSize:'1.8rem' ,alignSelf:'center',padding:'0px' ,cursor:'pointer' }}>
            <i className={isFullscreen ? 'bx bx-exit-fullscreen fullscreen' : 'bx bx-fullscreen fullscreen'} id="fullscreenIconNav" style={{ alignSelf:'center',fontSize:'1.8rem' }} onClick={toggleFullscreen} />
            </li>
            <li class="nav-item"  style={{ fontSize:'1.8rem' ,alignSelf:'center',padding:'6px' ,cursor:'pointer' }}>
            <i className={isDarkMode ? 'bx bx-sun' : 'bx bx-moon'} id="fullscreenIconNav" style={{ fontSize:'1.8rem' ,alignSelf:'baseline'  }} onClick={toggleDarkMode} />
            </li>

            <li class="nav-item" style={{ alignSelf:'center',padding:'0px' ,cursor:'pointer' }}>
              <a class="nav-link disabled" aria-disabled="true">username</a>
              
            </li>
            <li class="nav-item" style={{ alignSelf:'center',padding:'0px' ,cursor:'pointer' }}>
               <i class='bx bxs-user' id="userr"></i>
            </li>
          
          </ul>
          
        </div>
      </div>
    </nav>
    
  </header>
  <nav className={`sidebar ${sidebarClosed ? 'close' : ''} ${sidebarHide ? 'hide' : ''}`}>
    <header>
      <div class="image-text">
          <span class="image">
            <img src={imageLogo} alt="logoimg" />
          </span>
            <div class="text header-text">
               <span class="name">Vstar</span>
               <span class="profession" id='collective-text'>Just Right For Me</span>
            </div>
      </div>
      <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
    </header>
    <div class="menu-bar">
       <div class="menu">
        <li class="search-box">
          
          <i class='bx bx-search icon' ></i>
            <input type="text" name="" id="" placeholder="Search..."/>
        
        </li>
        <ul class="menu-links">
          <li class="nav-links " >
            <Link to='/App'>
                 <a href="#">
              <i class='bx bx-home-alt icon ' ></i>
              <span class="text nav-text " >
                Dashboard
              </span>
            </a>
            </Link>
           
          </li>
          <li class="nav-links">
            <a href="#" className='active'>
              <i class='bx bxs-bar-chart-alt-2 icon' style={{ color:'white' }}></i>
               <span class="text nav-text"style={{ color:'white' }}>
                DSR
              </span>
            </a>
          </li>
          <li class="nav-links">
            <a href="#">
              <i class='bx bx-bell icon' ></i>
              <span class="text nav-text">
                Notifications
              </span>
            </a>
          </li>
          <li class="nav-links">
            <a href="#">
              <i class='bx bx-pie-chart-alt icon' ></i>
              <span class="text nav-text">
                Analytics
              </span>
            </a>
          </li>
          <li class="nav-links">
            <a href="#">
              <i class='bx bx-like icon' ></i>
              <span class="text nav-text">
                Likes
              </span>
            </a>
          </li>
          <li class="nav-links">
            <a href="#">
              <i class='bx bxs-wallet icon' ></i>
              <span class="text nav-text">
                Wallets
              </span>
            </a>
          </li>
      
        </ul>
       </div>
      <div class="bottom-content">
        <Link to='/Login' style={{ textDecoration:'none' }}>
                    <li class="">
            <a href="#">
              <i class='bx bx-log-out icon' ></i>
              <span class="text nav-text">
                Logout
              </span>
            </a>
          </li>
        </Link>

          <li class="mode">
            <div class="moon-sun">
              <i class='bx bx-moon icon moon' ></i>
              <i class='bx bx-sun icon sun' ></i>
            </div>
                  <span className="mode-text text">
              {isDarkMode ? 'Light mode' : 'Dark Mode'}
            </span>
            <div className="toggle-switch" onClick={toggleDarkMode}>
            <span className={`switch ${isDarkMode ? 'dark' : ''}`}>
                 
              </span>
            </div>
          </li>
          <li className="mode" id="fullscreenBtn" onClick={toggleFullscreen}>
        <div className="moon-sun">
          <i className={isFullscreen ? 'bx bx-exit-fullscreen fullscreen' : 'bx bx-fullscreen fullscreen'} id="fullscreenIcon" />
        </div>
        <span className="mode-text text" id="screentext">
          {isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
        </span>
        <div className="toggle-switch"></div>
      </li>
        </div>
        
    </div>
  </nav>
  <section class="home">
        <div class="mainDiv" style={{ padding: '19px' }}>
         
          <div class="mainHead"><Link to='/DSR' style={{ textDecoration:'none',color:'white' }}><span>DSR</span></Link>
          <Link to='/details/IN' style={{ textDecoration:'none',color:'white' }}><span>/INDIA</span></Link>/KERALA</div>
          <br /> 

          <div className="menuOptions">
            <button
              id='menuBtns'
              style={{ border: 'none', opacity: showGraph ? '50%' : '50%' }}
              onClick={() => setShowGraph(false)} // Show MainTable
            >
              Chart
            </button>
            <button
              id='menuBtns'
              style={{ paddingRight: '10px', paddingLeft: '10px', opacity: showGraph ? '50%' : '' }}
              onClick={() => setShowGraph(false)} // Show MainTable
            >
              Table
            </button>
            <button
              id='menuBtns'
              style={{ border: 'none', opacity: showGraph ? '100%' : '50%' }}
              onClick={() => setShowGraph(true)} // Show Dashboard2
            >
              Graph
            </button>
          </div>
          <div className={`transition-left-to-right ${showGraph ? 'move-left' : 'move-right'}`}>
            {showGraph ? <Dashboard2 /> : <KeralaTable/>}
          </div>
        </div>
      </section>
  <div className="settingsTab" onClick={toggleNav}>
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
          <span >Sidenav View</span>
          <div class="sidenavbox">
                
                <div className="navhide" onClick={toggleSidebarHide}>
                {sidebarHide ? <i class='bx bxs-show'></i> : <i class='bx bxs-hide'></i>}
               
                </div>
                
                {sidebarHide ? <span>Show</span>: <span>Hide</span>}

               
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

export default Demo2;
