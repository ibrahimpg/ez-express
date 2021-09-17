# What is this?

EZ-Express is a pick up and play REST API built with Express.js and designed to work with MongoDB and Cloudinary. It contains a secure registration system with fully developed authentication/authorization and email verification. Designed with a clean Router-Controller-Service architecture. Made to quickly get a project off the ground.

<br>

# Environmental Variables

JWT_KEY

MONGODB_URI

CLOUDINARY_URL

NODEMAILER_HOST

NODEMAILER_PORT

NODEMAILER_USER

NODEMAILER_PASS

<br>

# Endpoints

## Users

<br>

| Method      | Route                      | Variables                 |
| ----------- | -------------------------- | ------------------------- |
| GET         | /api/user/view             | username                  |
| POST        | /api/user/register         | username, password, email |
| POST        | /api/user/login            | username, password        |
| PATCH       | /api/user/update-email*    | email                     |
| PATCH       | /api/user/update-picture*  | picture                   |
| PATCH       | /api/user/update-profile*  | biography, tagline        |
| PATCH       | /api/user/update-password* | oldPassword, newPassword  |
| DELETE      | /api/user/delete*          |                           |

*Requires JWT in Authorization header with the following structure: Bearer \<TOKEN>
