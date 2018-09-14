import requests from './requests';


export default {

  Query: {
    allRequests(obj, args) {
      return requests.find({}, { skip: args.perPage * args.page, limit: args.perPage }).fetch();
    },
    _allRequestsMeta(obj, args) {
      return { count: Math.ceil(requests.find().count() / args.perPage) };
    },
    Request(obj, { id }) {
      return requests.findOne({ _id: id });
    },
  },

  Request: {
    id: post => (post._id),
  },
  Mutation: {
    createRequest(obj, {
      pickupAddress,
      pickupDate,
      pickupTime,
      dropOffAddress,
      dropOffDate,
      dropOffTime,
      user_id,
      car_id,
    }) {
      const res = requests.insert(
        {
          pickupAddress,
          pickupDate,
          pickupTime,
          dropOffAddress,
          dropOffDate,
          dropOffTime,
          user_id,
          car_id,
        },
      );
      return requests.findOne(res);
    },
    updateRequest(obj,
      {
        id,
        pickupAddress,
        pickupDate,
        pickupTime,
        dropOffAddress,
        dropOffDate,
        dropOffTime,
        user_id,
        car_id,
      }) {
      requests.update({ _id: id }, {
        $set: {
          pickupAddress,
          pickupDate,
          pickupTime,
          dropOffAddress,
          dropOffDate,
          dropOffTime,
          user_id,
          car_id,
        },
      });
      return requests.findOne({ _id: id });
    },
    deleteRequest(obj, { id }) {
      const res = requests.remove({ _id: id });

      return (((res)) !== 0) ? { data: id } : { data: 'failed ' };
    },
  },

};
