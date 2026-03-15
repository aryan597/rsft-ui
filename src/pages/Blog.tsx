import { useState } from 'react';
import { Search, ChevronRight, ArrowRight, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

function BlogCard({ post, onClick }: { post: BlogPost; onClick: () => void }) {
  return (
    <div className="group border-2 border-black dark:border-white bg-white dark:bg-gray-800 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,1)] transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="h-48 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-indigo-600 text-white font-mono text-xs font-bold">{post.category}</span>
          <span className="font-mono text-xs text-gray-500">{post.readTime}</span>
        </div>
        <h3 className="font-mono text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
        <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-3">
          <img src={post.authorImage} alt={post.author} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-mono text-sm font-bold">{post.author}</p>
            <p className="font-mono text-xs text-gray-500">{post.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedPost({ post, onClick }: { post: BlogPost; onClick: () => void }) {
  return (
    <div onClick={onClick} className="grid lg:grid-cols-2 gap-8 p-8 border-2 border-black dark:border-white bg-white dark:bg-gray-800 mb-12 cursor-pointer hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,1)] transition-all">
      <div className="h-full min-h-[300px]">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-indigo-600 text-white font-mono text-xs font-bold">{post.category}</span>
          <span className="font-mono text-xs text-gray-500">{post.readTime}</span>
        </div>
        <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">{post.title}</h2>
        <p className="font-mono text-lg text-gray-600 dark:text-gray-400 mb-6">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <img src={post.authorImage} alt={post.author} className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-mono font-bold">{post.author}</p>
              <p className="font-mono text-xs text-gray-500">{post.date}</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono font-bold hover:bg-indigo-600 transition-colors flex items-center gap-2">
            READ MORE <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryPill({ category, active, onClick }: { category: string; active: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2 font-mono text-sm font-bold border-2 transition-all ${
        active 
          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white' 
          : 'border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white'
      }`}
    >
      {category}
    </button>
  );
}

function BlogPostFull({ post, onBack }: { post: BlogPost; onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 font-mono font-bold hover:text-indigo-600 transition-colors">
        <ChevronRight className="w-5 h-5 rotate-180" /> BACK TO BLOG
      </button>
      
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-indigo-600 text-white font-mono text-xs font-bold">{post.category}</span>
          <span className="font-mono text-xs text-gray-500">{post.readTime}</span>
        </div>
        <h1 className="font-mono text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
        <div className="flex items-center gap-4">
          <img src={post.authorImage} alt={post.author} className="w-14 h-14 rounded-full" />
          <div>
            <p className="font-mono font-bold text-lg">{post.author}</p>
            <p className="font-mono text-sm text-gray-500">{post.date}</p>
          </div>
        </div>
      </div>

      <div className="h-80 mb-8">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div className="prose prose-lg max-w-none mb-12 font-mono">
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{post.excerpt}</p>
        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{post.content}</div>
      </div>

      <div className="border-t-2 border-black dark:border-white pt-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-sm font-bold mb-2">SHARE THIS ARTICLE</p>
            <div className="flex gap-3">
              <button className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                <LinkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm font-bold mb-2">TAGS</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 font-mono text-xs">{post.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Hiring Tips', 'AI & Tech', 'Company Culture', 'Career Advice', 'Industry News'];

  const posts: BlogPost[] = [
    {
      id: 1,
      title: 'The Future of AI in Recruitment: 2026 Trends',
      excerpt: 'Discover how artificial intelligence is transforming the hiring landscape and what it means for recruiters and candidates alike.',
      content: `The recruitment industry is undergoing a massive transformation driven by artificial intelligence. As we move further into 2026, several key trends are emerging that will shape how companies find and hire talent.

1. AI-Powered Candidate Matching
Machine learning algorithms now analyze thousands of data points to match candidates with positions. These systems go beyond keywords to understand skills, experience, and cultural fit with 95% accuracy.

2. Automated Resume Screening
Gone are the days of manually reviewing hundreds of resumes. AI-powered systems can now parse, analyze, and score resumes in seconds, flagging the most qualified candidates for human review.

3. Predictive Hiring Analytics
Companies are using AI to predict candidate success, retention risk, and cultural fit before making hiring decisions. This data-driven approach reduces turnover and improves long-term hiring success.

4. Conversational AI Interviews
Chatbot and voice AI technologies are handling initial candidate screenings, answering questions, and scheduling interviews. This frees up recruiters to focus on high-value interactions.

5. Skills-Based Assessment
AI is enabling more sophisticated skills testing, including live coding challenges, situational judgment tests, and automated soft skills assessments.

The future of recruitment is bright, with AI handling the repetitive tasks while human recruiters focus on building relationships and making strategic decisions.`,
      author: 'Alexandra Chen',
      authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      date: 'March 15, 2026',
      readTime: '8 min read',
      category: 'AI & Tech',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: '10 Strategies to Reduce Time-to-Hire by 40%',
      excerpt: 'Learn proven tactics to streamline your hiring process and secure top talent before your competitors do.',
      content: `In today's competitive job market, speed is everything. Here's how you can reduce your time-to-hire by 40% or more.

1. Automate Initial Screening
Use AI-powered tools to automatically screen resumes and identify qualified candidates. This alone can save 15-20 hours per hire.

2. Streamline Interview Scheduling
Implement automated scheduling tools that allow candidates to book their own interview slots. Eliminate back-and-forth emails.

3. Create a Candidate Pipeline
Don't wait until you have an open position to start sourcing. Build relationships with potential candidates continuously.

4. Use Structured Interviews
Prepare standardized questions in advance. This makes interviews faster and more effective at identifying top talent.

5. Implement Assessment Tests
Use pre-employment assessments to evaluate candidates before interviews. This helps narrow down the pool quickly.

6. Empower Hiring Managers
Give managers the tools and authority to make decisions quickly. Avoid lengthy approval processes.

7. Leverage Employee Referrals
Your current employees know great talent. Make it easy for them to refer candidates with attractive referral bonuses.

8. Optimize Job Descriptions
Clear, concise job descriptions attract better candidates and reduce confusion during the hiring process.

9. Use Video Interviews for Initial Screens
Conduct first-round interviews via video to save time and travel costs.

10. Set Clear Timelines
Establish SLAs for each stage of your hiring process and hold stakeholders accountable.`,
      author: 'Sarah Williams',
      authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      date: 'March 12, 2026',
      readTime: '6 min read',
      category: 'Hiring Tips',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop'
    },
    {
      id: 3,
      title: 'Building a Company Culture That Attracts Top Talent',
      excerpt: 'Your company culture is your strongest recruitment tool. Learn how to create an environment where great people want to work.',
      content: `In the battle for top talent, company culture has become a decisive factor. Here's how to build a culture that attracts and retains the best.

1. Define Your Core Values
Clearly articulate what your company believes in and stands for. These values should guide every decision and action.

2. Lead by Example
Leadership must embody the culture they want to create. Actions speak louder than words.

3. Prioritize Employee Growth
Invest in training, mentorship, and career development. Top talent wants to learn and grow.

4. Foster Open Communication
Create channels for transparent communication at all levels. Listen to employee feedback and act on it.

5. Celebrate Wins
Recognize and celebrate achievements, both big and small. This builds morale and reinforces desired behaviors.

6. Create Great Workspaces
Whether physical or virtual, your work environment should be conducive to productivity and collaboration.

7. Offer Competitive Benefits
Beyond salary, offer benefits that matter: health, wellness, flexibility, and work-life balance.

8. Encourage Work-Life Balance
Burnout is real. Support your employees in maintaining healthy boundaries.

9. Build Communities
Create opportunities for employees to connect, both professionally and socially.

10. Measure and Improve
Regularly survey employees about culture and track metrics like retention and engagement.`,
      author: 'Emily Rodriguez',
      authorImage: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=100&h=100&fit=crop',
      date: 'March 8, 2026',
      readTime: '5 min read',
      category: 'Company Culture',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop'
    },
    {
      id: 4,
      title: 'The Complete Guide to Remote Hiring',
      excerpt: 'Everything you need to know about hiring and managing remote teams in 2026.',
      content: `Remote work is here to stay. Master the art of hiring and managing distributed teams with this comprehensive guide.

1. Define Remote-First Policies
Be clear about expectations, communication norms, and availability from the start.

2. Use the Right Tools
Invest in collaboration tools: video conferencing, project management, instant messaging, and document sharing.

3. Adapt Your Interview Process
Conduct interviews virtually and assess candidates' remote work skills and self-management abilities.

4. Onboard Effectively
Create detailed onboarding processes that work remotely. Assign mentors and provide ample resources.

5. Communicate Proactively
Over-communicate in remote settings. Use multiple channels and regular check-ins.

6. Build Trust
Trust is essential in remote work. Focus on outcomes rather than hours worked.

7. Foster Connection
Create virtual social opportunities and team-building activities to combat isolation.

8. Set Clear Goals
Remote workers thrive with clear objectives and expectations. Use OKRs and KPIs.

9. Provide Growth Opportunities
Remote employees should have equal access to training, promotions, and career development.

10. Measure Success
Track both individual and team performance. Use data to identify issues and improve processes.`,
      author: 'Michael Thompson',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      date: 'March 5, 2026',
      readTime: '7 min read',
      category: 'Hiring Tips',
      image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&h=500&fit=crop'
    },
    {
      id: 5,
      title: 'How AI is Reducing Bias in Hiring',
      excerpt: 'Explore how artificial intelligence is helping create more fair and equitable hiring practices.',
      content: `One of the most promising applications of AI in recruitment is reducing unconscious bias. Here's how it's happening.

1. Anonymized Applications
AI can remove identifying information from applications, focusing purely on qualifications.

2. Structured Assessments
Standardized tests and assessments reduce the impact of personal biases in evaluation.

3. Skills-Based Matching
AI matches candidates based on skills and experience, not background or demographics.

4. Language Analysis
AI can identify and flag biased language in job descriptions and company communications.

5. Pipeline Analytics
Track diversity metrics throughout the hiring funnel to identify and address bias.

6. Blind Resume Review
Remove photos, names, and other identifying information from initial resume reviews.

7. Consistent Scoring
AI provides consistent evaluation criteria, reducing subjective judgments.

8. Predictive Analytics
Use data to identify and correct for patterns of bias in hiring decisions.

While AI isn't perfect, when properly designed and monitored, it can significantly reduce bias and create more equitable hiring processes.`,
      author: 'David Park',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      date: 'March 1, 2026',
      readTime: '6 min read',
      category: 'AI & Tech',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop'
    },
    {
      id: 6,
      title: 'Salary Negotiation: A Guide for Recruiters',
      excerpt: 'Master the art of salary negotiations to close deals while maintaining candidate satisfaction.',
      content: `Salary negotiation is one of the most critical and delicate parts of the hiring process. Here's how to navigate it successfully.

1. Know the Market
Research current salary ranges for each position. Use multiple sources and consider location, experience, and skills.

2. Understand Total Compensation
Salary is just one part of the package. Consider benefits, equity, perks, and growth opportunities.

3. Be Transparent
Share salary ranges early to avoid wasting time and creating disappointment later.

4. Listen to Candidates
Understand what's most important to them. They may value flexibility over salary.

5. Don't Lowball
Uncompetitive offers insult candidates and damage your employer brand.

6. Prepare Justification
Have data ready to support your offers and explain your reasoning.

7. Create Win-Win Solutions
Look for ways to add value beyond salary if you can't increase the offer.

8. Train Your Managers
Ensure hiring managers are prepared to handle negotiations professionally.

9. Move Quickly
Delays give candidates time to receive competing offers.

10. Follow Up
Maintain relationships with candidates even if they decline. They may reconsider or refer others.`,
      author: 'Alexandra Chen',
      authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      date: 'February 25, 2026',
      readTime: '5 min read',
      category: 'Career Advice',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop'
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    : posts.filter(p => p.category === selectedCategory && (p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())));

  const featuredPost = posts.find(p => p.featured);

  if (selectedPost) {
    return (
      <PageLayout>
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogPostFull post={selectedPost} onBack={() => setSelectedPost(null)} />
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase text-indigo-600">Blog</span>
            <h1 className="font-mono text-5xl md:text-7xl font-black mt-6 mb-8">
              RESOURCES &
              <span className="block text-indigo-600">INSIGHTS</span>
            </h1>
            <p className="font-mono text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Expert advice, industry trends, and actionable insights to help you hire better and grow your career.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <CategoryPill 
                key={category}
                category={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === 'All' && !searchQuery && featuredPost && (
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedPost post={featuredPost} onClick={() => setSelectedPost(featuredPost)} />
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(p => !p.featured || selectedCategory !== 'All').map((post) => (
              <BlogCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="font-mono text-xl text-gray-500">No articles found matching your criteria.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-4 px-6 py-3 border-2 border-black dark:border-white font-mono font-bold hover:bg-gray-900 hover:text-white transition-colors"
              >
                CLEAR FILTERS
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono text-4xl font-bold mb-6">STAY UPDATED</h2>
          <p className="font-mono text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest hiring tips, industry trends, and product updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-white font-mono focus:outline-none"
            />
            <button className="px-8 py-4 bg-indigo-600 text-white font-mono font-bold hover:bg-indigo-700 transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
