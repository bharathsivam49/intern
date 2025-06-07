# 1.Create a simple API route using *Next.js App Router* to return a list of static to-do items.
step 1: open your cmd    
step 2: npm install (install all required file)    
step 3: npm run dev   
step 4: http://localhost:3000    
step 5:http://localhost:3000/Todopage    
step 6: if you want a json format http://localhost:3000/api/todos   

# 2.Create a *mock integration* for a fictional service: notesync under provider notion.
step 1: open your cmd       
step 2: npm install (install all required file)         
step 3: npm run dev        
step 4: http://localhost:3000/api/notesync       

# 3.AI Integration (Curiosity + Optional Code)      
step 1: open your cmd       
step 2: npm install (install all required file)      
step 3: npm run dev     
step 4:http://localhost:3000/chat       

# Q) Which model/framework you'd choose and why
    I would choose OpenAI’s GPT-4 as the language model and integrate it using the Vercel AI SDK.
    Because,
    1.Advanced language understanding:
    GPT-4 can generate coherent, context-aware, and human-like responses, which is ideal for a chat feature.      
    2.Streaming support :    
    It allows real-time word-by-word responses, making the chat feel faster and more interactive.     
    3.Reliable and production-ready:
    OpenAI’s APIs are well-documented, stable, and trusted by developers worldwide.       
    4.Vercel AI SDK makes integration smooth** with Next.js, especially using the new App Router and server actions.         

 # Q) How I would integrate it into a Next.js app
    To integrate GPT-4 into a Next.js app (especially with the App Router), I would follow these key steps:
   # Step 1: Set up a server-side API route
     Create an endpoint like /api/chat to handle user messages.
     In this route, I’d connect to the GPT-4 model using OpenAI’s SDK or the Vercel AI SDK.
   # Step 2: Handle user input on the frontend
     Create a chat interface where users can type and submit messages.
     Use a React hook (like useChat from the Vercel AI SDK) to manage state and interactions.
   # Step 3: Send user messages to the server
     On submit, the client sends the chat history (as messages) to the server route.
     The server sends the request to GPT-4 and streams back the response.
   # Step 4: Stream the response back to the frontend
     The Vercel AI SDK supports streaming, so the assistant's reply appears word-by-word.
     This improves user experience by reducing wait time and making the conversation feel more natural.
   # Step 5: Deploy and secure
    Add the OPENAI_API_KEY to the .env file.
    Deploy the app (e.g., to Vercel) and make sure the key is stored securely.

  # Q) How you’d handle input/output, and streaming responses
     Input: User types a message, sent with chat history to the backend.
    Output: Backend sends the message to GPT-4 and streams the response.
    Streaming: The frontend receives and displays the response token-by-token in real time,
    creating a smooth, interactive chat experience.



  # 4.) Developer Mindset
  # Q) What's the most exciting tool/stack you’ve explored recently?
      I’ve beeen used Spring Boot for building robust backend APIs, which I really enjoy for its 
      simplicity and powerful features.  
      I’ve also working with Next.js and the Vercel AI SDK for building AI-powered apps,
      which simplifies integrating language models and supports streaming responses. 
      
   # Q) Describe how you approach debugging when stuck.
      I isolate the issue by adding logs and reviewing error messages. Then, I break down the problem into smaller 
      parts to find the source. I refer to documentation and community forums, and if needed, ask teammates. I test
      each fix carefully until the issue is resolved.
      
  # Q) Share a link to one past project (GitHub/CodeSandbox/etc) you’re proud of (if any).
     Here’s my GitHub repo for a full-stack Banking system with Spring Boot and HTML,CSS, Javascript:
  Check out my [Banking project](https://github.com/bharathsivam47/bank_website)

     




