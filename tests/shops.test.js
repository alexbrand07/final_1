const request = require("supertest");
const { response } = require("../app");
const app = require("../app");
const { product } = require("../db/prismaClient");
const { Shop } = require(".prisma/client")

const mockCreate = jest.fn();
const mockFindMany = jest.fn();
const mockUpdate = jest.fn();
const mockDeleteShop = jest.fn();

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => ({
    shop: {
      create: (...args) => mockCreate(...args),
      findMany: (...args) => mockFindMany(...args),
      update: (...args) => mockUpdate(...args),
      delete: (...args) => mockDeleteShop(...args)
    },
  })),
}));

// GET SUCCESS TEST

describe('GET /shops', () => {
  it('should return a list of shops', async () => {
    expect.hasAssertions();
    const expected = [
    {
      id: 1,
      name: "Lpa shop",
      description: "Good shoes for everyday use"
    },
  ] 
    mockFindMany.mockReturnValueOnce(expected);
      const response = await request(app).get('/shops');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {"description":"Good shoes for everyday use","id":1,"name":"Lpa shop"}
      ]);
  });

// GET FAILING TEST

  it('should return 500 when db is not accessible', async () => {
    expect.hasAssertions();

    mockFindMany.mockRejectedValueOnce(new Error("db is down"));
      const response = await request(app).get('/shops');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({"error": "db is down" });
  });
});

// POST SUCCESS TEST

it('should create a shop', async () => {
  expect.hasAssertions();
  
  const payload =
  {
    id: 1,
    name: "LPA",
    description: "For any taste",
    Id: 232
  };
  mockCreate.mockResolvedValueOnce(payload);

  const response = await request(app).post('/shops').send(payload);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(payload);
});

//  POST Failing test

it('should return 500 when db is down', async () => {
  expect.hasAssertions();
  
  const payload =
  {
    id: 1,
    name: "LPA",
    description: "For any taste"
  }
  
  mockCreate.mockRejectedValueOnce(new Error("db is down"));
  const response = await request(app).post('/shops').send(payload);
  expect(response.status).toBe(500);
  expect(response.body).toEqual({"error": "db is down" });
});

// //write tests for put and delete

it('should update a shop', async () => {
  expect.hasAssertions();
  const id = 31;
  const payload = {
    name: "lpa",
    description: "everyday use"
  };
  mockUpdate.mockResolvedValueOnce(payload);
  const response = await request(app).put(`/shops/${id}`).send(payload);
  expect(response.status).toBe(200);
  expect(response.body).toStrictEqual(payload);
});


// TEST FOR DELETE METHOD

it('should delete a shop', async () => {
  expect.hasAssertions();
  const id = 37;
  mockDeleteShop.mockResolvedValueOnce({});
  const response = await request(app).delete(`/shops/${id}`);
  expect(response.status).toBe(200);
  expect(response.body).toEqual({});
});




// describe('GET /products', () => {
//   it('GET /products --> array of products', async () => {
//     const res = await request(app)
//     .get("/products")
//     .expect("Content-Type", /json/)
//     .expect(200)
//     .then(response => {
//       console.log("endpoint", response.body);
//       expect(response.body).toEqual(
//         expect.objectContaining({
//           success: true,
//           data: expect.any(Array)
//         })
//       )
//       const data = response.body.data;
//       expect(data.length).toBeGreaterThan(0)
//       data.forEach(product => {
//         let id = product.id;
//       })
//     })
//   });
// });
// describe('GET /products', () => {
//   it('GET /products --> array of products', async () => {
//     const product = await request[
//     {"description":"Good shoes for everyday use","id":1,"name":"Nike AIR"},
//     {"description":"Good shoes for everyday use","id":2,"name":"Nike AIR"},
//     {"description":"Good shoes for everyday use, casual","id":3,"name":"Adidas Yeezy"},
//     {"description":"Good shoes for everyday use, casual","id":4,"name":"Air Jordan"},
//     {"description":"Good shoes for everyday, hiking, casual","id":5,"name":"Timberland"}]
//   })})
        

// describe('GET /', () => {
//   it('should return 200 OK', async () => {
//     const res = await request(app)
//     .get("/")
//     .expect(200)
//   });
//   it('should return 200 OK', async () => {
//     const res = await request(app)
//     .get("/products")
//     .expect(200)
//   });  
// });

// describe('GET /products', () => {
//   it('GET /products --> array of products', () => request(app)
//     .get("/products")
//     .set("Accept", "application/json")
//     .expect("Content-Type", /json/)
//     .expect(200)
//     .then((response) =>{
//       expect(response.body).toBe(200);
//     }));
//   });

// describe('GET /', () => {
//   it('should return 200 OK', done => {
//     const ok=true;
//     done();
//   });  
// });

// const request = supertest(app)

//   it('Gets the test endpoint', async done => {
//     // Sends GET Request to /test endpoint
//     const res = await request.get('/products')
//     expect(response.status).toBe(200)
//     expect(response.body.message).toBe('pass!').
//     done()
//   })


//   app.get('/products', async (req, res) => {
//     res.json({message: 'pass!'})
//   })

// it('should return 200 OK', async done => {
//   const res = await request.get("/products")
//   expect(response.status).toBe(200)
//   expect(response.body.message).toBe('pass!')
//   done()
// });

// describe("POST /product", () => {
//   describe("given a name and description", () => {
//     test("should respond with a 200 status code", async () => {
//       const response = await request(app).post("/product").send({
//         "name": "shoes",
//         "description": "for shoes",
//         "categories": "Hiking"
//       })
//       expect(response.statusCode).toBe(200)
//     })
//     test("should specify json in the content type header", async () => {
//       const response = await request(app).post("/product").send({
//         "name": "shoes",
//         "description": "for shoes",
//         "categories": "Hiking"
//       })
//       expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
//     })
//     test("response has userId", async () => {
//       const response = await request(app).post("/product").send({
//         "name": "shoes",
//         "description": "for shoes",
//         "categories": "Hiking"
//       })
//       expect(response.body.userId).toBeDefined()
//     })
//   })
// })
// describe('POST /product', () => {
//   it('should create a new product', async () => {
//       const product = { "name": 'Puma', "description": "Running, Outside, Casual", "categories": "Hiking"};
//       const response = await request(app)
//           .post('/product')
//           .send(product);
//       expect(response.status).toBe(201);
//       expect(response.body).toEqual({ "id": 6, "name": 'Puma', "description": "Running, Outside, Casual", "categories": "Hiking" });
//   });
// });
