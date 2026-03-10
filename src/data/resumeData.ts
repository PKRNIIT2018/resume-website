export interface SkillCategory {
    category: string;
    items: string[];
}

export interface AchievementGroup {
    title: string;
    items: string[];
}

export type Achievement = string | AchievementGroup;

export interface Experience {
    company: string;
    location: string;
    role: string;
    period: string;
    achievements: Achievement[];
}

export interface Education {
    degree: string;
    institution: string;
    year: string;
}

export interface Language {
    language: string;
    level: string;
}

export interface Project {
    id: number;
    title: string;
    role: string;
    description: string;
    icon: string;
    gradient: string;
    tags: string[];
    featured: boolean;
    category: string;
    metric: string;
    link?: string;
}

export interface ResumeData {
    targetRole: string;
    personalInfo: {
        name: string;
        title: string;
        location: string;
        email: string;
        phone: string;
        linkedin: string;
        website: string;
        workAuthorization: string;
        noticePeriod: string;
        availability: string;
    };
    hero: {
        highlightLine: string;
        description: string;
    };
    executiveSummary: string;
    coreCompetencies: string[];
    skills: SkillCategory[];
    experience: Experience[];
    education: Education[];
    certifications: string[];
    languages: Language[];
    keywords: string[];
    projects: Project[];
}

export const resumeData: ResumeData = {
    targetRole: "Senior Technical Business Analyst | Product Owner",

    personalInfo: {
        name: "Prasanth Kunnumal Ramesh",
        title: "Senior Technical Business Analyst | Product Owner",
        location: "Pezinok, Slovakia",
        email: "prasanth.k.ramesh@gmail.com",
        phone: "+421 944 016 820",
        linkedin: "linkedin.com/in/prasanthkr",
        website: "https://resume-prasanthkr.vercel.app",
        workAuthorization: "Slovak Permanent Residence (EU Work Authorization)",
        noticePeriod: "2 Months (Negotiable)",
        availability: "Open to Strategic Roles"
    },

    hero: {
        highlightLine: "Bridging 20+ Years of IT Excellence with AI Innovation",
        description: "Experience is valuable, but experience augmented by AI is a superpower. By leveraging internal innovations like IBM BOB and watsonx alongside external tools like Gemini for research, I have transformed traditional Business Analyst tasks into a high-velocity delivery engine.",
    },

    executiveSummary:
        "Senior Technical Business Analyst and Product Owner with 20+ years of experience delivering enterprise software solutions across global organizations. Proven expertise in Agile/Scrum delivery, SDLC, requirements engineering (BRD, FRD, user stories, acceptance criteria), stakeholder management, and large-scale backlog management. Experienced in AI-augmented analysis using enterprise and open-source tools to accelerate requirement discovery, documentation, and product delivery while maintaining security, compliance, and quality standards.",

    coreCompetencies: [
        "SDLC",
        "Agile Scrum & Kanban",
        "Product Ownership",
        "User Stories & Acceptance Criteria",
        "Backlog Grooming & Sprint Planning",
        "Stakeholder Management",
        "UAT Coordination",
        "Functional & Non-Functional Requirements",
        "Data Mapping",
        "API & Integration Requirements",
        "Risk & Dependency Management"
    ],

    skills: [
        {
            category: "AI & Automation",
            items: [
                "Agentic AI Workflows (AntiGravity)",
                "Prompt Engineering",
                "IBM watsonx Code Assistant",
                "IBM BOB",
                "Local LLMs (Ollama)",
                "Local LLM Privacy Strategy (Ollama)",
                "NotebookLM (Research & Synthesis)",
                "Perplexity",
                "Microsoft Copilot"
            ]
        },
        {
            category: "Product & Strategy",
            items: [
                "Product Ownership",
                "Technical Business Analysis",
                "Agile Delivery",
                "Strategic Planning",
                "IT Strategy",
                "Digital Transformation",
                "Enterprise Architecture",
                "Cross-functional Team Leadership",
                "Stakeholder Communication",
                "Requirements Documentation",
                "Jira & Confluence",
                "Software Development Life Cycle (SDLC)"
            ]
        },
        {
            category: "Technical Stack",
            items: [
                "Python (Pandas, Jupyter)",
                "Node.js",
                "C# .NET / ASP.NET",
                "SQL Server / PostgreSQL",
                "IBM Cloud",
                "Git & Technical Documentation",
                "Vulnerability Management"
            ]
        }
    ],

    experience: [
        {
            company: "IBM",
            location: "Bratislava, Slovakia",
            role: "Senior Technical Business Analyst (Product Owner)",
            period: "04/2019 – Present",
            achievements: [
                "Led Agile Scrum delivery for global enterprise applications, managing complex product backlogs across distributed teams.",
                "Elicited, analyzed, and documented business and technical requirements using BRDs, FRDs, user stories, and acceptance criteria.",
                "Partnered with product managers, architects, and engineering teams to translate business needs into scalable technical solutions.",
                "Facilitated backlog grooming, sprint planning, sprint reviews, and UAT activities to ensure on-time, high-quality releases.",
                "Performed application and infrastructure vulnerability assessments to support enterprise security and compliance standards.",
                {
                    title: "AI-Enhanced Productivity:",
                    items: [
                        "Applied AI-assisted analysis techniques to accelerate requirement discovery, documentation, and legacy system understanding, improving analysis throughput by an estimated 30–40%.",
                        "Used IBM watsonx Code Assistant and IBM BOB to analyze legacy codebases and system behavior, reducing dependency on SME availability.",
                        "Conducted regulatory and domain research using Perplexity and Gemini to support compliance-driven requirements.",
                        "Synthesized large volumes of technical documentation using NotebookLM to speed up discovery and onboarding phases.",
                        "Designed and executed agentic workflows (AntiGravity) to automate requirement synthesis, data mapping, and documentation tasks."
                    ]
                }
            ]
        },

        {
            company: "NVSSoft",
            location: "Riyadh, Saudi Arabia",
            role: "Account Project Manager / Team Lead",
            period: "06/2013 – 05/2018",
            achievements: [
                "Managed end-to-end delivery of enterprise Document Management Systems (DMS) for government and corporate clients.",
                "Led cross-functional teams of 30+ resources across development, QA, and support functions.",
                "Oversaw project planning, scheduling, budgeting, risk management, and stakeholder communication.",
                "Managed vendor relationships and platform integrations for Arcmate and Tarasol solutions.",
                "Established document control, auditability, and traceability frameworks aligned with enterprise governance standards."
            ]
        },

        {
            company: "APTECH EUROPE",
            location: "Bratislava, Slovakia",
            role: "Training Manager",
            period: "08/2010 – 04/2012",
            achievements: [
                "Designed and delivered advanced technical training programs covering SDLC, programming, and project management.",
                "Managed and mentored a team of certified trainers to ensure consistent instructional quality.",
                "Collaborated with industry professionals to align curricula with evolving market and technology trends."
            ]
        },

        {
            company: "Alamana Training and Education (Aptech Qatar)",
            location: "Doha, Qatar",
            role: "Corporate Trainer / Assistant Academic Head",
            period: "08/2008 – 07/2010",
            achievements: [
                "Led academic operations and managed a team of trainers delivering enterprise-focused technical education.",
                "Oversaw electronic course management systems to support digital learning delivery.",
                "Recognized as Best Trainer of Aptech Qatar (2008–2009) and achieved Toastmasters Competent Leader certification."
            ]
        },

        {
            company: "Aptech Bangalore",
            location: "Bangalore, India",
            role: "Technical Consultant / Trainer",
            period: "2004 – 2008",
            achievements: [
                "Delivered technical consulting and training in C#, ASP.NET, ADO.NET, and software design principles.",
                "Conducted corporate workshops on SDLC best practices and application architecture.",
                "Supported enterprise teams by identifying skill gaps and recommending targeted upskilling programs."
            ]
        }
    ],

    education: [
        {
            degree: "Bachelor of Science in Computer Science",
            institution: "Madurai Kamaraj University",
            year: "2000 – 2004"
        }
    ],

    certifications: [
        "PMP – Project Management Institute",
        "Scrum Fundamentals Certified",
        "Microsoft Certified Trainer (MCT)",
        "Microsoft Certified Application Developer (MCAD .NET)",
        "Toastmasters Competent Leader (CL) & Competent Communicator (CC)",
        "Certified Arcmate Administrator (7.2, 8 Enterprise, Capture 2.0, EziFlow)"
    ],

    languages: [
        { language: "English", level: "Professional Working Proficiency" },
        { language: "Hindi", level: "Native" },
        { language: "Malayalam", level: "Native" }
    ],

    keywords: [
        "Senior Technical Business Analyst",
        "Product Owner",
        "Agile Scrum",
        "SDLC",
        "User Stories",
        "Backlog Management",
        "UAT",
        "Enterprise Applications",
        "AI-Assisted Analysis",
        "IBM"
    ],

    projects: [
        {
            id: 6,
            title: "Indians In Slovakia",
            role: "Founder & Lead Developer",
            description: "A comprehensive community platform for Indians in Slovakia, featuring integration guides, legal resources, and community networking. Built with Astro, Tailwind CSS, and MDX.",
            icon: "🇸🇰",
            gradient: "from-blue-600 to-red-600",
            tags: ["Astro", "Tailwind CSS", "MDX", "Community", "React"],
            featured: true,
            category: "innovation",
            metric: "Community Platform",
            link: "https://ins-pearl.vercel.app",
        },
        {
            id: 0,
            title: "AI-Augmented Requirement Analysis",
            role: "AI Strategy & Implementation",
            description: "Designed and executed agentic workflows using AntiGravity and IBM watsonx to automate requirement synthesis, data mapping, and documentation. Improved analysis throughput by 40% and reduced dependency on SME availability.",
            icon: "🤖",
            gradient: "from-violet-500 to-purple-600",
            tags: ["AntiGravity", "IBM watsonx", "Prompt Engineering", "Ollama", "AI Agents"],
            featured: true,
            category: "innovation",
            metric: "40% Faster Analysis",
        },
        {
            id: 1,
            title: "IBM Global Invoice Access Application",
            role: "Product Owner",
            description: "Worldwide IBM application providing seamless invoice access across multiple billing tools. Managed product development, technical debt, and security compliance while tracking adoption through data analytics.",
            icon: "🌍",
            gradient: "from-blue-500 to-cyan-500",
            tags: ["Product Ownership", "PostgreSQL", "Python/Pandas", "IBM Cloud", "Agile/Scrum"],
            featured: true,
            category: "enterprise",
            metric: "Global Scale Delivery",
        },
        {
            id: 2,
            title: "Enterprise Document Management System",
            role: "Team Lead / Project Manager",
            description: "Led implementation of comprehensive document management solutions for enterprise clients in Saudi Arabia. Managed cross-functional teams of 30+ members delivering mission-critical systems.",
            icon: "🗂️",
            gradient: "from-emerald-500 to-teal-600",
            tags: ["Arcmate Enterprise", "Team Leadership", "Project Management", "Document Control"],
            featured: true,
            category: "enterprise",
            metric: "30+ Resource Management",
        },
        {
            id: 3,
            title: "Data Analytics & KPI Dashboard",
            role: "Technical Analyst",
            description: "Developed comprehensive analytics solution using Python, Pandas, and Jupyter Notebooks to track user adoption, system performance, and key performance indicators for IBM applications.",
            icon: "📊",
            gradient: "from-orange-500 to-amber-500",
            tags: ["Python", "Pandas", "Jupyter", "PostgreSQL", "Data Visualization"],
            featured: true,
            category: "analytics",
            metric: "Real-time KPI Tracking",
        },
        {
            id: 4,
            title: "Agile Transformation Initiative",
            role: "Agile Coach / Leader",
            description: "Led agile transformation across multiple teams, implementing Scrum ceremonies, backlog management, and continuous improvement processes. Achieved significant improvements in delivery velocity.",
            icon: "🔄",
            gradient: "from-pink-500 to-rose-500",
            tags: ["Agile/Scrum", "Change Management", "Team Leadership", "Process Improvement"],
            featured: false,
            category: "leadership",
            metric: "Multi-team Rollout",
        },
        {
            id: 5,
            title: "Technical Training Program",
            role: "Training Manager",
            description: "Designed and delivered comprehensive technical training programs for .NET, C#, and project management. Managed team of 7 trainers and achieved 'Best Trainer' recognition.",
            icon: "🎓",
            gradient: "from-indigo-500 to-blue-600",
            tags: [".NET", "C#", "Training Management", "Curriculum Design"],
            featured: false,
            category: "training",
            metric: "Best Trainer Award",
        },
    ],
};