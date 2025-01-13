import zod, { string } from "zod";

const TodoSchema = zod.object({
  title: zod.string().min(2).max(40),
  description: zod.string().min(5).max(40),
});

const TodoSchemaIndiviual = zod.object({
  title: zod.string().min(2).max(40),
  description: zod.string().min(1).max(40),
  username: zod.string().min(1).max(20),
});

const OrganizationSchemaValdaition = zod.object({
  name: zod.string().min(5).max(40),
  pin: zod.string().min(3).max(15),
});

const CompanySchema = zod.object({
  name: zod.string(),
  author: zod.string().min(1).max(40),
  title: zod.string().min(5).max(40),
  description: zod.string().min(5).max(40),
});

const UserNameSchema = zod.string().min(2).max(30);

const UserId = zod.string().min(5).max(50);
export {
  TodoSchema,
  UserNameSchema,
  UserId,
  TodoSchemaIndiviual,
  OrganizationSchemaValdaition,
  CompanySchema,
};
