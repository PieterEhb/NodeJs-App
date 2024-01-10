import joi from "joi";

export const createUserSchema = joi.object().keys({
  username: joi.string().alphanum().min(3).max(50).required(),
  //one letter, number and specialChar
  password: joi.string().required().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$')).message({
    "string.required": `password must contain value`,
    "string.pattern.base": `password must contain atleast a number, an alpha and a special char. must be atleast 8 chars long`
  }),
  email: joi.string().email().required(),
  firstname: joi.string().min(3).max(50).pattern(new RegExp('^[a-zA-Z]+$')).message({
    "string.pattern.base": `firstname can only contain a-Z chars`,
    "string.min": `"firstname" should have a minimum length of 3`,
    "string.max": `"firstname" should have a maximum length of 50`
  }),
  lastname: joi.string().min(3).max(50).pattern(new RegExp('^[a-zA-Z ]+$')).message({
    "string.pattern.base": `lastname can only contain a-Z chars and spaces`,
    "string.min": `"lastname" should have a minimum length of 3`,
    "string.max": `"lastname" should have a maximum length of 50`
  }),
  phone: joi.string().pattern(new RegExp('^(\\+(([0-9]){1,2})[-./])?(((([0-9]){2,3})[-./])(([0-9]{2})[-./]){2})([0-9]{2})$')).message({
    "string.pattern.base": `phone must be of format +32(.-/)XXX(.-/)XX(.-/)XX(.-/)XX`
  })
});


export const updateUserSchema = joi.object().keys({
    firstname: joi.string().min(3).max(50).pattern(new RegExp('^[a-zA-Z]+$')).message({
      "string.pattern.base": `firstname can only contain a-Z chars`,
      "string.min": `"firstname" should have a minimum length of 3`,
      "string.max": `"firstname" should have a maximum length of 50`
    }),
    lastname: joi.string().min(3).max(50).pattern(new RegExp('^[a-zA-Z ]+$')).message({
      "string.pattern.base": `lastname can only contain a-Z chars and spaces`,
      "string.min": `"lastname" should have a minimum length of 3`,
      "string.max": `"lastname" should have a maximum length of 50`
    }),
    phone: joi.string().pattern(new RegExp('^(\\+(([0-9]){1,2})[-./])?(((([0-9]){2,3})[-./])(([0-9]{2})[-./]){2})([0-9]{2})$')).message({
      "string.pattern.base": `phone must be of format +32(.-/)XXX(.-/)XX(.-/)XX(.-/)XX`
    })
  });
  