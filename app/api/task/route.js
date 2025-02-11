import { v4 as uuidv4 } from 'uuid';
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
              description:"Jira integration can be done using REST API to create, update, and fetch issues programmatically. You can also use webhooks to trigger events or third-party tools like Zapier, GitHub, and Slack for automation. For advanced features, Jira Marketplace apps and CI/CD integration (e.g., GitHub Actions, Jenkins) can streamline workflows.",
            label: "Design",
            Date: "2023-06-30",
            upvotes: 9,
            status: "Planned",
            Board: "Integration",
            PostedBy: "Aswin",
            Assignedto:"Elon",
            comments:[],
            activies:[],
          },
          {
            id: generateUUID(),
            content: "Crisp integration Improvements",
            description:"Crisp integration can be improved by enhancing API usage for real-time chat automation and data syncing. Webhooks can be used to trigger actions on new messages or events, improving workflow automation. Additionally, integrating Crisp with CRM, Slack, or AI chatbots can enhance customer support efficiency. ",
            label: "Development",
            Date: "2023-07-05",
            upvotes: 3,
            status: "Planned",
            Board: "Bugs & Fixes",
            PostedBy: "Aswin Samuvel",
            Assignedto:"Jack",
            comments:[],
            activies:[],

          },
          {
            id: generateUUID(),
            content: "Crisp integration Improvements",
            description:"Crisp integration can be improved by enhancing API usage for real-time chat automation and data syncing. Webhooks can be used to trigger actions on new messages or events, improving workflow automation. Additionally, integrating Crisp with CRM, Slack, or AI chatbots can enhance customer support efficiency. ",
            label: "Development",
            Date: "2023-07-05",
            upvotes: 3,
            status: "Planned",
            Board: "Bugs & Fixes",
            PostedBy: "Aswin Samuvel",
            Assignedto:"William",
            comments:[],
            activies:[],
          }
    
          
        ],
      },
      {
        id: "In Progress",
        title: "In Progress",
        cards: [
          {
            id: generateUUID(),
            content: "Write API documentation",
            description:"API documentation should include authentication details, endpoint descriptions, and request/response examples. Use clear formatting with HTTP methods, parameters, and expected responses. Provide code samples in multiple languages for better developer experience",
            label: "Documentation",
            Date: "2023-07-10",
            upvotes: 5,
            status: "In Progress",
            Board: "Feature request",
            PostedBy: "Jack Samuvel",
            Assignedto:"Mona",
            comments:[],
            activies:[],
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
            description:"Initialize a Git repository using git init and create a .gitignore file to exclude unnecessary files. Push the project to GitHub/GitLab using git remote add origin <repo_url> and git push -u origin main. Set up branch protection rules and CI/CD workflows for better collaboration and automation. ",
            label: "Setup",
            Date: "2023-06-25",
            upvotes: 8,
            status: "Completed",
            Board: "Integration",
            PostedBy: "Jack Samuvel",
            Assignedto:"Jeff",
            comments:[],
            activies:[],
            
          },
        ],
      },
    ];

  
    return Response.json(initialColumns);
  }
  