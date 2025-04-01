okie so I making a job post
once I have a job post
user will click on start now
to start the inverview session

in that case, what can i do?

    # interview session
    > approach 1:
    Create an interview session record it in the database
    it can store stuff about current candidate

        > what can it store?
        # Job Post / Job Post Card 
        1. job_post_id: for job post reference
        2. created_by: current candidate id
        3. ChatSession: allowing candidate to chat with ai
           > create chat_session schema
           > This will be used to connect all the messages of the 
           user and the assistant
           > Create a chat session schema, which will store
           > all the chat messages 
           1. id: generated automatically through pg
           2. chat_session_id: chat_session_id
           # so this is connected now.
           chat feature problem solved.

        4. code_submission_id: 
        let's narrow down all the problems one by one
        starting with questions
        each job interview contains 3-4 coding problems 
            > steps
            1. create code_session schema
               a. id
               b. job_interview_id
               c. created_by_id/candidate_id 
               d. solutions_id
                
               2 create code_solution
               # so many ways to do this, can't stick to one



        

          











 apporach 2:
    
