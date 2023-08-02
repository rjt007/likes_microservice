# Likes Microservice API Documentation

The Likes microservice is responsible for managing and processing like events for contents in the system. It provides several endpoints to store likes, check if a user has liked a particular content, and get the total likes for a content.

## Endpoints

### 1. Store Like Event

Stores a like event for a content.

- **URL:** `/api/likes`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "user_id": "user123",
    "content_id": "content456"
  }
- **Response:**
   - Status Code: 201 (Created)
   - Body:
        ```json
        {
          "message": "Like event stored successfully"
        }
### 2. Check if User has Liked a Content

Checks if a user has liked a particular content.

- **URL:** `/api/likes/check`
- **Method:** `GET`
- **Query Parameters:**
    - user_id (string, required): User ID
    - content_id (string, required): Content ID

    ```
    `/api/likes/check?user_id=user123&content_id=content456`
    ```

- **Response:**
   - Status Code: 200 (OK)
   - Body:
        ```json
        {
           "liked": true
        }
    - liked (boolean): Indicates whether the user has liked the content (true) or not (false).

### 3. Get Total Likes for a Content

Retrieves the total number of likes for a content.

- **URL:** `/api/likes/count`
- **Method:** `GET`
- **Query Parameters:**
    - content_id (string, required): Content ID
    
    ```
    `/api/likes/count?content_id=content456`
    ```
- **Response:**
   - Status Code: 200 (OK)
   - Body:
        ```json
        {
           "totalLikes": 10
        }
    - totalLikes (integer): The total number of likes for the given content.

## Running the Microservice

To run the Likes microservice, follow the steps below:

- Clone the repository and navigate to the **likes_microservice** directory.

- You can run the application using npm or docker.

    - To run the server using npm, do the following steps.

        ```js
        npm install
        ```
        ```js
        npm run devStart
        ```
    - To run the server using docker, do the following steps.
        ```bash
        docker compose up
        ```
- The microservice will be accessible at http://localhost:3000.


## Additional Features
In addition to the minimum requirements, the Likes microservice also includes some additional features:

- **Sending Push Notification to Users:** The microservice includes placeholder code to demonstrate sending a push notification to a user once they receive 100 likes.

- **Handle Scaling:** We have used *node-cache* module of node js to store the data in server's cache memory so that when millions of users hit the server they get faster retrieval of data without much latency.

- **Dockerization:** The entire system, including the Likes microservice, database, and other components, is containerized using Docker. This ensures consistency and ease of deployment.

- **Docker Compose:** The docker-compose.yml file is provided to wire all components of the microservice and run them using a single command (docker compose up).

## Conclusion
The Likes microservice is a crucial component of our hypothetical system, allowing users to like content and providing functionalities to check likes and retrieve the total likes for contents. The implementation follows best practices, is scalable, and has been containerized using Docker for ease of deployment.

Please note that this is a simplified implementation for demonstration purposes, and in a production environment, additional considerations such as database choice, security measures, and high availability would need to be taken into account.