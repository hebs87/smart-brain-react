import React, {Fragment} from "react";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation = ({onRouteChange, isSignedIn, toggleModal}) => {
  return (
    <Fragment>
      {
        isSignedIn &&
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <ProfileIcon
            onRouteChange={onRouteChange}
            toggleModal={toggleModal}
          />
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
