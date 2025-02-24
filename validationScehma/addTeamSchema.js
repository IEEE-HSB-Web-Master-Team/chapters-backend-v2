import Joi from "joi";

export const addTeamSchema = Joi.object({
  committe: Joi.string()
  // .valid("pes", "ras", "cs")
  .required().messages({
    "string.base": "Committee must be a string.",
    "string.empty": "Committee is required.",
    "any.required": "Committee is required.",
  }),
  teamName: Joi.string().required().messages({
    "string.base": "Team name must be a string.",
    "string.empty": "Team name is required.",
    "any.required": "Team name is required.",
  }),
  teamMember1: Joi.string().messages({
    "string.base": "Team Member 1 must be a string.",
    "string.empty": "Team Member 1 is required.",
    "any.required": "Team Member 1 is required.",
  }),
  teamMember2: Joi.string().messages({
    "string.base": "Team Member 2 must be a string.",
    "string.empty": "Team Member 2 is required.",
    "any.required": "Team Member 2 is required.",
  }),
  teamMember3: Joi.string().messages({
    "string.base": "Team Member 3 must be a string.",
    "string.empty": "Team Member 3 is required.",
    "any.required": "Team Member 3 is required.",
  }),
  teamMember4: Joi.string().messages({
    "string.base": "Team Member 4 must be a string.",
    "string.empty": "Team Member 4 is required.",
    "any.required": "Team Member 4 is required.",
  }),
  teamMember5: Joi.string().messages({
    "string.base": "Team Member 5 must be a string.",
    "string.empty": "Team Member 5 is required.",
    "any.required": "Team Member 5 is required.",
  }),
  teamMember6: Joi.string().messages({
    "string.base": "Team Member 6 must be a string.",
    "string.empty": "Team Member 6 is required.",
    "any.required": "Team Member 6 is required.",
  }),
});
