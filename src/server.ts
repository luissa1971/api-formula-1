import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

// ---------------------------------------------------------------------------
// "Banco de dados" em memória
// ---------------------------------------------------------------------------

interface Team {
  id: number;
  name: string;
  base: string;
}

interface Driver {
  id: number;
  name: string;
  team: string;
}

const teams: Team[] = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 4, name: "Ferrari", base: "Maranello, Italy" },
  { id: 5, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 7, name: "Alfa Romeo Racing", base: "Hinwil, Switzerland" },
  { id: 8, name: "AlphaTauri", base: "Faenza, Italy" },
  { id: 9, name: "Williams", base: "Grove, United Kingdom" },
  { id: 10, name: "Haas", base: "Kannapolis, United States" },
];

const drivers: Driver[] = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 3, name: "Lando Norris", team: "McLaren" },
];

// Gera o próximo id disponível de uma coleção
const nextId = (items: { id: number }[]) =>
  items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;

// ---------------------------------------------------------------------------
// Tipos auxiliares das rotas
// ---------------------------------------------------------------------------

interface IdParams {
  id: string;
}

interface TeamBody {
  name: string;
  base: string;
}

interface DriverBody {
  name: string;
  team: string;
}

// ---------------------------------------------------------------------------
// Rotas: TEAMS (CRUD completo)
// ---------------------------------------------------------------------------

// READ - lista todas as equipes
server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

// READ - busca equipe por id
server.get<{ Params: IdParams }>("/teams/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const team = teams.find((t) => t.id === id);

  if (!team) {
    response.type("application/json").code(404);
    return { message: "Team Not Found" };
  }
  response.type("application/json").code(200);
  return { team };
});

// CREATE - cadastra nova equipe
server.post<{ Body: TeamBody }>("/teams", async (request, response) => {
  const { name, base } = request.body ?? ({} as TeamBody);

  if (!name || !base) {
    response.type("application/json").code(400);
    return { message: "Fields 'name' and 'base' are required" };
  }

  const team: Team = { id: nextId(teams), name, base };
  teams.push(team);

  response.type("application/json").code(201);
  return { team };
});

// UPDATE - atualiza equipe existente
server.put<{ Params: IdParams; Body: Partial<TeamBody> }>(
  "/teams/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const team = teams.find((t) => t.id === id);

    if (!team) {
      response.type("application/json").code(404);
      return { message: "Team Not Found" };
    }

    const { name, base } = request.body ?? {};
    if (name) team.name = name;
    if (base) team.base = base;

    response.type("application/json").code(200);
    return { team };
  }
);

// DELETE - remove equipe
server.delete<{ Params: IdParams }>("/teams/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const index = teams.findIndex((t) => t.id === id);

  if (index === -1) {
    response.type("application/json").code(404);
    return { message: "Team Not Found" };
  }

  const [removed] = teams.splice(index, 1);
  response.type("application/json").code(200);
  return { message: "Team deleted", team: removed };
});

// ---------------------------------------------------------------------------
// Rotas: DRIVERS (CRUD completo)
// ---------------------------------------------------------------------------

// READ - lista todos os pilotos
server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

// READ - busca piloto por id
server.get<{ Params: IdParams }>("/drivers/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const driver = drivers.find((d) => d.id === id);

  if (!driver) {
    response.type("application/json").code(404);
    return { message: "Driver Not Found" };
  }
  response.type("application/json").code(200);
  return { driver };
});

// CREATE - cadastra novo piloto
server.post<{ Body: DriverBody }>("/drivers", async (request, response) => {
  const { name, team } = request.body ?? ({} as DriverBody);

  if (!name || !team) {
    response.type("application/json").code(400);
    return { message: "Fields 'name' and 'team' are required" };
  }

  const driver: Driver = { id: nextId(drivers), name, team };
  drivers.push(driver);

  response.type("application/json").code(201);
  return { driver };
});

// UPDATE - atualiza piloto existente
server.put<{ Params: IdParams; Body: Partial<DriverBody> }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    }

    const { name, team } = request.body ?? {};
    if (name) driver.name = name;
    if (team) driver.team = team;

    response.type("application/json").code(200);
    return { driver };
  }
);

// DELETE - remove piloto
server.delete<{ Params: IdParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const index = drivers.findIndex((d) => d.id === id);

    if (index === -1) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    }

    const [removed] = drivers.splice(index, 1);
    response.type("application/json").code(200);
    return { message: "Driver deleted", driver: removed };
  }
);

// ---------------------------------------------------------------------------
// Inicialização
// ---------------------------------------------------------------------------

const port = process.env.PORT ? parseInt(process.env.PORT) : 3333;

server.listen({ port, host: "0.0.0.0" }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server running on port ${port}`);
});
