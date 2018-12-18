import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignedIn } from '../../selectors/sessions';
import SignInView from '../SignInView';
import {
  Route,
  Redirect
} from "react-router-dom";

function ProtectedRoute({ component: Component, userSignedIn, ...rest }) {
  // if (userSignedIn) {
  //   return (
  //     <React.Fragment>
  //       {renderComponent(otherProps)}
  //     </React.Fragment>
  //   )
  // } else {
  //   return (
  //     <SignInView />
  //   )
  // }
  return (
    <Route
      {...rest}
      render={props =>
        userSignedIn
          ? <Component {...props} {...rest} />
          : (<Redirect
              to={{ pathname: '/sign-in' }}
            />)
      }
    />
  );
}

ProtectedRoute.propTypes = {
  userSignedIn: PropTypes.bool.isRequired
}

ProtectedRoute.defaultProps = {
  userSignedIn: false
}

const mapStateToProps = (state) => ({
  userSignedIn: userSignedIn(state)
});

export default connect(mapStateToProps)(ProtectedRoute);

// function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         fakeAuth.isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }