import { App } from '@/components';
import {
  fetchChannels,
  fetchProject,
  fetchTracks,
} from './api/project/_presets/DefaultPreset';

export default async function Home() {
  const data = {
    channels: await fetchChannels(),
    tracks: await fetchTracks(),
    project: await fetchProject(),
  };

  return <App {...data} />;
}
