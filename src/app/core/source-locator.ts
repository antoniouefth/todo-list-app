import { Container } from "inversify";
import "reflect-metadata";
import { register as registerTodoBindings } from "./bindings/todos.bindings";

const sl = new Container();

[registerTodoBindings].forEach((register) => register(sl));

export { sl };
