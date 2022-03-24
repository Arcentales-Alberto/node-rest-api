# Title
    NODE REST API

# Description
    It is a simple project to understand the basic concepts of a REST API.

# Relation
    Customer[one]  --> [many]Products

# Routes
    Customer
        GET:     /api/customers
        GET:     /api/customers/:id
        POST:    /api/customers 
        PUT:     /api/customers/:id
        DELETE:  /api/customers/:id
    Product
        GET:     /api/products
        GET:     /api/products/:id
        GET:     /api/products/customer/:id
        POST:    /api/products
        PUT:     /api/products/:id
        DELETE:  /api/products/:id

# Run API
    npm install
    npm test
    npm run dev

# RUN DOCKER
    docker-compose -f docker-compose.yml -p node-api-rest --env-file .env up
