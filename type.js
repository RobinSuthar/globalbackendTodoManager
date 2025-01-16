import zod, { string } from "zod";

const TodoSchema = zod.object({
  title: zod.string().min(2).max(20),
  description: zod.string().min(2).max(25),
});

const TodoSchemaIndiviual = zod.object({
  title: zod.string().min(2).max(20),
  description: zod.string().min(1).max(25),
  username: zod.string().min(1).max(15),
});

const OrganizationSchemaValdaition = zod.object({
  companyName: zod.string().min(5).max(20),
  companyPin: zod.string().min(2).max(15),
});

const CompanySchema = zod.object({
  companyName: zod.string(),
  author: zod.string().min(1).max(20),
  title: zod.string().min(1).max(20),
  description: zod.string().min(1).max(25),
});

const UserNameSchema = zod.string().min(2).max(20);

const UserId = zod.string().min(5).max(50);
export {
  TodoSchema,
  UserNameSchema,
  UserId,
  TodoSchemaIndiviual,
  OrganizationSchemaValdaition,
  CompanySchema,
};
