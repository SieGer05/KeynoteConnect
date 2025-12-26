export const MOCK_CONFERENCES = [
   {
      id: 1,
      title: "Spring Cloud & Microservices Patterns",
      type: "Academic",
      date: "2025-11-15",
      duration: 90,
      registeredCount: 120,
      score: 4.5,
      keynote: {
         firstName: "Amine",
         lastName: "SieGer",
         function: "Software Architect",
         email: "amine@sieger.ma"
      },
      reviews: [
         {
            id: 101,
            date: "2025-11-16",
            text: "Excellente présentation, très claire !",
            stars: 5
         },
         {
            id: 102,
            date: "2025-11-17",
            text: "Un peu trop rapide sur la fin, mais bon contenu.",
            stars: 4
         }
      ]
   },
   {
      id: 2,
      title: "React 19: The Future of Frontend",
      type: "Commercial",
      date: "2025-12-01",
      duration: 45,
      registeredCount: 350,
      score: 3.8,
      keynote: {
         firstName: "Sarah",
         lastName: "Connor",
         function: "Lead Dev",
         email: "sarah@tech.com"
      },
      reviews: []
   },
   {
      id: 3,
      title: "AI Security & Threat Intelligence",
      type: "Academic",
      date: "2025-10-22",
      duration: 120,
      registeredCount: 85,
      score: 5.0,
      keynote: {
         firstName: "John",
         lastName: "Doe",
         function: "Cybersecurity Analyst",
         email: "john@sec.org"
      },
      reviews: []
   }
];