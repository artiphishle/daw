import { IProject } from '@/common/types/project.types';
import { Navbar } from '@/components';

export function Header({ project }: { project: IProject }) {
  console.log('[Header] server-side');
  return (
    <header>
      <Navbar project={project} />
    </header>
  );
}
