<br />
<p align="center">
    <img src="./public/PF85-logo.png" alt="PF85" width="180" >
  <h3 align="center">PF85 | help review your performance, with on bonus!</h3>
</p>

#### Performance85 Server side codebase

### Manual

- Create a new `.env` in the root.
- Copy the content from `.env.EXAMPLE`
- Or use my clustor env file [gist](https://bit.ly/3gQzmWE), Please do not use for other purposes. :)
- `npm run start` to start.
- Client side code base is below.

### Client-Side Repo
Performance85 client code repo. 
FrontEnd [Link](https://github.com/Colin6618/Performance85-client)

------ 
Made by [Colin Han](https://github.com/Colin6618) with the buttock pain.



## Database Design
### Admin
* Add/remove/update/view employees 
* ==> User Model + User Management Panel
* Add/update/view performance reviews 
* ==> Performance Model 
* Assign employees to participate in another employee's performance review 
* ==> Users field in Performance Model

### Employee view
* List of performance reviews requiring feedback 
* ==> Find user in Performance data + List page UI
* Submit feedback 
* ==> Comments field in Performance modle


### DB

#### User Schema
- name
- username
- email
- password
- bio
- avatarurl del
- date_joined

#### Performance Review Schema
- title
- body
- date_opened
- isopen
- assignBy: user
- subject:（main role）
- invitees: [] (Give feedback)
- comments: []

#### commentSchema
- body
- date
- author : user

### cutting demand
#### Not for now
- validation on data model, params and user input.
- <del>user session and JWT before necessary.</del>
