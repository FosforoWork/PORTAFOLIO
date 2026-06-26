import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  time?: string;
}

export function ProjectCard({ title, description, tags, githubUrl, demoUrl, time }: ProjectCardProps) {
  return (
    <Card className="bg-zinc-900/20 border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 flex flex-col h-full justify-between">
      <CardHeader className="space-y-2 p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            {time && (
              <span className="text-[9px] text-zinc-500 font-mono tracking-wider block uppercase">
                {time}
              </span>
            )}
            <CardTitle className="text-sm font-bold text-zinc-200 transition-colors">
              {title}
            </CardTitle>
          </div>
          <div className="flex gap-2 shrink-0 pt-1">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-200 transition-colors"
                title="Ver código fuente"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-200 transition-colors"
                title="Ver demo o reporte"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        <CardDescription className="text-xs text-zinc-400 font-light leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-1 p-5 pt-0">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="bg-zinc-950/40 border-zinc-800/60 text-zinc-400 text-[10px] font-mono px-2 py-0"
          >
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
