import { IProject } from '@/common/types/project.types';
import { Navbar } from '@/components';

export function Header({
  project,
  setProject,
}: {
  project: IProject;
  setProject: (project: IProject) => void;
}) {
  console.log('[Header] server-side');
  return (
    <header>
      <Navbar project={project} setProject={setProject} />
    </header>
  );
}
