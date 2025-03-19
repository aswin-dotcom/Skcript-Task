import { v4 as uuidv4 } from "uuid";
const generateUUID = () => {
  return uuidv4();
};

export async function GET() {
  let initialColumns = [
    {
      id: "Planned",
      title: "Planned",
      cards: [
        {
          id: generateUUID(),
          content:
            "Improve Jira Integration supporting posting feedback to multiple Jira projects",
          description:
            "Jira integration can be done using REST API to create, update, and fetch issues programmatically. You can also use webhooks to trigger events or third-party tools like Zapier, GitHub, and Slack for automation. For advanced features, Jira Marketplace apps and CI/CD integration (e.g., GitHub Actions, Jenkins) can streamline workflows.",
          label: "Design",
          Date: "2023-06-30",
          upvotes: 9,
          status: "Planned",
          Board: "Integration",
          PostedBy: "Aswin",
          Assignedto: "Elon",
          comments: [],
          activies: [],
        },
        {
          id: generateUUID(),
          content: "Crisp integration Improvements",
          description:
            "Crisp integration can be improved by enhancing API usage for real-time chat automation and data syncing. Webhooks can be used to trigger actions on new messages or events, improving workflow automation. Additionally, integrating Crisp with CRM, Slack, or AI chatbots can enhance customer support efficiency. ",
          label: "Development",
          Date: "2023-07-05",
          upvotes: 3,
          status: "Planned",
          Board: "Bugs & Fixes",
          PostedBy: "Aswin Samuvel",
          Assignedto: "Jack",
          comments: [],
          activies: [],
        },
        {
          id: generateUUID(),
          content: "Crisp integration Improvements",
          description:
            "Crisp integration can be improved by enhancing API usage for real-time chat automation and data syncing. Webhooks can be used to trigger actions on new messages or events, improving workflow automation. Additionally, integrating Crisp with CRM, Slack, or AI chatbots can enhance customer support efficiency. ",
          label: "Development",
          Date: "2023-07-05",
          upvotes: 3,
          status: "Planned",
          Board: "Bugs & Fixes",
          PostedBy: "Aswin Samuvel",
          Assignedto: "William",
          comments: [],
          activies: [],
        },
        {
          id: generateUUID(),
          content:
            "Lambda - Serverless computing to run backend code without managing servers.",
          description:
            "AWS (Amazon Web Services) is a cloud computing platform that provides various services like computing power, storage, networking, databases, AI/ML, DevOps tools, and more.",
          label: "Design",
          Date: "2023-06-30",
          upvotes: 9,
          status: "Planned",
          Board: "Integration",
          PostedBy: "CEO",
          Assignedto: "Tuskin",
          comments: [],
          activies: [],
        },
        {
          id: generateUUID(),
          content: ".NET Backend Development",
          description:
            ".NET is a cross-platform framework by Microsoft for building web, desktop, cloud, mobile, gaming, and IoT applications.",
          label: "Design",
          Date: "2023-06-30",
          upvotes: 9,
          status: "Planned",
          Board: "Feature request",
          PostedBy: "CEO",
          Assignedto: "Tuskin",
          comments: [],
          activies: [],
        },
      ],
    },
    {
      id: "In Progress",
      title: "In Progress",
      cards: [
        {
          id: generateUUID(),
          content: "Write API documentation",
          description:
            "API documentation should include authentication details, endpoint descriptions, and request/response examples. Use clear formatting with HTTP methods, parameters, and expected responses. Provide code samples in multiple languages for better developer experience",
          label: "Documentation",
          Date: "2023-07-10",
          upvotes: 5,
          status: "In Progress",
          Board: "Feature request",
          PostedBy: "Jack Samuvel",
          Assignedto: "Mona",
          comments: [],
          activies: [],
        },
        {
          id: generateUUID(),
          content: "Write API documentation",
          description:
            "API documentation should include authentication details, endpoint descriptions, and request/response examples. Use clear formatting with HTTP methods, parameters, and expected responses. Provide code samples in multiple languages for better developer experience",
          label: "Documentation",
          Date: "2023-07-10",
          upvotes: 5,
          status: "In Progress",
          Board: "Integration",
          PostedBy: "Jack Samuvel",
          Assignedto: "Mona",
          comments: [],
          activies: [],
        },
        {
          id: generateUUID(),
          content: "ChatGpt",
          description:
            "ChatGPT is an AI-powered chatbot developed by OpenAI that can generate human-like text responses. It is based on the GPT (Generative Pre-trained Transformer) model and is designed for natural language understanding, content creation, answering questions, coding help, and more. It can assist with a wide range of topics, from casual conversation to technical problem-solving. ",
          label: "Documentation",
          Date: "2023-07-10",
          upvotes: 5,
          status: "In Progress",
          Board: "Feature request",
          PostedBy: "Jack Samuvel",
          Assignedto: "Mona",
          comments: [],
          activies: [],
        },
        {
          id: generateUUID(),
          content: "Azure",
          description:
            "Azure offers multiple ways to deploy applications, depending on your project needs. Since you're working with .NET and Angular, here are common deployment methods for both frontend and backend",
          label: "Documentation",
          Date: "2023-07-10",
          upvotes: 5,
          status: "In Progress",
          Board: "Bugs & Fixes",
          PostedBy: "Jack Samuvel",
          Assignedto: "Mona",
          comments: [],
          activies: [],
        },
        {
          id: generateUUID(),
          content: "Azure",
          description:
            "Azure offers multiple ways to deploy applications, depending on your project needs. Since you're working with .NET and Angular, here are common deployment methods for both frontend and backend",
          label: "Documentation",
          Date: "2023-07-10",
          upvotes: 5,
          status: "In Progress",
          Board: "Bugs & Fixes",
          PostedBy: "Jack Samuvel",
          Assignedto: "Mona",
          comments: [],
          activies: [],
        },
      ],
    },
    {
      id: "Completed",
      title: "Completed",
      cards: [
        {
          id: generateUUID(),
          content: "Set up project repository",
          description:
            "Initialize a Git repository using git init and create a .gitignore file to exclude unnecessary files. Push the project to GitHub/GitLab using git remote add origin <repo_url> and git push -u origin main. Set up branch protection rules and CI/CD workflows for better collaboration and automation. ",
          label: "Setup",
          Date: "2023-06-25",
          upvotes: 8,
          status: "Completed",
          Board: "Integration",
          PostedBy: "Jack Samuvel",
          Assignedto: "Jeff",
          comments: [],
          activies: [],
        },
        {
          id: generateUUID(),
          content: " Azure DevOps",
          description:
            "Azure DevOps is a set of cloud-based tools provided by Microsoft to manage the software development lifecycle. It includes services like Azure Repos (Git version control), Azure Pipelines (CI/CD automation), Azure Boards (project management), Azure Test Plans (testing), and Azure Artifacts (package management). It helps teams collaborate efficiently and automate deployments. ",
          label: "Setup",
          Date: "2023-06-25",
          upvotes: 8,
          status: "Completed",
          Board: "Bugs & Fixes",
          PostedBy: "Jack Samuvel",
          Assignedto: "Jeff",
          comments: [],
          activies: [],
        },
        {
          id: generateUUID(),
          content: " Microservices Architecture",
          description:
            "Microservices is an architectural style where an application is broken down into smaller, independent services that communicate through APIs. Each service handles a specific business function and can be deployed, scaled, and updated independently. This approach improves scalability, fault isolation, and flexibility compared to monolithic applications. ",
          label: "Setup",
          Date: "2023-06-25",
          upvotes: 8,
          status: "Completed",
          Board: "Integration",
          PostedBy: "Jack Samuvel",
          Assignedto: "Jeff",
          comments: [],
          activies: [],
        },
      ],
    },
  ];
  initialColumns = initialColumns.filter((item) => item.title == "Planned");


  return Response.json(initialColumns);
}