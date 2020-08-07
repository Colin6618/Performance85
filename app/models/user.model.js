/* - name
- username
- password
- bio
- avatarurl // Development would be time cosint, low priority
- group: no LDAP system
- date_joined */

module.exports = mongoose => {
  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 100
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      unique: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 100
    },
    bio: {
      type: String,
      minLength: 6,
      maxLength: 200,
      default: 'To be continued.'
    },
    group: { // number or bitwise operation would be better in some scenerios. Strings more simple, readble
      type: String,
      required: true,
      enum: ['Employee', 'Admin', 'SystemOps'],
      default: 'Employee'
    },
  }, {
    timestamps: true
  });

  schema.method("toJSON", function () {
    const {
      __v,
      _id,
      password,
      ...object
    } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};