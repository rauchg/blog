export default function About() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif mb-8">About Me</h1>
      
      <div className="prose prose-neutral dark:prose-invert">
        <p className="mb-8 text-lg">
          I'm Ron Mashate, a Product Leader and AI Experience Builder based in Toronto. 
          With 8+ years of experience driving digital transformation and building customer-centric products, 
          I've helped companies achieve over <b>$25M in revenue impact</b> through strategic product initiatives.
        </p>

        <h2 className="font-bold text-2xl font-serif mt-8 mb-4">Professional Journey</h2>
        
        <p className="mb-4">
          My journey in product management has taken me from launching Canada's largest native advertising network 
          at <b>Postmedia</b> to transforming digital platforms at <b>Cineplex</b> (growing revenue from $2M to $11M) 
          and optimizing customer experiences at <b>Assurance IQ</b> (saving $2M in policyholder LTV).
        </p>

        <p className="mb-4">
          I specialize in:
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>0 to 1 Product Development</li>
          <li>Platform Strategy & Growth</li>
          <li>AI Systems & Memory Architecture</li>
          <li>Customer Research & Data-Driven Decision Making</li>
          <li>Cross-Functional Team Leadership</li>
        </ul>

        <h2 className="font-bold text-2xl font-serif mt-8 mb-4">Current Focus</h2>
        
        <p className="mb-4">
          I'm currently building AI memory systems and exploring the intersection of artificial intelligence 
          and product development. My Memory MCP project for Claude demonstrates how we can give AI systems 
          persistent context and meaningful recall capabilities.
        </p>

        <p className="mb-8">
          I'm also actively contributing to the open-source community with projects focused on improving 
          AI-human interaction and building practical tools for product managers.
        </p>

        <h2 className="font-bold text-2xl font-serif mt-8 mb-4">Let's Connect</h2>
        
        <p className="mb-4">
          I love connecting with fellow product leaders, AI enthusiasts, and builders working on interesting problems.
        </p>
        
        <div className="flex gap-6 mt-6">
          <a 
            href="https://linkedin.com/in/rmashate" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            LinkedIn →
          </a>
          <a 
            href="https://github.com/rmashate" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            GitHub →
          </a>
          <a 
            href="mailto:rmashate@gmail.com"
            className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            Email →
          </a>
        </div>
      </div>
    </section>
  );
}