import ratings from '../ratings/ratings';
import request from '../requests/requests';


export default {

  Query: {
    user(obj, args, ctx) {
      console.log(ctx.user);
      return ctx.user || {};
    },
  },
  User: {
    id: user => ((user._id) ? user._id : null),
    userName: user => ((user._id) ? user.profile.name : null),
    picture: (user) => {
      if (!user._id) return (null);
      if (user.services.google) return (user.services.google.picture);
      if (user.services.facebook) return (user.services.facebook.picture.data.url);
      return (null);
    },
    email: (user) => {
      if (!user._id) return (null);
      if (user.services.google) return (user.services.google.email);
      if (user.services.facebook) return (user.services.facebook.email);
      return (null);
    },
    rating: user => (
      ratings.find({ user_id: user._id }).fetch()
    ),
    request: user => (
      request.find({ user_id: user._id }).fetch()
    ),

  },

};
