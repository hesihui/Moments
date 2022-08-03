# Moments: Mark Your Own Memories 

### Tech Stack: Node.js, React.Js, Redux.Js, MongoDB, Express.js

Moments is a fullstack MERN social media app. You can share your own highlight moments with others! 

For fully running the app:  enter both client and server folder, `npm install` and `npm start`. For backend database connection, check .env.example 

 Some functioanlites for you to use:

- Basic crud functioanlites: display posts, create a post, update a post, delete a post, like a post, comment a post
- Authentication by google account or registered acoount via registration service 
- Pargination of the posts from the home page

Sample Demo Pic:

- Sign In page

<img src="https://raw.githubusercontent.com/hesihui/Moments/main/sample_pic/sign_in.png" alt="sign-in" />

- Registration Page

<img src="https://raw.githubusercontent.com/hesihui/Moments/main/sample_pic/register.png" alt="registration" />

- Home Page

<img src="https://raw.githubusercontent.com/hesihui/Moments/main/sample_pic/homepage.png" alt="home" />

- Detailed Page

<img src="https://raw.githubusercontent.com/hesihui/Moments/main/sample_pic/detailed_page.png" alt="detailedPage" />

Data Model:

Post: 

``` json
{
   title: String,
   message: String,
   name: String,
   creator: String,
   tags: [String],
   selectedFile: String,
   likes: { type: [String], default: [] },
   comments: { type: [String], default: [] },
   createdAt: {
      type: Date,
      default: new Date(),
   }
}
```

User Info

```json
{
    name: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true},
    id: { type: String }

}
```

