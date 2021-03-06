# Trivia App
Trivia Web Application made with React Typescript, Tailwind CSS, SQL Server and Net Core 6, JWT Authentication. There's two main roles. User And Admin, Admin has higher privileges. In this app you can create rooms which have multiple questions. Any user can enter a room by the generated code of the room and answer the questions.

## Home Section 
Home section displays information about the app, there's a little demo of SVGs, which play at the moment you answer the questions.

![React App - Opera 2022-03-28 19-03-23_Trim](https://user-images.githubusercontent.com/92189889/160735362-39944291-72cf-4d40-aece-ab6a6d699047.gif)

## Dashboard
Main Section in the web application. It shows all the distinct functionalities available in the app. At the center you can see your profile and a record of all the activities you've done in the app.

![image](https://user-images.githubusercontent.com/92189889/160735597-8f97a30f-abfc-4991-bc46-2838927ddef6.png)

### Create a new Room
Basically it creates a random string which is the room code. 

![image](https://user-images.githubusercontent.com/92189889/160735877-48b487f7-2083-46a4-8787-ca4d40df691c.png)


### Join Room
Join rooms using generated codes. If a room has no quesions you can't enter.

![image](https://user-images.githubusercontent.com/92189889/160735932-47b1c90e-2270-4da0-b2ea-78c763e02f5d.png)

### See Rooms
It shows all the rooms generated by the user. And some data relevant to the room. You can also delete rooms by room code in this section.

![image](https://user-images.githubusercontent.com/92189889/160736000-c0d3237a-6af6-4c10-8243-42653fa74ad3.png)

## Manage Questions
Section where you can add, edit or delete any question in the room. 

![image](https://user-images.githubusercontent.com/92189889/160736366-ab7e34ae-d99f-4ad9-a971-f8607fc63731.png)

## See Scores
This section is a historic of all the questions sent. At the right it's a record of all the activities related with room managment and scores. In details of each score you can see all the answered questions, if it's right or wrong, plus the right answer. 

![React App - Opera 2022-03-29 19-10-59_Trim](https://user-images.githubusercontent.com/92189889/160737097-44f3f0e0-5bef-4718-a5b9-7154e6c446cf.gif)

## Explore
Section where last rooms are displayed, plus you can search rooms created by certain user.

![React App - Opera 2022-03-29 19-20-26_Trim](https://user-images.githubusercontent.com/92189889/160738083-dee0c4e1-8e33-4400-9613-e7bf12b110d1.gif)

## Profile Section
Profile Section of the current user. This profile section have 2 sections. Profile (where you can see a message wrote by the current user and the rooms created). And a dashboard section. In the dashboard section any user can post, you can comment any post and like any post. You can also delete your respective comments/posts. 

![React App - Opera 2022-03-29 19-38-25_Trim](https://user-images.githubusercontent.com/92189889/160740222-eed1677b-53ab-494d-8b8b-6a48b1f60da3.gif)

### New Post
![React App - Opera 2022-03-29 19-44-32_Trim](https://user-images.githubusercontent.com/92189889/160740968-7d5eacc3-fc76-463e-98f8-8e476bc40bfa.gif)

### New Comment
![React App - Opera 2022-03-29 19-44-51_Trim](https://user-images.githubusercontent.com/92189889/160740987-f3cfef52-d98f-44a7-a02f-4d9eef592463.gif)

## Search Users
This component is simple. You can search any user and go to their respective profile page.
![React App - Opera 2022-03-29 19-49-51_Trim](https://user-images.githubusercontent.com/92189889/160741416-d8c09bb0-c21c-4b31-a3a1-2b3a0aaed1ca.gif)

## Answering Trivia In A Room 
Pretty Simple. You answer a question and if it's right you get a point, if it's wrong you get no points. At the end you can see the results. The animation plays whenever you click in an answer. You can customize which animal appears in screen as shown in the home section.

![React App - Opera 2022-03-29 19-53-02_Trim](https://user-images.githubusercontent.com/92189889/160741913-72a9db13-d1a6-44cf-8155-fd2676b49f38.gif)

## Config
This section is only for configuration purposes. General tools are available for all the users, admin tools are available only to users with ADMIN role. 

![image](https://user-images.githubusercontent.com/92189889/160742103-5fee5375-1061-4e64-95aa-52d385c3ce0b.png)

## User Managment
Section only available for admin. Here you can create or delete accounts.

![image](https://user-images.githubusercontent.com/92189889/160742261-f2487893-73ae-410a-8c3b-428e846597d8.png)

Others options in config are self explanatory.

## Create an Account 
![image](https://user-images.githubusercontent.com/92189889/160742424-62aa9543-7281-4605-b235-2477499fae3c.png)

## Login
![image](https://user-images.githubusercontent.com/92189889/160742460-44c44b47-f10b-43ec-bb08-e421ba0bd84d.png)
