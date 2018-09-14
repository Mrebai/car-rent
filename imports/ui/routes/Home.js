import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../payment/CheckoutForm';

const metorLogin = () => {
  Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'] }, (err) => {
    if (err) {
      console.log('Handle errors here: ', err);
    }
  });
};

const metorLoginGoogle = () => {
  Meteor.loginWithGoogle({ requestPermissions: ['profile'] }, (err) => {
    if (err) {
      console.log('Handle errors here: ', err);
    }
  });
};
const Home = () => (
  <div>
    <div>
      <p> hello world</p>
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
          <button type="button" onClick={() => metorLogin()}>facebook</button>
          <button type="button" onClick={() => metorLoginGoogle()}>Google</button>
        </div>
      </StripeProvider>
    </div>
  </div>
);

export default Home;
