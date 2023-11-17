import { Flex } from '@/pfui';
import type { ISong } from '@/common/types/project.types';

export function Song({ grow = false, children, className = '' }: ISong) {
  // const { bpm, swing, swingSubdivision } = fetchProject();
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [project, setProject] = useState<IProject | null>(null);

  /*
  useEffect(() => {
    Transport[isPlaying ? 'stop' : 'start']();
  }, [isPlaying]);
  */

  /*
  useEffect(() => {
    setIsPlaying(Transport.state === 'started');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Transport.state]);
  */

  console.info('[Song] server-side');
  return (
    <Flex id="DAW_SONG" grow={grow} className={className}>
      {children}
    </Flex>
  );
}
