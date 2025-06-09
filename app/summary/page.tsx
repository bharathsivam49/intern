import React from 'react';
import styles from './summary.module.css';

const SummaryPage = () => {
  return (
    <div className={styles.container}>
      <h2>Part 3: AI Integration - Short Essay</h2>
      <p>
        Artificial Intelligence (AI) integration refers to the process of embedding AI technologies into
        existing systems, applications, or workflows to enhance their capabilities, automate tasks, and
        improve decision-making. By incorporating AI, businesses and organizations can leverage
        machine learning, natural language processing, computer vision, and other AI techniques to
        create smarter, more efficient, and adaptive solutions.
      </p>
      <p>
        One of the key benefits of AI integration is automation. Routine and repetitive tasks, such as data
        entry, customer support, and inventory management, can be automated, reducing human error and
        freeing up time for more strategic work. AI-powered chatbots, for example, provide instant
        responses to customer queries, improving user experience and operational efficiency.
      </p>
      <p>
        Moreover, AI enables data-driven insights by analyzing vast amounts of data faster and more
        accurately than humans. Predictive analytics powered by AI can forecast trends, detect anomalies,
        and assist in making informed decisions in industries like finance, healthcare, and marketing.
      </p>
      <p>
        However, successful AI integration requires careful planning, including selecting appropriate AI
        models, ensuring data quality, and addressing ethical considerations such as privacy and bias. It
        also demands collaboration between AI experts and domain specialists to tailor solutions to
        specific needs.
      </p>
      <p>
        In summary, AI integration is revolutionizing how organizations operate by enhancing automation,
        enabling smarter decision-making, and unlocking new opportunities. As AI technology advances,
        its integration will become increasingly vital across all sectors to maintain competitive advantage
        and drive innovation.
      </p>

      <h3>Q) Which model/framework you&apos;d choose and why</h3>
      <p>
        I would choose OpenAI&apos;s GPT-4 as the language model and integrate it using the Vercel AI SDK. Because:
      </p>
      <ul>
        <li><strong>Advanced language understanding:</strong> GPT-4 can generate coherent, context-aware, and human-like responses, which is ideal for a chat feature.</li>
        <li><strong>Streaming support:</strong> It allows real-time word-by-word responses, making the chat feel faster and more interactive.</li>
        <li><strong>Reliable and production-ready:</strong> OpenAI&apos;s APIs are well-documented, stable, and trusted by developers worldwide.</li>
        <li><strong>Smooth integration:</strong> Vercel AI SDK makes integration smooth with Next.js, especially using the new App Router and server actions.</li>
      </ul>

      <h3>Q) How I would integrate it into a Next.js app</h3>
      <ol>
        <li><strong>Set up a server-side API route:</strong> Create an endpoint like <code>/api/chat</code> to handle user messages and connect to GPT-4 using OpenAI&apos;s SDK or the Vercel AI SDK.</li>
        <li><strong>Handle user input on the frontend:</strong> Create a chat interface and use a React hook (like <code>useChat</code>) to manage state.</li>
        <li><strong>Send messages to the server:</strong> On submit, send the chat history to the server, which forwards it to GPT-4 and streams back the response.</li>
        <li><strong>Stream response to the frontend:</strong> Use Vercel AI SDK&apos;s streaming to display replies word-by-word for better UX.</li>
        <li><strong>Deploy and secure:</strong> Add <code>OPENAI_API_KEY</code> to the <code>.env</code> file and deploy (e.g., to Vercel).</li>
      </ol>

      <h3>Q) How you&apos;d handle input/output and streaming responses</h3>
      <ul>
        <li><strong>Input:</strong> User types a message, sent with chat history to the backend.</li>
        <li><strong>Output:</strong> Backend sends the message to GPT-4 and streams the response.</li>
        <li><strong>Streaming:</strong> Frontend receives and displays the response token-by-token in real-time for a smooth chat experience.</li>
      </ul>

      <h2>Part 4: Developer Mindset</h2>

      <h3>1. What&apos;s the most exciting tool/stack you&apos;ve explored recently?</h3>
      <p>
        I&apos;ve been using Spring Boot for building robust backend APIs, which I really enjoy for its simplicity and powerful features. I&apos;ve also worked with Next.js and the Vercel AI SDK for building AI-powered apps, which simplifies integrating language models and supports streaming responses.
      </p>

      <h3>Describe how you approach debugging when stuck.</h3>
      <p>
        When I&apos;m stuck, I first check the error message carefully to understand the problem. Then I put console logs here and there to see what is happening. If I still have no idea, I try to make a small code example and test again. Sometimes I search Google or Stack Overflow or use AI tools like ChatGPT and Deepseek—usually, I get the solution there.
      </p>

      <h3>2. Share a link to one past project you&apos;re proud of (if any).</h3>
      <p>
        Here&apos;s my GitHub repo for a full-stack Banking system with Spring Boot and HTML, CSS, JavaScript: I made a banking system web application with core functionality and mail integration.
      </p>
      <p>
        <a
          href="https://github.com/bharathsivam47/bank_website"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/bharathsivam47/bank_website
        </a>
      </p>
    </div>
  );
};

export default SummaryPage;
