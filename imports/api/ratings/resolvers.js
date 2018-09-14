import ratings from './ratings';


export default {

  Query: {
    allRatings(obj, args) {
      return ratings.find({}, { skip: args.perPage * args.page, limit: args.perPage }).fetch();
    },
    _allRatingsMeta(obj, args) {
      return { count: Math.ceil(ratings.find().count() / args.perPage) };
    },
    Rating(obj, { id }) {
      return ratings.findOne({ _id: id });
    },
  },

  Rating: {
    id: post => (post._id),
  },
  Mutation: {
    createRating(obj, {
      driving,
      practicality,
      carInterior,
      comment,
      user_id,
      car_id,
    }) {
      const res = ratings.insert(
        {
          driving,
          practicality,
          carInterior,
          comment,
          user_id,
          car_id,
        },
      );
      return ratings.findOne(res);
    },
    updateRating(obj,
      {
        id,
        driving,
        practicality,
        carInterior,
        comment,
        user_id,
        car_id,
      }) {
      ratings.update({ _id: id }, {
        $set: {
          driving,
          practicality,
          carInterior,
          comment,
          user_id,
          car_id,
        },
      });
      return ratings.findOne({ _id: id });
    },
    deleteRating(obj, { id }) {
      const res = ratings.remove({ _id: id });
      return (((res)) !== 0) ? { data: id } : { data: 'failed ' };
    },
  },

};
