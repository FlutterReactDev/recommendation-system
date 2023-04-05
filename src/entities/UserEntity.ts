import * as Yup from "yup";

export const USER_DATA_SCHEMA = Yup.object({
  name: Yup.string().required(),
  gender: Yup.string().required(),
  age: Yup.number().required(),
  photoUrl: Yup.string().nullable(),
});

export type UserEntity = Yup.InferType<typeof USER_DATA_SCHEMA>;
