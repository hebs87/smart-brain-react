import React, {Fragment} from "react";

const Navigation = ({onRouteChange, isSignedIn}) => {
  return (
    <Fragment>
      {
        isSignedIn &&
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p
            onClick={() => onRouteChange('signin')}
            className='f3 link dim black underline pa3 pointer'
          >
            Sign Out
          </p>
        </nav>
      }
      {
        !isSignedIn &&
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p
            onClick={() => onRouteChange('signin')}
            className='f3 link dim black underline pa3 pointer'
          >
            Sign In
          </p>
          <p
            onClick={() => onRouteChange('signup')}
            className='f3 link dim black underline pa3 pointer'
          >
            Sign Up
          </p>
        </nav>

      }
    </Fragment>
  )
}

export default Navigation;
