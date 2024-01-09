import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;

  const customerAlreadyExist = customers.some((cus) => cus.cpf === cpf);

  customerAlreadyExist
    ? res.status(400).json({ error: "Customer already exist!" })
    : customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: [],
      });

  return res.status(201).send();
});

app.get("/statement/:cpf", (req, res) => {
  const { cpf } = req.params;

  const customer = customers.find((cust) => cust.cpf === cpf);
  return res.json(customer.statement);
});

const port = 3333;
app.listen(port, () => {
  `Server running on ${port}`;
});
