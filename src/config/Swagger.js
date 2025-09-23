import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce APIS",
      version: "1.0.0",
      description: "API docs for Ecommerce backend",
    },
    tags: [
      { name: "Users", description: "User authentication and profile APIs" },
      { name: "Products", description: "Product management APIs" },
      { name: "Cart", description: "Cart operations APIs" },
      { name: "Orders", description: "Order management APIs" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // 👈 يوضح إننا بنستخدم JWT
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["/home/lilian/ecommerce-api/src/Docs/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
