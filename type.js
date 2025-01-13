import zod from "zod";

const TodoSchema = zod.object({
  title: zod.string().min(5).max(40),
  description: zod.string().min(5).max(40),
});

const TodoSchemaIndiviual = zod.object({
  title: zod.string().min(5).max(40),
  description: zod.string().min(5).max(40),
  username: zod.string().min(5).max(20),
});

const UserNameSchema = zod.string().min(2).max(30);

const UserId = zod.string().min(5).max(50);
export { TodoSchema, UserNameSchema, UserId, TodoSchemaIndiviual };
