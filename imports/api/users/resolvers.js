export default {

  Query: {
    allUsers(obj, args) {
      return Meteor.users.find({}, { skip: args.perPage * args.page, limit: args.perPage }).fetch();
    },
    _allUsersMeta(obj, args) {
      return { count: Math.ceil(users.find().count() / args.perPage) };
    },
    User(obj, { id }) {
      return Meteor.users.findOne({ _id: id });
    },
  },

  User: {
    id: post => (post._id),
  },
  Mutation: {
    deleteUser(obj, { id }) {
      const res = Meteor.users.remove({ _id: id });
      return (((res)) !== 0) ? { data: id } : { data: 'failed ' };
    },
  },

};
