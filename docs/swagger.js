const swaggerJsdoc = require("swagger-jsdoc");

/**
 * Constant that has relevant API information.
 * It's used by swaggerJsdoc() function.
 * Info -> Overview information about the API.
 * Servers -> Servers that Swagger will make requests to.
 * Schemas -> Structures of models and processes.
 * SecuritySchemes -> API authentication type.
 */
const swaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "REST API ",
    description: "Hi there, this is the first REST API using Swagger and NodeJS I've ever created.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3001/api",
    },
  ],
  components:{
    securitySchemes:{
      bearerAuth:{
        type:"http",
        scheme:"bearer"
      }
    },
    schemas:{
      tracks:{
        type:"object",
        required:["name","artist"],
        properties:{
          name:{
            type:"string"
          },
          album:{
            type:"string"
          },
          cover:{
            type:"string"
          },
          artist:{
            type:"object",
            required:["name"],
            properties:{
              name:{
                type:"string"
              },
              nickname:{
                type:"string"
              },
              nationality:{
                type:"string"
              }
            }
          },
          duration:{
            type:"object",
            properties:{
              start:{
                type:"integer"
              },
              end:{
                type:"integer"
              }
            }
          },
          mediaId:{
            type:"string"
          }
        }
      },
      storage:{
        type:"object",
        required:["url"],
        properties:{
          url:{
            type:"string"
          },
          filename:{
            type:"string"
          }
        }
      },
      users:{
        type:"object",
        required:["name","age","email","password"],
        properties:{
          name:{
            type:"string"
          },
          age:{
            type:"integer"
          },
          email:{
            type:"string"
          },
          password:{
            type:"string"
          },
          role:{
            type:"object",
            required:[""],
            properties:{
              user:{
                type:"string"
              },
              admin:{
                type:"string"
              }
            }
          }
        }
      },
      authLogin:{
        type:"object",
        required:["email","password"],
        properties:{
          email:{
            type:"string"
          },
          password:{
            type:"string"
          }
        }
      },
      authRegister:{
        type:"object",
        required:["name","age","email","password"],
        properties:{
          name:{
            type:"string"
          },
          age:{
            type:"integer"
          },
          email:{
            type:"string"
          },
          password:{
            type:"string"
          }
        }
      }
    }
  }
};

/**
 * The constant "options" has all the information that will be used to create the Swagger documentation.
 * options.swaggerDefinition -> Establishes API information, like title or description.
 * options.apis -> Contains the path of the routes of the project and looks for every .js file.
 */
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const openApiConfiguration = swaggerJsdoc(options);

module.exports = openApiConfiguration;
