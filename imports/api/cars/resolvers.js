import cars from './cars';
import ratings from '../ratings/ratings';
import request from '../requests/requests';

export default {

  Query: {
    allCars(obj, args) {
      return cars.find({}, { skip: args.perPage * args.page, limit: args.perPage }).fetch();
    },
    _allCarsMeta(obj, args) {
      return { count: cars.find().count() };
    },
    Car(obj, { id }) {
      return cars.findOne({ _id: id });
    },
  },

  Car: {
    id: car => (car._id),
    rating: car => (
      ratings.find({ car_id: car._id }).fetch()
    ),
    request: car => (
      request.find({ car_id: car._id }).fetch()
    ),
  },
  Mutation: {
    createCar(obj, {
      name,
      model,
      description,
      price,
      passengers,
      luggages,
      doors,
      transmission,
      includes,
      available,
      images,
      image,
    }) {
      const res = cars.insert(
        {
          name,
          model,
          description,
          price,
          passengers,
          luggages,
          doors,
          transmission,
          includes,
          available,
          images,
          image,
        },
      );
      return cars.findOne(res);
    },
    updateCar(obj,
      {
        id,
        name,
        model,
        description,
        price,
        passengers,
        luggages,
        doors,
        transmission,
        includes,
        available,
        images,
        image,
      }) {
      cars.update({ _id: id }, {
        $set: {
          name,
          model,
          description,
          price,
          passengers,
          luggages,
          doors,
          transmission,
          includes,
          available,
          images,
          image,
        },
      });
      return cars.findOne({ _id: id });
    },
    deleteCar(obj, { id }) {
      const res = cars.remove({ _id: id });

      return (((res)) !== 0) ? { data: id } : { data: 'failed ' };
    },
  },

};
