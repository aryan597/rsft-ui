export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  currentRole: string;
  targetRoles: string[];
  skills: string[];
  experience: number;
  workType: 'remote' | 'hybrid' | 'onsite';
  expectedSalary: number;
  resumeUrl: string;
  avatar: string;
  matchScore: number;
  lastActive: string;
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  workHistory: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  logo: string;
  description: string;
  openPositions: number;
  activeRecruiters: number;
}

export interface JobPosition {
  id: string;
  companyId: string;
  title: string;
  description: string;
  location: string;
  workType: 'remote' | 'hybrid' | 'onsite';
  requiredSkills: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  postedDate: string;
  status: 'open' | 'closed' | 'draft';
}

export interface Meeting {
  id: string;
  candidateId: string;
  candidateName: string;
  companyId: string;
  title: string;
  date: string;
  time: string;
  type: 'interview' | 'screening' | 'follow-up';
  status: 'scheduled' | 'completed' | 'cancelled';
}

export const mockCandidates: Candidate[] = [
  {
    id: 'c1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    currentRole: 'Senior Software Engineer',
    targetRoles: ['Tech Lead', 'Engineering Manager', 'Staff Engineer'],
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'GraphQL', 'PostgreSQL'],
    experience: 7,
    workType: 'hybrid',
    expectedSalary: 180000,
    resumeUrl: '/resumes/sarah-chen.pdf',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    matchScore: 92,
    lastActive: '2026-03-14T10:30:00Z',
    education: [
      { degree: 'M.S. Computer Science', institution: 'Stanford University', year: 2018 },
      { degree: 'B.S. Computer Science', institution: 'UC Berkeley', year: 2016 }
    ],
    workHistory: [
      { company: 'TechCorp Inc', role: 'Senior Software Engineer', duration: '3 years', description: 'Led development of microservices architecture' },
      { company: 'StartupXYZ', role: 'Full Stack Developer', duration: '2.5 years', description: 'Built customer-facing web applications' }
    ]
  },
  {
    id: 'c2',
    name: 'Marcus Johnson',
    email: 'marcus.j@email.com',
    phone: '+1 (555) 234-5678',
    location: 'Austin, TX',
    currentRole: 'Product Designer',
    targetRoles: ['Senior Product Designer', 'Design Lead', 'UX Manager'],
    skills: ['Figma', 'UI/UX Design', 'User Research', 'Prototyping', 'Design Systems', 'HTML/CSS'],
    experience: 5,
    workType: 'remote',
    expectedSalary: 140000,
    resumeUrl: '/resumes/marcus-johnson.pdf',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    matchScore: 88,
    lastActive: '2026-03-13T15:45:00Z',
    education: [
      { degree: 'BFA Graphic Design', institution: 'Rhode Island School of Design', year: 2019 }
    ],
    workHistory: [
      { company: 'DesignHub', role: 'Product Designer', duration: '3 years', description: 'Designed enterprise SaaS products' }
    ]
  },
  {
    id: 'c3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '+1 (555) 345-6789',
    location: 'New York, NY',
    currentRole: 'Data Scientist',
    targetRoles: ['ML Engineer', 'Senior Data Scientist', 'AI Researcher'],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'SQL', 'NLP', 'Computer Vision'],
    experience: 4,
    workType: 'hybrid',
    expectedSalary: 160000,
    resumeUrl: '/resumes/emily-rodriguez.pdf',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    matchScore: 85,
    lastActive: '2026-03-12T09:00:00Z',
    education: [
      { degree: 'M.S. Data Science', institution: 'Columbia University', year: 2021 },
      { degree: 'B.S. Mathematics', institution: 'MIT', year: 2019 }
    ],
    workHistory: [
      { company: 'AI Labs', role: 'Data Scientist', duration: '2 years', description: 'Developed ML models for predictive analytics' }
    ]
  },
  {
    id: 'c4',
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    currentRole: 'DevOps Engineer',
    targetRoles: ['Site Reliability Engineer', 'Cloud Architect', 'DevOps Lead'],
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD', 'Python', 'Linux'],
    experience: 6,
    workType: 'onsite',
    expectedSalary: 170000,
    resumeUrl: '/resumes/david-kim.pdf',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    matchScore: 90,
    lastActive: '2026-03-14T08:15:00Z',
    education: [
      { degree: 'B.S. Computer Engineering', institution: 'University of Washington', year: 2018 }
    ],
    workHistory: [
      { company: 'CloudTech', role: 'DevOps Engineer', duration: '4 years', description: 'Managed cloud infrastructure for 50+ services' }
    ]
  },
  {
    id: 'c5',
    name: 'Jessica Patel',
    email: 'jessica.p@email.com',
    phone: '+1 (555) 567-8901',
    location: 'Boston, MA',
    currentRole: 'Frontend Developer',
    targetRoles: ['Senior Frontend Developer', 'UI Engineer', 'React Developer'],
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Redux', 'Next.js', 'GraphQL'],
    experience: 3,
    workType: 'remote',
    expectedSalary: 120000,
    resumeUrl: '/resumes/jessica-patel.pdf',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    matchScore: 78,
    lastActive: '2026-03-11T14:30:00Z',
    education: [
      { degree: 'B.S. Software Engineering', institution: 'Northeastern University', year: 2021 }
    ],
    workHistory: [
      { company: 'WebAgency', role: 'Frontend Developer', duration: '2 years', description: 'Built responsive web applications for clients' }
    ]
  },
  {
    id: 'c6',
    name: 'Alex Thompson',
    email: 'alex.t@email.com',
    phone: '+1 (555) 678-9012',
    location: 'Chicago, IL',
    currentRole: 'Backend Engineer',
    targetRoles: ['Senior Backend Developer', 'API Developer', 'Systems Engineer'],
    skills: ['Java', 'Spring Boot', 'Microservices', 'MongoDB', 'Redis', 'Kafka', 'AWS'],
    experience: 5,
    workType: 'hybrid',
    expectedSalary: 155000,
    resumeUrl: '/resumes/alex-thompson.pdf',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    matchScore: 82,
    lastActive: '2026-03-13T11:00:00Z',
    education: [
      { degree: 'M.S. Computer Science', institution: 'University of Chicago', year: 2020 }
    ],
    workHistory: [
      { company: 'FinTech Corp', role: 'Backend Engineer', duration: '3 years', description: 'Developed payment processing systems' }
    ]
  },
  {
    id: 'c7',
    name: 'Rachel Green',
    email: 'rachel.g@email.com',
    phone: '+1 (555) 789-0123',
    location: 'Los Angeles, CA',
    currentRole: 'Product Manager',
    targetRoles: ['Senior Product Manager', 'Group PM', 'Director of Product'],
    skills: ['Product Strategy', 'Agile', 'User Research', 'Data Analysis', 'Roadmapping', 'JIRA'],
    experience: 8,
    workType: 'hybrid',
    expectedSalary: 190000,
    resumeUrl: '/resumes/rachel-green.pdf',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
    matchScore: 94,
    lastActive: '2026-03-14T16:00:00Z',
    education: [
      { degree: 'MBA', institution: 'UCLA Anderson', year: 2017 },
      { degree: 'B.A. Business', institution: 'USC', year: 2015 }
    ],
    workHistory: [
      { company: 'TechGiant', role: 'Product Manager', duration: '5 years', description: 'Led product for B2B SaaS platform' }
    ]
  },
  {
    id: 'c8',
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    phone: '+1 (555) 890-1234',
    location: 'Denver, CO',
    currentRole: 'Full Stack Developer',
    targetRoles: ['Senior Full Stack Developer', 'Tech Lead', 'Principal Engineer'],
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
    experience: 6,
    workType: 'remote',
    expectedSalary: 165000,
    resumeUrl: '/resumes/michael-brown.pdf',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    matchScore: 87,
    lastActive: '2026-03-12T13:45:00Z',
    education: [
      { degree: 'B.S. Computer Science', institution: 'University of Colorado', year: 2018 }
    ],
    workHistory: [
      { company: 'RemoteFirst', role: 'Full Stack Developer', duration: '4 years', description: 'Built distributed systems for remote work platform' }
    ]
  }
];

export const mockCompanies: Company[] = [
  {
    id: 'comp1',
    name: 'TechCorp Inc',
    industry: 'Technology',
    size: '500-1000',
    location: 'San Francisco, CA',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=TechCorp',
    description: 'Leading technology company focused on enterprise solutions',
    openPositions: 45,
    activeRecruiters: 8
  },
  {
    id: 'comp2',
    name: 'InnovateTech',
    industry: 'Artificial Intelligence',
    size: '100-500',
    location: 'Austin, TX',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=InnovateTech',
    description: 'AI-powered product company revolutionizing industries',
    openPositions: 23,
    activeRecruiters: 4
  },
  {
    id: 'comp3',
    name: 'FinEdge',
    industry: 'Financial Services',
    size: '1000+',
    location: 'New York, NY',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=FinEdge',
    description: 'Next-generation financial technology platform',
    openPositions: 67,
    activeRecruiters: 12
  },
  {
    id: 'comp4',
    name: 'HealthAI',
    industry: 'Healthcare Technology',
    size: '100-500',
    location: 'Boston, MA',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=HealthAI',
    description: 'Using AI to transform healthcare delivery',
    openPositions: 18,
    activeRecruiters: 3
  },
  {
    id: 'comp5',
    name: 'CloudScale',
    industry: 'Cloud Infrastructure',
    size: '500-1000',
    location: 'Seattle, WA',
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=CloudScale',
    description: 'Enterprise cloud solutions at scale',
    openPositions: 34,
    activeRecruiters: 6
  }
];

export const mockJobPositions: JobPosition[] = [
  {
    id: 'job1',
    companyId: 'comp1',
    title: 'Senior Software Engineer',
    description: 'Build scalable microservices architecture',
    location: 'San Francisco, CA',
    workType: 'hybrid',
    requiredSkills: ['React', 'Node.js', 'AWS', 'TypeScript'],
    salaryRange: { min: 150000, max: 200000 },
    postedDate: '2026-03-10',
    status: 'open'
  },
  {
    id: 'job2',
    companyId: 'comp2',
    title: 'Machine Learning Engineer',
    description: 'Develop production ML models',
    location: 'Austin, TX',
    workType: 'remote',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
    salaryRange: { min: 140000, max: 180000 },
    postedDate: '2026-03-12',
    status: 'open'
  },
  {
    id: 'job3',
    companyId: 'comp3',
    title: 'Product Designer',
    description: 'Design next-gen financial products',
    location: 'New York, NY',
    workType: 'hybrid',
    requiredSkills: ['Figma', 'UI/UX', 'Design Systems', 'User Research'],
    salaryRange: { min: 120000, max: 160000 },
    postedDate: '2026-03-08',
    status: 'open'
  },
  {
    id: 'job4',
    companyId: 'comp4',
    title: 'Full Stack Developer',
    description: 'Build healthcare applications',
    location: 'Boston, MA',
    workType: 'onsite',
    requiredSkills: ['React', 'Python', 'PostgreSQL', 'FHIR'],
    salaryRange: { min: 130000, max: 170000 },
    postedDate: '2026-03-14',
    status: 'open'
  }
];

export const mockMeetings: Meeting[] = [
  {
    id: 'm1',
    candidateId: 'c1',
    candidateName: 'Sarah Chen',
    companyId: 'comp1',
    title: 'Technical Interview - Senior Engineer',
    date: '2026-03-15',
    time: '10:00 AM',
    type: 'interview',
    status: 'scheduled'
  },
  {
    id: 'm2',
    candidateId: 'c2',
    candidateName: 'Marcus Johnson',
    companyId: 'comp3',
    title: 'Design Portfolio Review',
    date: '2026-03-15',
    time: '2:00 PM',
    type: 'screening',
    status: 'scheduled'
  },
  {
    id: 'm3',
    candidateId: 'c4',
    candidateName: 'David Kim',
    companyId: 'comp5',
    title: 'DevOps Architecture Discussion',
    date: '2026-03-16',
    time: '11:00 AM',
    type: 'interview',
    status: 'scheduled'
  },
  {
    id: 'm4',
    candidateId: 'c7',
    candidateName: 'Rachel Green',
    companyId: 'comp1',
    title: 'Product Strategy Conversation',
    date: '2026-03-14',
    time: '3:00 PM',
    type: 'follow-up',
    status: 'completed'
  }
];

export const mockSkills = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'GraphQL',
  'PostgreSQL', 'MongoDB', 'Redis', 'Machine Learning', 'TensorFlow',
  'Figma', 'UI/UX Design', 'Product Management', 'Agile', 'SQL'
];

export const mockLocations = [
  'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA',
  'Boston, MA', 'Los Angeles, CA', 'Chicago, IL', 'Denver, CO',
  'Remote'
];

export const mockRoles = [
  'Software Engineer', 'Senior Software Engineer', 'Staff Engineer',
  'Engineering Manager', 'Tech Lead', 'Product Manager', 'Designer',
  'Data Scientist', 'Machine Learning Engineer', 'DevOps Engineer',
  'Full Stack Developer', 'Frontend Developer', 'Backend Developer'
];
