
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
- user session and JWT before necessary.
